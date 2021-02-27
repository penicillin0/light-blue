import { ATCODER_API_ENDPOINT, AIZU_API_ENDPOINT } from "./constants";

export const getAtCoderStatus = async (useNmame: string) => {
  const resp = await fetch(`${ATCODER_API_ENDPOINT}?user=${useNmame}`, {
    credentials: "same-origin",
  });
  return resp.json();
};

export const getAizuStatus = async (useNmame: string) => {
  const resp = await fetch(`${AIZU_API_ENDPOINT}/${useNmame}`, {
    credentials: "same-origin",
  });
  return resp.json();
};
