export const MONTHS = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

export const AmountSessions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
];

export const Days = [
  {
    label: "Monday",
    value: "MONDAY",
  },
  {
    label: "Tuesday",
    value: "TUESDAY",
  },
  {
    label: "Wednesday",
    value: "WEDNESDAY",
  },
  {
    label: "Thursday",
    value: "THURSDAY",
  },
  {
    label: "Friday",
    value: "FRIDAY",
  },
  {
    label: "Saturday",
    value: "SATURDAY",
  },
  {
    label: "Sunday",
    value: "SUNDAY",
  },
];

const generateTimeSlots = (startHour: number, endHour: number, intervalMinutes: number = 30) => {
  const slots = [];
  const totalMinutes = (endHour - startHour) * 60;
  const intervals = Math.floor(totalMinutes / intervalMinutes);

  for (let i = 0; i <= intervals; i++) {
    const minutes = i * intervalMinutes;
    const hour = Math.floor((startHour * 60 + minutes) / 60);
    const minute = (startHour * 60 + minutes) % 60;
    
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    slots.push({
      label: timeString,
      value: timeString,
    });
  }

  return slots;
};

// generateTimeSlots(5, 22, 15) cho khoảng cách 15 phút thay vì 30 phút
export const Times = generateTimeSlots(5, 22);
