export const ENDPOINTS = {
  FOODS: "/foods",
  USERS: "/users",
};

export function api(endpoint: string) {
  return `${process.env.REACT_APP_API_URL}${endpoint}`;
}
