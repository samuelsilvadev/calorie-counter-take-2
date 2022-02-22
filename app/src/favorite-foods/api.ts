import { api, ENDPOINTS } from "shared/utils/api";
import type {
  GetAllFavoritesAPIResponse,
  RemoveFavoriteFoodAPIResponse,
  RemoveFavoriteFoodAPIResponseOk,
  SaveFavoriteFoodAPIResponse,
  SaveFavoriteFoodAPIResponseOk,
} from "./types";

export async function getFavoriteFoodsByUser(
  userId: string
): Promise<GetAllFavoritesAPIResponse> {
  try {
    const endpointWithUserQuery = `${ENDPOINTS.FAVORITE_FOODS}?user=${userId}`;
    const response = await fetch(api(endpointWithUserQuery));
    const parsedResponse: GetAllFavoritesAPIResponse = await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}

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

export async function deleteFavoriteFood(
  favoriteFoodId: string
): Promise<RemoveFavoriteFoodAPIResponse> {
  try {
    const response = await fetch(
      api(`${ENDPOINTS.FAVORITE_FOODS}/${favoriteFoodId}`),
      {
        method: "DELETE",
      }
    );
    const parsedResponse: RemoveFavoriteFoodAPIResponseOk =
      await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
