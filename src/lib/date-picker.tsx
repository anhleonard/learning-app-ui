import moment from "moment";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Months = [
  { label: "JAN", value: "JAN", realValue: 1 },
  { label: "FEB", value: "FEB", realValue: 2 },
  { label: "MAR", value: "MAR", realValue: 3 },
  { label: "APR", value: "APR", realValue: 4 },
  { label: "MAY", value: "MAY", realValue: 5 },
  { label: "JUN", value: "JUN", realValue: 6 },
  { label: "JUL", value: "JUL", realValue: 7 },
  { label: "AUG", value: "AUG", realValue: 8 },
  { label: "SEP", value: "SEP", realValue: 9 },
  { label: "OCT", value: "OCT", realValue: 10 },
  { label: "NOV", value: "NOV", realValue: 11 },
  { label: "DEC", value: "DEC", realValue: 12 },
];

const abbreviationMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

interface YearStyle {
  label: string;
  value: number;
}

const generateYears = (topYear: number): YearStyle[] => {
  const years: YearStyle[] = [];
  const step = 1;

  for (let i = 0; i < 12; i++) {
    const year = topYear + i * step;
    years.push({ label: `${year}`, value: year });
  }

  return years;
};

type GetDaysOptions = {
  startDays?: number;
  endDays?: number;
};

const getAllDaysInMonth = (
  month: number,
  year: number,
  options: GetDaysOptions = {},
): { day: number; weekday: string }[] => {
  const { startDays, endDays } = options;
  if (startDays === 0 || endDays === 0) return [];
  const totalDays = new Date(year, month, 0).getDate();

  const daysRange = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      day: i + 1,
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  });

  if (startDays) return daysRange.slice(0, startDays);
  if (endDays) return daysRange.slice(-endDays);

  return daysRange;
};

const getFull42Days = (month: number, year: number) => {
  const filteredDays = getAllDaysInMonth(month, year).map((day) => ({
    ...day,
    isBefore: false,
    isNext: false,
  }));
  const firstDayWeekday = filteredDays[0].weekday;
  const weekdayOffset: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const insertStartDays = getAllDaysInMonth(month - 1, year, {
    endDays: weekdayOffset[firstDayWeekday],
  }).map((day) => ({ ...day, isBefore: true, isNext: false }));

  const remainDays = 42 - insertStartDays.length - filteredDays.length;

  const insertEndDays = getAllDaysInMonth(month + 1, year, {
    startDays: remainDays,
  }).map((day) => ({ ...day, isBefore: false, isNext: true }));

  return [...insertStartDays, ...filteredDays, ...insertEndDays];
};

const formatDatePicker = (dateObj: { currentDate: number; currentMonth: string; currentYear: number }): string => {
  const monthMap: Record<string, string> = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };

  const { currentDate, currentMonth, currentYear } = dateObj;
  const month = monthMap[currentMonth.toUpperCase()] || "00";

  return `${String(currentDate).padStart(2, "0")}-${month}-${currentYear}`;
};

interface Props {
  defaultDate?: string;
  //eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  onChange?: Function;
  label?: string;
  error?: boolean;
  helperText?: string;
}

