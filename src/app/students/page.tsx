"use client";
import AddStudent from "@/components/student/add-student";
import { ModalState } from "@/config/types";
import Button from "@/lib/button";
import Pagination from "@/lib/pagination";
import Select from "@/lib/select";
import { openDrawer } from "@/redux/slices/drawer-slice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";

const Students = () => {
  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    const drawer: ModalState = {
      isOpen: true,
      title: "Add student",
      content: <AddStudent />,
    };

    dispatch(openDrawer(drawer));
  };

  const [date, setDate] = useState(null);

  const handleChange = (newDate: any) => {
    setDate(newDate);
  };

  const configs = {
    isRange: false, // Set to false to disable range selection
    display: {
      months: 1, // Display only one month
    },
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-8">
        <Image src="/icons/vertical-divide.svg" alt="vertical-divide" width={2} height={20} />
        <div className="text-xl font-bold">Students</div>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-base">1. Student list</div>

        {/* filter class */}
        <div className="grid grid-cols-6 gap-3 mb-5 mt-4">
          <div className="col-span-4 grid sm:grid-cols-4 sm:gap-3">
            <div className="sm:col-span-2">
              <Select
                label="Select student"
                options={[
                  { label: "Anh Leonard", value: "MMA" },
                  { label: "Norbu Wangmo", value: "TLA" },
                ]}
                defaultValue="MMA"
              />
            </div>
            <Select
              label="Status"
              options={[
                { label: "Active", value: "ACTIVE" },
                { label: "Inactive", value: "INACTIVE" },
              ]}
            />
          </div>
          <div className="col-span-2 text-end">
            {/* put item center when use grid */}
            <div className="inline-grid justify-center items-center">
              <Button
                label="Add student"
                status="success"
                className="py-3 px-4"
                startIcon={<Image src={"/icons/add-icon.svg"} alt="add-icon" width={20} height={20} />}
                onClick={handleOpenDrawer}
              />
            </div>
          </div>
        </div>

        {/* table 1 */}
        <div className="max-w-[100%] rounded-[10px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead className={`text-grey-c700 uppercase bg-primary-c50`}>
                <tr className="hover:bg-success-c50 hover:text-grey-c700 font-bold">
                  <th className="pl-3 py-4">STT</th>
                  <th className="px-1 py-4">Name</th>
                  <th className="px-1 py-4">Date of birth</th>
                  <th className="px-1 py-4">Class</th>
                  <th className="px-1 py-4">Parent</th>
                  <th className="px-1 py-4">Phone number</th>
                  <th className="px-1 py-4">Secondary</th>
                  <th className="px-1 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-primary-c10 hover:text-grey-c700">
                  <th className="pl-3 py-4">1</th>
                  <th className="px-1 py-4">Anh Leonard</th>
                  <th className="px-1 py-4">20/02/2002</th>
                  <th className="px-1 py-4">MMA Class</th>
                  <th className="px-1 py-4">Chị Liệu</th>
                  <th className="px-1 py-4">0394356433</th>
                  <th className="px-1 py-4">0948555555</th>
                  <th className="px-1 py-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button data-tooltip-id="edit-icon" data-tooltip-content="Edit">
                        <Image src="/icons/edit-icon.svg" alt="edit-icon" width={24} height={24} />
                      </button>
                      <Tooltip id="edit-icon" />

                      <button data-tooltip-id="delete-icon" data-tooltip-content="Delete">
                        <Image src="/icons/delete-icon.svg" alt="delete-icon" width={24} height={24} />
                      </button>
                      <Tooltip id="delete-icon" />
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5">
          <Pagination
            totalItems={50}
            onPageChange={(page: number, rowsPerPage: number) => console.log({ page, rowsPerPage })}
          />
        </div>
      </div>
    </div>
  );
};

export default Students;
