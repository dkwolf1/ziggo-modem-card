import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const files = new Set([
  "/demo.html",
  "/demo.js",
  "/dist/ziggo-modem-card.js",
  "/dist/ziggo-modem-device.webp",
]);

async function openDemo(page) {
  await page.route("http://ziggo.test/**", async (route) => {
    const { pathname } = new URL(route.request().url());
    if (!files.has(pathname)) return route.abort();

    const path = fileURLToPath(new URL(`../..${pathname}`, import.meta.url));
    await route.fulfill({ path });
  });
  await page.goto("http://ziggo.test/demo.html");
}

test("loads the module, image, history and diagnostic reason", async ({
  page,
}) => {
  await openDemo(page);
  const card = page.locator("#large ziggo-modem-card");

  await expect(card.getByText("75 / 100")).toBeVisible();
  await expect(
    card.getByText("Sagemcom · DOCSIS 3.1 · ha-ziggo-modem"),
  ).toBeVisible();
  await expect(card.getByText("Downstream SNR (dB)")).toBeVisible();
  await expect
    .poll(() =>
      card.getByAltText("Ziggo modem").evaluate((image) => image.naturalWidth),
    )
    .toBeGreaterThan(0);

  const graph = card.locator(".chart-svg");
  await expect(graph).toBeVisible();
  const dailyLabels = await graph.textContent();
  await card.getByRole("combobox").selectOption("168");
  await expect(graph).not.toHaveText(dailyLabels);

  const diagnostics = card.getByRole("button", { name: "Diagnostiek" });
  await diagnostics.click();
  const dialog = card.getByRole("dialog", { name: "Diagnostiek" });
  await expect(dialog.getByText("Downstream SNR verlaagd")).toBeVisible();
  await expect(dialog.getByText("Mislukte updates")).toBeVisible();
  await dialog.getByRole("button", { name: "Sluiten" }).click();
  await expect(dialog).toBeHidden();
  await expect(diagnostics).toBeFocused();
});

test("shows the compact card and diagnostics in a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await openDemo(page);
  const card = page.locator("#small ziggo-modem-card");
  await expect(card.getByText("75 / 100")).toBeVisible();
  await card.getByRole("button", { name: "Diagnostiek" }).click();
  const dialog = card.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
