import { api, ENDPOINTS } from "shared/utils/api";
import type {
  SaveFavoriteFoodAPIResponse,
  SaveFavoriteFoodAPIResponseOk,
} from "./types";

export async function postFavoriteFood(
  foodId: string,
  userId: string
): Promise<SaveFavoriteFoodAPIResponse> {
  try {
    const response = await fetch(api(ENDPOINTS.FAVORITE_FOODS), {
      method: "POST",
      body: JSON.stringify({
        food: foodId,
        user: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsedResponse: SaveFavoriteFoodAPIResponseOk = await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
