export const formatTime = (time: Date) => {
  return `${time.getFullYear()}/${
    time.getMonth() + 1
  }/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
};

export const getDateString = (time: Date) => {
  const month =
    time.getMonth() + 1 < 10
      ? '0' + String(time.getMonth() + 1)
      : time.getMonth() + 1;
  const date =
    time.getDate() < 10 ? '0' + String(time.getDate()) : time.getDate();
  console.log(`${time.getFullYear()}-${month}-${date}`);
  return `${time.getFullYear()}-${month}-${date}`;
};
