"use client";
import DetailHistoryModal from "@/components/history/detail-history";
import { ConfirmState, ModalState } from "@/config/types";
import { openConfirm } from "@/redux/slices/confirm-slice";
import { openModal } from "@/redux/slices/modal-slice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

// Mock data for classes - replace this with your actual data structure
interface Class {
  id: string;
  name: string;
  time: string;
  teacher: string;
  status: "attended" | "absent" | "pending"; // attended: đã điểm danh, absent: nghỉ học, pending: chưa điểm danh/chưa tới
}

interface DayClasses {
  [key: string]: Class[]; // Format: "DD-MM-YYYY": Class[]
}

// Mock data - replace with your actual data
const mockClasses: DayClasses = {
  // Current month classes
  "01-05-2025": [
    { id: "1", name: "Math Class", time: "09:00 - 10:30", teacher: "Mr. Smith", status: "attended" },
    { id: "2", name: "English Class", time: "14:00 - 15:30", teacher: "Ms. Johnson", status: "absent" },
  ],
  "02-05-2025": [{ id: "3", name: "Science Class", time: "10:00 - 11:30", teacher: "Dr. Brown", status: "pending" }],
  "05-05-2025": [
    { id: "4", name: "History Class", time: "09:00 - 10:30", teacher: "Mrs. Davis", status: "attended" },
    { id: "5", name: "Art Class", time: "13:00 - 14:30", teacher: "Mr. Wilson", status: "attended" },
    { id: "6", name: "Music Class", time: "15:00 - 16:30", teacher: "Ms. Taylor", status: "absent" },
  ],
  "08-05-2025": [
    { id: "7", name: "Physics Class", time: "10:00 - 11:30", teacher: "Dr. Anderson", status: "pending" },
    { id: "8", name: "Chemistry Class", time: "14:00 - 15:30", teacher: "Mr. White", status: "pending" },
  ],
  "12-05-2025": [
    { id: "9", name: "Biology Class", time: "09:00 - 10:30", teacher: "Dr. Lee", status: "pending" },
    { id: "10", name: "Geography Class", time: "11:00 - 12:30", teacher: "Mrs. Clark", status: "pending" },
  ],
  "15-05-2025": [
    { id: "11", name: "Literature Class", time: "10:00 - 11:30", teacher: "Ms. Garcia", status: "pending" },
    { id: "12", name: "Computer Science", time: "14:00 - 15:30", teacher: "Mr. Martinez", status: "pending" },
  ],
  "18-05-2025": [
    { id: "13", name: "Economics Class", time: "09:00 - 10:30", teacher: "Dr. Thompson", status: "pending" },
    { id: "14", name: "Psychology Class", time: "13:00 - 14:30", teacher: "Mrs. Moore", status: "pending" },
  ],
  "20-05-2025": [
    { id: "15", name: "Philosophy Class", time: "10:00 - 11:30", teacher: "Mr. Jackson", status: "pending" },
    { id: "16", name: "Sociology Class", time: "14:00 - 15:30", teacher: "Dr. Harris", status: "pending" },
  ],
  "22-05-2025": [
    { id: "17", name: "Political Science", time: "09:00 - 10:30", teacher: "Ms. Lewis", status: "pending" },
    { id: "18", name: "Anthropology", time: "11:00 - 12:30", teacher: "Mr. Walker", status: "pending" },
  ],
  "25-05-2025": [
    { id: "19", name: "Statistics Class", time: "10:00 - 11:30", teacher: "Dr. Hall", status: "pending" },
    { id: "20", name: "Calculus Class", time: "14:00 - 15:30", teacher: "Mrs. Allen", status: "pending" },
  ],
  "27-05-2025": [
    { id: "21", name: "Algebra Class", time: "09:00 - 10:30", teacher: "Mr. Young", status: "pending" },
    { id: "22", name: "Geometry Class", time: "13:00 - 14:30", teacher: "Ms. King", status: "pending" },
  ],
  "29-05-2025": [
    { id: "23", name: "Trigonometry", time: "10:00 - 11:30", teacher: "Dr. Wright", status: "pending" },
    { id: "24", name: "Linear Algebra", time: "14:00 - 15:30", teacher: "Mr. Lopez", status: "pending" },
  ],
};

