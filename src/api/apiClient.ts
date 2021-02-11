import { API_ENDPOINT } from "./constants";

export const getAtCoderStatus = async (useNmame: string) => {
  const resp = await fetch(`${API_ENDPOINT}?user=${useNmame}`, {
    credentials: "same-origin",
  });
  return resp.json();
};
