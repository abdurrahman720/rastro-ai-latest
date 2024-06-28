export const formatDate = (date: Date): string => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};
