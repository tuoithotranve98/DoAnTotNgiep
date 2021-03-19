import moment from 'moment';

export const getFormattedDate = (date, form = 'DD/MM/YYYY') => {
  if (!date) return '';
  try {
    const result = moment(date).format(form);
    return result;
  } catch (error) {
    return '';
  }
};

export const formatDate = timestamp => {
  const date = new Date(timestamp);
  const today = new Date();
  const month = toPadZeroString(date.getMonth() + 1);
  const dateOfMonth = toPadZeroString(date.getDate());

  if (isSameDay(date, today)) {
    return timeString(date);
  }
  if (date.getFullYear() === today.getFullYear()) {
    return `${dateOfMonth}/${month}`;
  }
  return `${dateOfMonth}/${month}/${date.getFullYear()}`;
};

export const formatTime = (time) => {
  const options = {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  };
  return time.toLocaleString('vi', options);
};

export const formatTimeToDate = (time) => {
  try {
    const date = new Date(time);
    const options = {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    };
    const temp = date.toLocaleString('en-GB', options);
    if (temp.includes('Invalid')) {
      return time;
    }
    return temp;
  } catch (e) {
    return time;
  }
};

export const convertTimeToString = timestamp => {
  const currenYear = new Date().getFullYear();
  const a = new Date(timestamp);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  let min = a.getMinutes();
  if (min.toString().length <= 1) {
    min = `0${min.toString()}`;
  }
  let time = `${hour}:${min} - ${date}/${month}`;
  if (year < currenYear) {
    time = `${hour}:${min} - ${date}/${month}/${year}`;
  }
  return time;
};

export const timeString = date => {
  const hours = toPadZeroString(date.getHours());
  const minutes = toPadZeroString(date.getMinutes());
  return `${hours}:${minutes}`;
};

export const dateString = date => {
  const month = toPadZeroString(date.getMonth() + 1);
  const dateOfMonth = toPadZeroString(date.getDate());
  return `${date.getFullYear()}/${month}/${dateOfMonth}`;
};

function toPadZeroString(n) {
  return n >= 10 ? `${n}` : `0${n}`;
}

export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
  );
}

export const secsToLocalString = secs => {
  secs = Math.round(secs);
  const hours = Math.round(secs / 3600);
  secs %= 3600;
  const minutes = Math.round(secs / 60);
  secs %= 60;
  const seconds = secs;

  const rs = [];
  if (hours > 0) {
    rs.push(hours, 'giờ');
  }
  if (minutes > 0) {
    rs.push(minutes, 'phút');
  }
  if (seconds > 0) {
    rs.push(seconds, 'giây');
  }

  return rs.join(' ');
};

export const toLocaleDateString = timestamp => {
  const date = new Date(timestamp);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = Number(date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`;
  const hour = Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`;
  const min = Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${day}/${month}/${year} ${hour}:${min}`;
};


export const convertToTimeDate = timestamp => {
  const date = new Date(timestamp);
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = Number(date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`;
  const hour = Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`;
  const min = Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${hour}:${min}, ${day}/${month}`;
};
