import { useState, useEffect, useRef } from "react";
import "./DatePicker.css"; 

type DatePickerProps = {
  onDateSelect: (selectedDate: string) => void;
};

type CalendarDay = number | null;


const DatePicker = ({onDateSelect}: DatePickerProps) => {

  const [selectedDate, setSelectedDate] = useState<string | null>(null); 
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false); 
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()); 
  const calendarRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Update selected date when clicked on calendar icon
  useEffect(() => {
    if (selectedDate) {
      const [date, month, year] = selectedDate.split("-").map(Number);
      setCurrentMonth(new Date(year, month - 1)); // Set month correctly (0-based index)
    }
  }, [selectedDate]);



  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
    onDateSelect(e.target.value);
  };

  // Handle selecting a date from the calendar
  const handleDateSelect = (date: string): void => {
    const [year, month, day] = date.split("-");
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
    setIsCalendarOpen(false); 
  };



  const goToPreviousMonth = (): void => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(prevMonth);
  };


  const goToNextMonth = (): void => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(nextMonth);
  };


  // Render the current calendar popup
  const renderCalendar = (): JSX.Element => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    let calendarDays: CalendarDay[][] = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      let week: CalendarDay[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(null); // Empty day slots before the 1st day of the month
        } else if (day <= daysInMonth) {
          week.push(day);
          day++;
        } else {
          week.push(null);
        }
      }
      calendarDays.push(week);
      if (day > daysInMonth) break;
    }

    return (
      <div className="calendar-popup">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M14 18l1.41-1.41L10.83 12l4.58-4.59L14 6l-6 6z"></path>
            </svg>
          </button>

          <span>{`${currentMonth.toLocaleString("default", { month: "long" })} ${year}`}</span>
          <button onClick={goToNextMonth}>
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {calendarDays.map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`
                      ${day ? "" : "empty"} 
                      ${(day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()) || 
                       (day === Number(selectedDate?.split("-")[0]) && currentMonth.getMonth() === Number(selectedDate?.split("-")[1]) - 1) 
                        ? "selected" : ""}
                    `}
                    onClick={() =>
                      day && handleDateSelect(`${year}-${month + 1}-${day}`)
                    }
                  >
                    {day}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="date-picker" ref={calendarRef}>
      <input
        type="text"
        value={selectedDate || ""}
        onChange={handleDateChange}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)} 
        className="calendar-input"
        placeholder="Select Date"
      />
      <button
        className="calendar-icon"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Toggle calendar on icon click
      >
        <svg
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          fill="currentColor"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
        </svg>
      </button>
      {isCalendarOpen && renderCalendar()}
    </div>
  );
};

export default DatePicker;
