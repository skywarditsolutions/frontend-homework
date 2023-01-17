export const convertDateFromUTC = (ts) => {
  let d = new Date(ts * 1000);
  const convertedDate = d.toLocaleTimeString();

  return convertedDate;
};

export const getIcon = (iconUrl) => {
  return <img src={iconUrl} alt="weather icon" width="50px" height="50px" />;
};

export const getDayOfWeek = (day) => {
  if (day >= 7) {
    day = day - 7;
  }

  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "unknown";
  }
};
