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

  const handleChangeCheckedAll = (value: boolean) => {
    setCheckedAll(value);
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
          <div className="grid grid-cols-4 gap-3 mb-5 mt-4">
            <DatePicker
              onChange={(value: string) => {
                setDate(value);
              }}
              defaultDate={date}
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
                    {/* <th className="px-1 py-4 text-center">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-primary-c10 hover:text-grey-c700">
                    <th className="pl-3 py-4">MMA Class</th>
                    <th className="px-1 py-4">Monday</th>
                    <th className="px-1 py-4">14:00</th>
                    <th className="px-1 py-4">16:00</th>
                    <th className="px-1 py-4">2 hours</th>
                    <th className="px-1 py-4">30</th>
                    <th className="px-1 py-4">--</th>
                    <th className="px-1 py-4">--</th>
                  </tr>
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
                  <tr className="hover:bg-primary-c10 hover:text-grey-c700">
                    <th className="pl-3 py-4">1</th>
                    <th className="px-1 py-4">Anh Leonard</th>
                    <th className="px-1 py-4">7/1/2024</th>
                    <th className="px-1 py-4">
                      <Checkbox isChecked={checkedAll} />
                    </th>
                    <th className="px-1 py-4">
                      <TextArea rows={2} label="Note of this student" />
                    </th>
                  </tr>
                  <tr className="hover:bg-primary-c50 hover:text-grey-c700">
                    <th className="pl-3 py-4">1</th>
                    <th className="px-1 py-4">Anh Leonard</th>
                    <th className="px-1 py-4">7/1/2024</th>
                    <th className="px-1 py-4">
                      <Checkbox isChecked={checkedAll} />
                    </th>
                    <th className="px-1 py-4">
                      <TextArea rows={2} label="Note of this student" />
                    </th>
                  </tr>
                  <tr className="hover:bg-primary-c50 hover:text-grey-c700">
                    <th className="pl-3 py-4">1</th>
                    <th className="px-1 py-4">Anh Leonard</th>
                    <th className="px-1 py-4">7/1/2024</th>
                    <th className="px-1 py-4">
                      <Checkbox isChecked={checkedAll} />
                    </th>
                    <th className="px-1 py-4">
                      <TextArea rows={2} label="Note of this student" />
                    </th>
                  </tr>
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
