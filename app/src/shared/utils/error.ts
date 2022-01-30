import type { GetAllError } from "shared/types/api";

export function identityError(error: Error): GetAllError {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    return {
      message: "Something went wrong while fetching your foods.",
      name: "FetchError",
      error: true,
      responseTimestamp: Date.now().toString(),
      status: true,
      statusCode: 500,
    };
  }

  return {
    message: "Something went wrong...",
    name: "GenericError",
    error: true,
    responseTimestamp: Date.now().toString(),
    status: true,
    statusCode: 500,
  };
}
