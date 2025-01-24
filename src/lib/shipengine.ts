import ShipEngine from "shipengine";

// Ensure that the API key is defined
const apiKey = process.env.SHIPENGINE_API_KEY;

if (!apiKey) {
  throw new Error("SHIPENGINE_API_KEY is not defined.");
}

const shipEngine = new ShipEngine({
  apiKey,
});

export { shipEngine };
