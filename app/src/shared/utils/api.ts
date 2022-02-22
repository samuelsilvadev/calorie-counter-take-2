export const ENDPOINTS = {
  FOODS: "/foods",
  FAVORITE_FOODS: "/favorite-foods",
  USERS: "/users",
};

export function api(endpoint: string) {
  return `${process.env.REACT_APP_API_URL}${endpoint}`;
}
