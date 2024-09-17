import axios from "axios";

export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`,
    );

    const firstResult = response.data.results[0];
    if (firstResult && firstResult.components.city) {
      return firstResult.components.city.split(" ")[0];
    } else {
      throw new Error("City not found in geocoding results");
    }
  } catch (error) {
    console.error("Error in reverse geocoding:", error);
    throw error;
  }
}
