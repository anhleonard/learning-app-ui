"use client";
import Button from "@/lib/button";
import Checkbox from "@/lib/checkbox";
import DatePicker from "@/lib/date-picker";
import Pagination from "@/lib/pagination";
import Select from "@/lib/select";
import TextArea from "@/lib/textarea";
import Image from "next/image";
import React, { useState } from "react";

const Attendance = () => {
  const [date, setDate] = useState("");
  const [checkedAll, setCheckedAll] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const [classesInfo, setClassesInfo] = useState([
    {
      id: 1,
      name: "MMA Class",
      day: "Monday",
      timeStart: "14:00",
      timeEnd: "16:00",
      studyTime: "2 hours",
      totalStudents: 30,
      attendance: 25,
      absence: 5,
    },
    {
      id: 2,
      name: "TLA Class",
      day: "Wednesday",
      timeStart: "08:00",
      timeEnd: "10:00",
      studyTime: "2 hours",
      totalStudents: 25,
      attendance: 20,
      absence: 5,
    },
    {
      id: 3,
      name: "English Class",
      day: "Friday",
      timeStart: "15:00",
      timeEnd: "17:00",
      studyTime: "2 hours",
      totalStudents: 20,
      attendance: 18,
      absence: 2,
    },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn An", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 2, name: "Trần Thị Bình", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 3, name: "Lê Văn Cường", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 4, name: "Phạm Thị Dung", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 5, name: "Hoàng Văn Em", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 6, name: "Ngô Thị Phương", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 7, name: "Đỗ Văn Giang", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 8, name: "Vũ Thị Hương", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 9, name: "Bùi Văn Khoa", learningDate: "7/1/2024", isAttend: false, note: "" },
    { id: 10, name: "Lý Thị Lan", learningDate: "7/1/2024", isAttend: false, note: "" },
  ]);

  const handleChangeCheckedAll = (value: boolean) => {
    setCheckedAll(value);
    setStudents(students.map((s) => ({ ...s, isAttend: value })));
  };

  const handleChangeStudentChecked = (id: number, value: boolean) => {
    const updatedStudents = students.map((s) => (s.id === id ? { ...s, isAttend: value } : s));
    setStudents(updatedStudents);

    const allChecked = updatedStudents.every((s) => s.isAttend);
    setCheckedAll(allChecked);
  };

  const handleChangeSelect = (classId: number) => {
    if (selectedClassId === classId) {
      setSelectedClassId(null);
    } else {
      setSelectedClassId(classId);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-8">
        <Image src="/icons/vertical-divide.svg" alt="vertical-divide" width={2} height={20} />
        <div className="text-xl font-bold">Attendance</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="font-bold text-base">1. Information</div>

          {/* filter class */}
          <div className="grid grid-cols-4 gap-3 mb-6 mt-4">
            <DatePicker
              onChange={(value: string) => {
                setDate(value);
              }}
              defaultDate={date || "13/05/2025"}
              label="Select date"
            />
            <Select
              label="Select class"
              options={[
                { label: "MMA Class", value: "MMA" },
                { label: "TLA Class", value: "TLA" },
              ]}
              defaultValue="MMA"
            />
            <div className="flex flex-row gap-3">
              <Button label="Filter" className="py-[13px] px-8" status="success" />
              <Button label="Cancel" className="py-[13px] px-8" status="cancel" />
            </div>
          </div>

          {/* table 1 */}
          <div className="max-w-[100%] rounded-[10px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className={`text-grey-c700 uppercase bg-primary-c50`}>
                  <tr className="hover:bg-success-c50 hover:text-grey-c700 font-bold">
                    <th className="pl-3 py-4">Class</th>
                    <th className="px-1 py-4">Day</th>
                    <th className="px-1 py-4">Time start</th>
                    <th className="px-1 py-4">Time end</th>
                    <th className="px-1 py-4">Study time</th>
                    <th className="px-1 py-4">Total students</th>
                    <th className="px-1 py-4">Attendance</th>
                    <th className="px-1 py-4">Absence</th>
                    <th className="px-1 py-4 text-center">Selected</th>
                  </tr>
                </thead>
                <tbody>
                  {classesInfo.map((classInfo) => (
                    <tr key={classInfo.id} className="hover:bg-primary-c10 hover:text-grey-c700">
                      <th className="pl-3 py-4">{classInfo.name}</th>
                      <th className="px-1 py-4">{classInfo.day}</th>
                      <th className="px-1 py-4">{classInfo.timeStart}</th>
                      <th className="px-1 py-4">{classInfo.timeEnd}</th>
                      <th className="px-1 py-4">{classInfo.studyTime}</th>
                      <th className="px-1 py-4">{classInfo.totalStudents}</th>
                      <th className="px-1 py-4">{classInfo.attendance}</th>
                      <th className="px-1 py-4">{classInfo.absence}</th>
                      <th className="px-1 py-4 text-center">
                        <Checkbox
                          isChecked={selectedClassId === classInfo.id}
                          onChange={() => handleChangeSelect(classInfo.id)}
                        />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between">
            <div className="font-bold text-base">2. Students</div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox isChecked={checkedAll} onChange={handleChangeCheckedAll} />
              <div>All</div>
            </div>
          </div>
          {/* table 2 */}
          <div className="max-w-[100%] rounded-[10px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left">
                <thead className={`text-grey-c700 uppercase bg-primary-c50 font-bold`}>
                  <tr className="hover:bg-success-c50 hover:text-grey-c700">
                    <th className="pl-3 py-4">STT</th>
                    <th className="px-1 py-4">Name</th>
                    <th className="px-1 py-4">Date</th>
                    <th className="px-1 py-4">Status</th>
                    <th className="px-1 py-4">Note</th>
                    {/* <th className="px-1 py-4 text-center">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    return (
                      <tr key={student.id} className="hover:bg-primary-c10">
                        <th className="pl-3 py-4">{index + 1}</th>
                        <th className="px-1 py-4 font-questrial text-grey-c900 text-[15px]">{student.name}</th>
                        <th className="px-1 py-4">{student.learningDate}</th>
                        <th className="px-1 py-4">
                          <Checkbox
                            isChecked={student.isAttend}
                            onChange={(value: boolean) => handleChangeStudentChecked(student.id, value)}
                          />
                        </th>
                        <th className="px-1 py-4">
                          <TextArea rows={2} label="Note of this student" inputClassName="font-questrial" />
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* end table */}
          <div className="flex items-center gap-8 justify-end mt-2">
            <Button label="Save" className="!py-2.5 !px-5" status="success" />
            <Pagination
              totalItems={50}
              onPageChange={(page: number, rowsPerPage: number) => console.log({ page, rowsPerPage })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
