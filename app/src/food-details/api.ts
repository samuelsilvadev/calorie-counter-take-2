import { api, ENDPOINTS } from "shared/utils/api";
import type { GetFoodAPIResponseOk } from "./types";

export async function fetchFood(id: string): Promise<GetFoodAPIResponseOk> {
  try {
    const response = await fetch(api(`${ENDPOINTS.FOODS}/${id}`));
    const parsedResponse: GetFoodAPIResponseOk = await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
