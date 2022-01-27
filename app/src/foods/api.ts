import { api, ENDPOINTS } from "shared/utils/api";
import type { GetAllFoodsAPIResponse, GetAllFoodsAPIResponseOk } from "./types";

export async function fetchAllFoods(): Promise<GetAllFoodsAPIResponse> {
  try {
    const response = await fetch(api(ENDPOINTS.FOODS));
    const parsedResponse: GetAllFoodsAPIResponseOk = await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
