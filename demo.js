import "./dist/ziggo-modem-card.js";
const updatedAt = new Date().toISOString();
const readings = {
  status: ["Operational"],
  uptime: ["14d 06u"],
  signal_quality: ["Matig", { score: 75, reden: "Downstream SNR verlaagd" }],
  ds_snr: ["36.4", { unit_of_measurement: "dB" }],
  ds_power: ["1.2", { unit_of_measurement: "dBmV" }],
  us_power: ["44.8", { unit_of_measurement: "dBmV" }],
  ds_rate: ["1000", { unit_of_measurement: "Mbit/s" }],
  us_rate: ["100", { unit_of_measurement: "Mbit/s" }],
  internet_access: ["on", { device_class: "connectivity" }],
  cable_issue: ["off", { device_class: "problem" }],
  last_successful_update: [updatedAt],
  connection_interruptions: ["1"],
  us_t3: ["0"],
  failed_updates: ["0"],
  line_stability: ["Licht wisselend"],
  api_status: ["OK"],
  ds_uncorrected_ofdm: ["0"],
};
const states = {};
const registry = [];
for (const [key, [state, attributes = {}]] of Object.entries(readings)) {
  const domain = attributes.device_class ? "binary_sensor" : "sensor";
  const entity_id = `${domain}.ziggo_modem_${key}`;
  states[entity_id] = { entity_id, state, attributes, last_updated: updatedAt };
  registry.push({
    platform: "ziggo_modem",
    device_id: "demo-modem",
    entity_id,
    unique_id: `demo_${key}`,
  });
}
const hass = {
  locale: { language: "nl" },
  states,
  callWS: async () => registry,
  callApi: async (_method, path) => {
    const [period, query] = path.split("?");
    const start = Date.parse(decodeURIComponent(period.split("/").pop()));
    const end = Date.parse(new URLSearchParams(query).get("end_time"));
    const samples = Array.from({ length: 80 }, (_, index) => ({
      entity_id: "sensor.ziggo_modem_ds_snr",
      last_changed: new Date(
        start + ((end - start) * index) / 79,
      ).toISOString(),
      state: (
        36.4 +
        Math.sin(index * 0.55) * 0.4 +
        Math.cos(index * 1.8) * 0.15
      ).toFixed(2),
    }));
    return [samples];
  },
};
for (const [id, layout] of [
  ["large", "expanded"],
  ["small", "compact"],
]) {
  const card = document.createElement("ziggo-modem-card");
  document.getElementById(id).append(card);
  card.setConfig({ type: "custom:ziggo-modem-card", layout });
  card.hass = hass;
}
