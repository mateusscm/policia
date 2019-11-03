export const endpoint = "http://localhost:8080";

export const conf = {
  mode: "cors",
  cache: "default",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};
export const confGET = { ...conf, method: "GET" };
export const confPOST = { ...conf, method: "POST" };
export const confDEL = { ...conf, method: "DELETE" };
