export const transfers = (stops: number) => {
  switch (stops) {
    case 0:
      return "0 пересадок";
    case 1:
      return "1 пересадка";
    default:
      return `${stops} пересадки`;
  }
};

export const formatDate = (date: string, duration: number) => {
  const formatedDate = new Date(date);
  const formatedDateTwo = new Date(
    formatedDate.getTime() + duration * 60 * 1000
  );
  return `${String(formatedDate.getUTCHours()).padStart(2, "0")}:${String(
    formatedDate.getUTCMinutes()
  ).padStart(2, "0")} - ${String(formatedDateTwo.getUTCHours()).padStart(
    2,
    "0"
  )}:${String(formatedDateTwo.getUTCMinutes()).padStart(2, "0")}`;
};
