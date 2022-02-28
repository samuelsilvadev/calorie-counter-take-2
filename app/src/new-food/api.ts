import { api, ENDPOINTS } from "shared/utils/api";
import type {
  CreateFood,
  SaveFoodAPIResponse,
  SaveFoodAPIResponseOk,
} from "./types";

export async function saveFood(food: CreateFood): Promise<SaveFoodAPIResponse> {
  try {
    const response = await fetch(api(ENDPOINTS.FOODS), {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse: SaveFoodAPIResponseOk = await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
