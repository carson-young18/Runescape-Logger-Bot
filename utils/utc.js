export default function utcDate (date) {
  const [day, monthStr, yearTime] = date.split('-');
  const [year, time] = yearTime.split(' ');
  const [hours, minutes] = time.split(':');

  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const month = months[monthStr];

  const utcDate = new Date(Date.UTC(parseInt(year), month, parseInt(day), parseInt(hours) - 1, parseInt(minutes))).toISOString();

  return utcDate;
}