export const toLocaleDateString = (timestamp) => {
  const date = new Date(timestamp);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day =
    Number(date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`;
  const hour =
    Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`;
  const min =
    Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${day}/${month}/${year}`;
};

export const convertSecondToDate = (second) => {
  const time = new Date(second * 1000);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return time.toLocaleString("en-GB", options);
};


export const formatDate = (date) => {
  let temp = new Date(date);
  let hours = temp.getHours();
  let minutes = temp.getMinutes();
  let day = temp.getDate();
  let month = temp.getMonth();
  let year = temp.getFullYear();
  let result = '';
  if (hours < 10) {
      result += "0" + hours + ":"
  }
  else {
      result += hours + ":"
  }
  if (minutes < 10) {
      result += "0" + minutes + " "
  }
  else {
      result += minutes + " "
  }
  if (day < 10) {
      result += "0" + day + "/"
  }
  else {
      result += day + "/"
  }
  if (month + 1 < 10) {
      result += "0" + (month + 1) + "/"
  }
  else {
      result += (month + 1) + "/"
  }
  result += year
  return result
}
