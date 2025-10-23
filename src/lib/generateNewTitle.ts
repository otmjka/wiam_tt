import { format, isToday, isYesterday } from 'date-fns';

/**
 * Generates a default memo title.
 * @param {Date} date The date for the memo.
 * @returns {string} The generated title.
 */
const generateNewTitle = (date = new Date()) => {
  const timePart = format(date, 'HH:mm');

  if (isToday(date)) {
    return `new memo ${timePart}`;
  } else if (isYesterday(date)) {
    return `new memo yesterday ${timePart}`;
  } else {
    // Example: "Aug 11, 23:12"
    const datePart = format(date, 'MMM d');
    return `new memo ${datePart}, ${timePart}`;
  }
};

export default generateNewTitle;
