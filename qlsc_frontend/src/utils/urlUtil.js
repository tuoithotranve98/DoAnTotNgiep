
export const getNewParams = (search, changeParam, changeValue) => {
  const urlSearchParams = new URLSearchParams(search);
  urlSearchParams.set(changeParam, changeValue);
  return urlSearchParams.toString();
};