const DatePicker = ({ defaultDate, onChange, label, error = false, helperText = "" }: Props) => {
  const [day, month, year] = defaultDate ? defaultDate.split("-") : moment(new Date()).format("DD-MM-YYYY").split("-");
  const fixedYear = parseInt(year) ?? new Date().getFullYear();
  const fixedMonth =
    abbreviationMonths[parseInt(month) - 1] ??
    Months.find((item) => item.realValue === new Date().getMonth() + 1)?.value;
  const fixedDate = parseInt(day) ?? new Date().getDate();

  const [isSelectMonth, setIsSelectMonth] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(fixedMonth);
  const [isSelectYear, setIsSelectYear] = useState(false);
  const [currentYear, setCurrentYear] = useState(fixedYear);
  const [topYear, setTopYear] = useState(currentYear);
  const [listYear, setListYear] = useState<Array<YearStyle>>([{ label: "0", value: 0 }]);
  const [direction, setDirection] = useState<"forward" | "backward" | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [renderDays, setRenderDays] = useState<any>([]);

  const [currentDate, setCurrentDate] = useState(fixedDate);

  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen((pre) => !pre);
  };

  const openSelectMonth = () => {
    setIsSelectMonth((pre) => !pre);
    if (isSelectYear) {
      setIsSelectYear(false);
    }
  };

  const handleChangeMonth = (value: string) => {
    setCurrentMonth(value);
    setIsSelectMonth(false);
  };

  const handleChangeYear = (value: number) => {
    setCurrentYear(value);
    setIsSelectYear(false);
  };

  const openSelectYear = () => {
    setIsSelectYear((pre) => !pre);
    if (isSelectMonth) {
      setIsSelectMonth(false);
    }
  };

  const handleBackYear = () => {
    setDirection("backward");
  };

  const handleNextYear = () => {
    setDirection("forward");
  };

  useEffect(() => {
    if (direction) {
      const generatedYears = generateYears(topYear);
      setListYear(generatedYears);
      setDirection(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topYear]);

  useEffect(() => {
    if (direction === "forward") {
      setTopYear((pre) => pre + 12);
    } else if (direction === "backward") {
      setTopYear((pre) => pre - 12);
    }
  }, [direction]);

  useEffect(() => {
    if (!isSelectYear) {
      const generatedYears = generateYears(currentYear);
      setListYear(generatedYears);
      setDirection(null);
      setTopYear(currentYear);
    }
  }, [isSelectYear, currentYear]);

  useEffect(() => {
    const foundedMonth = Months.find((item) => item.value === currentMonth);
    if (foundedMonth) {
      const filteredDays = getFull42Days(foundedMonth?.realValue, currentYear);
      setRenderDays(filteredDays);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (currentMonth && currentYear && currentDate && onChange) {
      const formattedDate = formatDatePicker({
        currentDate: currentDate,
        currentMonth: currentMonth,
        currentYear: currentYear,
      });
      onChange(formattedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const handleBackMonth = () => {
    const currentIndex = Months.findIndex((month) => month.value === currentMonth);
    if (currentIndex === 0) {
      // Nếu đang là JAN, lùi về DEC năm trước
      setCurrentMonth(Months[11].value);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      // Lùi lại 1 tháng
      setCurrentMonth(Months[currentIndex - 1].value);
    }
  };

  const handleNextMonth = () => {
    const currentIndex = Months.findIndex((month) => month.value === currentMonth);
    if (currentIndex === 11) {
      // Nếu đang là DEC, tiến tới JAN năm sau
      setCurrentMonth(Months[0].value);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      // Tiến lên 1 tháng
      setCurrentMonth(Months[currentIndex + 1].value);
    }
  };

  const handleChangeDate = (value: number, stateMonth: "before" | "next" | "current") => {
    if (stateMonth === "current") {
      setCurrentDate(value);
      setIsOpen(false);
    } else if (stateMonth === "before") {
      setCurrentDate(value);
      const currentIndex = Months.findIndex((month) => month.value === currentMonth);
      if (currentIndex === 0) {
        setCurrentMonth(Months[11].value);
        setCurrentYear((prevYear) => prevYear - 1);
      } else {
        setCurrentMonth(Months[currentIndex - 1].value);
      }
      setIsOpen(false);
    } else if (stateMonth === "next") {
      setCurrentDate(value);
      const currentIndex = Months.findIndex((month) => month.value === currentMonth);
      if (currentIndex === 11) {
        setCurrentMonth(Months[0].value);
        setCurrentYear((prevYear) => prevYear + 1);
      } else {
        setCurrentMonth(Months[currentIndex + 1].value);
      }
      setIsOpen(false);
    }
  };

  const AllMonths = () => {
    return (
      <div className="grid grid-cols-2 gap-2.5 py-3">
        {Months.map((month, index) => {
          return (
            <button
              key={index}
              onClick={() => handleChangeMonth(month.value)}
              className={`text-center border border-grey-c100 rounded-lg py-2.5 ${
                currentMonth === month.value
                  ? " border-primary-c600 bg-primary-c100"
                  : "hover:bg-primary-c50 hover:border-primary-c300 active:bg-primary-c100 focus:bg-primary-c100"
              }`}
            >
              {month.value}
            </button>
          );
        })}
      </div>
    );
  };

  const AllYears = () => {
    return (
      <div className="grid grid-cols-2 gap-2.5 py-3">
        {listYear.map((year, index) => {
          return (
            <button
              key={index}
              onClick={() => handleChangeYear(year.value)}
              className={`text-center border border-grey-c100 rounded-lg py-2.5 ${
                currentYear === year.value
                  ? " border-primary-c600 bg-primary-c100"
                  : "hover:bg-primary-c50 hover:border-primary-c300 active:bg-primary-c100 focus:bg-primary-c100"
              }`}
            >
              {year.value}
            </button>
          );
        })}
      </div>
    );
  };

  const handleLabelClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div ref={datePickerRef} className="relative w-full text-gray-700">
        <label
          onClick={handleLabelClick}
          className={`absolute left-4 font-semibold transition-all duration-200 z-10 cursor-text -top-[8px] bg-white px-1 text-xs
            ${isOpen ? "text-primary-c900" : "text-grey-c200"}
            ${error ? "bg-gradient-to-b from-transparent to-support-c10" : ""}
          `}
        >
          {label ?? "Default label"}
        </label>
        <input
          type="text"
          className={`relative transition duration-300 py-3 pl-4 pr-14 w-full border-[2px] 
             dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 tracking-wide text-sm placeholder-grey-c400 
             text-grey-c900 disabled:opacity-40 disabled:cursor-not-allowed rounded-[20px] 
             ring-0 focus:ring-0 focus:outline-none shadow-none focus:shadow-none cursor-pointer ${
               isOpen && !error
                 ? "border-primary-c900"
                 : error
                 ? "border-support-c100 bg-support-c10"
                 : "border-grey-c200 hover:border-primary-c300"
             }`}
          placeholder="DD-M-YYYY"
          autoComplete="off"
          role="presentation"
          value={defaultDate}
          onClick={handleOpen}
          readOnly
        />

        <button
          type="button"
          onClick={handleOpen}
          className="absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="w-[21px] h-[21px] flex justify-center items-center">
            {<Image src="/icons/calendar-icon.svg" alt="calendar-icon" width={21} height={21} />}
          </div>
        </button>
        <div
          className={`transition-all duration-300 absolute z-20 mt-[-24px] text-sm lg:text-xs 2xl:text-sm translate-y-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="mt-2.5 shadow-sm border border-primary-c500 px-1 py-0.5 bg-white dark:bg-slate-800 dark:text-white dark:border-slate-600 rounded-lg">
            <div className="flex items-stretch flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1.5 md:pl-1 pr-2 lg:pr-1">
              <div className="w-[296px]">
                <div className="flex items-center space-x-1.5 border border-grey-c200 dark:border-gray-700 rounded-md px-2 py-1.5 mt-2">
                  <div className={`${isSelectMonth ? "hidden" : ""}`}>
                    <button
                      type="button"
                      onClick={isSelectYear ? handleBackYear : handleBackMonth}
                      className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 hover:bg-grey-c50 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-1 items-center space-x-1.5">
                    <div className="w-1/2">
                      <button
                        onClick={openSelectMonth}
                        type="button"
                        className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 px-3 py-[0.55rem] uppercase hover:bg-primary-c100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                      >
                        {currentMonth}
                      </button>
                    </div>
                    <div className="w-1/2">
                      <button
                        type="button"
                        onClick={openSelectYear}
                        className="w-full tracking-wide dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 px-3 py-[0.55rem] uppercase hover:bg-primary-c100 rounded-md focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                      >
                        {currentYear}
                      </button>
                    </div>
                  </div>
                  <div className={`${isSelectMonth ? "hidden" : ""}`}>
                    <button
                      type="button"
                      onClick={isSelectYear ? handleNextYear : handleNextMonth}
                      className="dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10 transition-all duration-300 hover:bg-grey-c50 rounded-full p-[0.45rem] focus:ring-1 focus:ring-blue-500/50 focus:bg-blue-100/50"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* paste here */}
                {isSelectMonth ? (
                  <AllMonths />
                ) : isSelectYear ? (
                  <AllYears />
                ) : (
                  <div className="px-0.5 sm:px-2 mt-0.5 min-h-[285px]">
                    <div className="grid grid-cols-7 border-b border-gray-300 dark:border-gray-700 py-2">
                      <div className="tracking-wide text-grey-c500 text-center">Sun</div>
                      <div className="tracking-wide text-grey-c500 text-center">Mon</div>
                      <div className="tracking-wide text-grey-c500 text-center">Tue</div>
                      <div className="tracking-wide text-grey-c500 text-center">Wed</div>
                      <div className="tracking-wide text-grey-c500 text-center">Thu</div>
                      <div className="tracking-wide text-grey-c500 text-center">Fri</div>
                      <div className="tracking-wide text-grey-c500 text-center">Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-0.5 my-1">
                      {renderDays.length &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        renderDays.map((item: any, index: number) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              className={`flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10  rounded-full transition-all ${
                                !item.isBefore && !item.isNext ? "text-grey-c900" : "text-grey-c300"
                              } ${
                                item?.day === currentDate &&
                                !item.isBefore &&
                                !item.isNext &&
                                currentMonth === fixedMonth &&
                                currentYear === fixedYear
                                  ? "bg-primary-c100"
                                  : "hover:bg-primary-c50 active:bg-primary-c100"
                              }`}
                              onClick={() =>
                                handleChangeDate(
                                  item?.day,
                                  item?.isBefore ? "before" : item?.isNext ? "next" : "current",
                                )
                              }
                            >
                              {item?.day}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {helperText ? <div className="text-xs mt-0.5 pl-1 text-support-c300">{helperText}</div> : null}
    </div>
  );
};

export default DatePicker;
