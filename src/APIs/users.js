import { postData } from "./api-client";

export function onlogin(credentials) {
  return postData(`/users/login`, credentials);
}
