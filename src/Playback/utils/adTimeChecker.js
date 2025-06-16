const isAdTimeNow = (minutes, seconds) => {
  const isPreHalfHourAdTime =
    (minutes === 27 && seconds >= 30) ||
    minutes === 28 ||
    minutes === 29 ||
    (minutes === 30 && seconds === 0);

  const isPreOnHourAdTime =
    minutes === 57 ||
    minutes === 58 ||
    minutes === 59 ||
    (minutes === 0 && seconds === 0);

  return isPreHalfHourAdTime || isPreOnHourAdTime;
};

export default isAdTimeNow;
