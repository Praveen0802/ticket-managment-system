import { CURRENT_USER } from "./types";

export const updateCurrentUser = (data) => ({
  type: CURRENT_USER,
  data: data,
});
