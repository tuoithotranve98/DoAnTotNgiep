import * as API from "constants/api";
import storage from "./storage";

export default (fetchImplementation) => (store) => (next) => (action) => {
  if (action) {
    if (action.type && action.type === "FETCH") {
      const { url, params } = action;
      const urlWithTenantId = url.includes("?")
        ? `${url}&tenantId=${storage.get("tenantId", false)}`
        : `${url}?tenantId=${storage.get("tenantId", false)}`;
      let token = null;
      if (store.getState().auth.accessToken) {
        token = store.getState().auth.accessToken;
      } else {
        token = storage.get("token", false);
      }
      return wrapAccessToken(
        urlWithTenantId,
        params,
        token,
        store
      )(fetchImplementation);
    }
    return next(action);
  }
};

const wrapAccessToken =
  (url, params, token, store) => (fetchImplementation) => {
    params.headers = params.headers || {};
    params.headers["X-APP-PAGE-TOKEN"] = token;
    params.headers["Origin"] = API.PORT;
    params.headers["Access-Control-Allow-Origin"] = "*";
    params.headers["Access-Control-Allow-Methods"] = "*";
    if (!params.headers["Content-Type"]) {
      params.headers["Content-Type"] = "application/json";
    }
    return fetchImplementation(url, params)
      .then((res) => {
        const body = res.json();
        if (res.ok) {
          return body;
        }
        if (res.status === 401) {
          //
        }
        throw new Error(body.message || res.statusText);
      })
      .catch((e) => {
        console.error(e);
      });
  };

export const fetch = (url, params = {}) => ({
  type: "FETCH",
  url,
  params,
});
