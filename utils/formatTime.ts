import { DateTime } from "luxon";

export const formatTime = (dateTime: DateTime, { format }: { format: string }) => {
  return dateTime.toFormat(format).toUpperCase();
};
