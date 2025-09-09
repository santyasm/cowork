import {useEffect, useState} from "react";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const [time, setTime] = useState(value ? formatTime(value) : "");
  const [date, setDate] = useState(value ? formatDate(value) : "");

  // Format Date -> "HH:mm"
  function formatTime(date: Date) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  // Format Date -> "YYYY-MM-DD"
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateStr = e.target.value;
    setDate(newDateStr);

    if (!newDateStr) return;

    const [year, month, day] = newDateStr.split("-").map(Number);
    const newDate = new Date(year, month - 1, day); // mês 0-indexado

    const [hours, minutes] = time ? time.split(":").map(Number) : [0, 0];
    newDate.setHours(hours, minutes);

    onChange(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (!date) return;

    const [year, month, day] = date.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);

    const [hours, minutes] = newTime.split(":").map(Number);
    newDate.setHours(hours, minutes);

    onChange(newDate);
  };

useEffect(() => {
    if (value) {
      setDate(formatDate(value));
      setTime(formatTime(value));
    }
  }, [value]);

  return (
    <div className="flex flex-row gap-6 items-start md:items-end">
      {/* Date */}
      <div className="flex flex-col gap-2">
        <label htmlFor="date-picker" className="font-medium">Data</label>
        <Input
          type="date"
          id="date-picker"
          value={date}
          onChange={handleDateChange}
          className="w-40 px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Time */}
      <div className="flex flex-col gap-2">
        <label htmlFor="time-picker" className="font-medium">Hora</label>
        <Input
          type="time"
          id="time-picker"
          step={60}
          value={time}
          onChange={handleTimeChange}
          className="w-40 px-4 py-2 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
}
