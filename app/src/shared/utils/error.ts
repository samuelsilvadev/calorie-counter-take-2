import type { GetAllErrorFE } from "shared/types/api";

export function identityError(error: Error, resource: string): GetAllErrorFE {
  if (error.name === "TypeError" && error.message === "Failed to fetch") {
    return {
      message: "Something went wrong while fetching the data.",
      name: "FetchError",
      error: true,
      responseTimestamp: Date.now().toString(),
      status: true,
      statusCode: 500,
      resource,
    };
  }

  return {
    message: "Something went wrong...",
    name: "GenericError",
    error: true,
    responseTimestamp: Date.now().toString(),
    status: true,
    statusCode: 500,
    resource,
  };
}
