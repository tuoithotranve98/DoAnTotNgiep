import * as API from 'constants/api';

export default (fetchImplementation) => (store) => (next) => (action) => {
  if (action) {
    if (action.type && action.type === "FETCH") {
      const { url, params } = action;
        // const urlWithAccountId = url.includes("?")
        //   ? `${url}&userId=${store.getState().auth.user.id}`
        //   : `${url}?userId=${store.getState().auth.user.id}`;
        const urlWithAccountId = url;
        const token = store.getState().auth.accessToken;
      return wrapAccessToken(
        urlWithAccountId,
        params,
        token,
        store
      )(fetchImplementation);
    }
    return next(action);
  }
};

const wrapAccessToken = (url, params, token, store) => (
  fetchImplementation
) => {
  params.headers = params.headers || {};
  params.headers["X-APP-PAGE-TOKEN"] = token;
  params.headers["Origin"] = API.PORT;
  params.headers["Access-Control-Allow-Origin"] = "*";
  params.headers["Access-Control-Allow-Methods"] = "HEAD, GET, POST, PUT, PATCH, DELETE";
  if (params.isContentType !== false) {
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
