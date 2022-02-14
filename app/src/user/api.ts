import { api, ENDPOINTS } from "shared/utils/api";
import type {
  GetAllUsersByEmailAPIResponse,
  GetAllUsersByEmailAPIResponseOk,
} from "./types";

export async function fetchUser(
  email: string
): Promise<GetAllUsersByEmailAPIResponse> {
  try {
    const endpointWithEmailQuery = `${ENDPOINTS.USERS}?email=${email}`;

    const response = await fetch(api(endpointWithEmailQuery));
    const parsedResponse: GetAllUsersByEmailAPIResponseOk =
      await response.json();

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}