const CalendarPage = () => {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(moment());
  const [calendarDays, setCalendarDays] = useState<
    Array<{
      day: number;
      weekday: string;
      date: string;
    }>
  >([]);

  const getAllDaysInMonth = (month: number, year: number) => {
    const totalDays = new Date(year, month, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(year, month - 1, i + 1);
      return {
        day: i + 1,
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: moment(date).format("DD-MM-YYYY"),
      };
    });
  };

  const getDaysWithWeekdayOffset = (month: number, year: number) => {
    const days = getAllDaysInMonth(month, year);
    const firstDay = new Date(year, month - 1, 1);
    const firstDayWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Add empty cells for days before the first day of the month
    const emptyCells = Array(firstDayWeekday).fill(null);

    return [...emptyCells, ...days];
  };

  useEffect(() => {
    const days = getDaysWithWeekdayOffset(currentDate.month() + 1, currentDate.year());
    // Always fill to 42 cells (6 rows x 7 columns)
    const paddedDays = [...days];
    while (paddedDays.length < 42) {
      paddedDays.push(null);
    }
    setCalendarDays(paddedDays);
  }, [currentDate]);

  const handlePreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  const renderDayCell = (day: (typeof calendarDays)[0] | null) => {
    if (!day) {
      return <div className="aspect-square p-2 bg-grey-c50" />;
    }

    const classes = mockClasses[day.date] || [];
    const today = moment().format("DD-MM-YYYY");
    const isToday = day.date === today;
    const MAX_VISIBLE_CLASSES = 3;
    const hasMoreClasses = classes.length > MAX_VISIBLE_CLASSES;
    const visibleClasses = classes.slice(0, MAX_VISIBLE_CLASSES);

    const getClassStyle = (status: string) => {
      switch (status) {
        case "attended":
          return "bg-success-c100 text-success-c800 hover:bg-success-c200";
        case "absent":
          return "bg-support-c50/50 text-support-c700 hover:bg-support-c100/60";
        default:
          return "bg-primary-c100 text-primary-c900 hover:bg-primary-c200";
      }
    };

    return (
      <div className={`aspect-square p-2 bg-white relative`}>
        <div
          className={`mb-1 ${isToday ? "text-primary-c900 text-sm font-black" : "text-grey-c900 text-sm font-medium"}`}
        >
          {day.day}
        </div>
        <div className="space-y-1 h-[calc(100%-24px)] overflow-y-auto custom-scrollbar">
          {visibleClasses.map((classItem) => (
            <div
              key={classItem.id}
              className={`text-xs p-1.5 rounded transition-colors cursor-pointer ${getClassStyle(classItem.status)}`}
              title={`${classItem.name} - ${classItem.time} (${classItem.teacher})`}
            >
              <div className="font-medium truncate">{classItem.name}</div>
              <div
                className={`text-[10px] truncate ${
                  classItem.status === "attended"
                    ? "text-success-c600"
                    : classItem.status === "absent"
                    ? "text-support-c300"
                    : "text-primary-c700"
                }`}
              >
                {classItem.time}
              </div>
            </div>
          ))}
          {hasMoreClasses && (
            <div className="text-xs text-center text-primary-c600 bg-primary-c50 rounded py-1">
              +{classes.length - MAX_VISIBLE_CLASSES} more
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleOpenViewModal = () => {
    const modal: ModalState = {
      isOpen: true,
      title: "History detail",
      content: <DetailHistoryModal />,
      className: "max-w-lg",
    };

    dispatch(openModal(modal));
  };

  const handleOpenConfirmDelete = () => {
    const confirm: ConfirmState = {
      isOpen: true,
      title: "Are you sure?",
      subtitle: "This action cannot be undone. All values associated in this student will be lost.",
      titleAction: "Delete",
      handleAction: () => {},
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-8">
        <Image src="/icons/vertical-divide.svg" alt="vertical-divide" width={2} height={20} />
        <div className="text-xl font-bold">Calendar</div>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-base mb-4">1. Calendar</div>

        {/* Calendar Grid */}
        <div className="border border-grey-c200 rounded-lg overflow-hidden">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-grey-c200">
            <button onClick={handlePreviousMonth} className="p-2 hover:bg-grey-c100 rounded-full transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="text-lg font-semibold">{currentDate.format("MMMM YYYY")}</div>
            <button onClick={handleNextMonth} className="p-2 hover:bg-grey-c100 rounded-full transition-colors">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 bg-white">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div
                key={day}
                className={`p-2 text-center text-sm font-medium text-grey-c700 border-b border-r border-grey-c200 ${
                  index === 6 ? "border-r-0" : ""
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const isLastRow = index >= calendarDays.length - 7;
              const isLastColumn = index % 7 === 6;

              return (
                <div
                  key={index}
                  className={`border-b border-r border-grey-c200 ${isLastColumn ? "border-r-0" : ""} ${
                    isLastRow ? "border-b-0" : ""
                  }`}
                >
                  {renderDayCell(day)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
