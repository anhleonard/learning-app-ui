"use client";
import AddClass from "@/components/class/add-class";
import DetailClassModal from "@/components/class/detail-class-modal";
import EditClass from "@/components/class/edit-class";
import { ConfirmState, ModalState } from "@/config/types";
import Button from "@/lib/button";
import Label from "@/lib/label";
import Pagination from "@/lib/pagination";
import Select from "@/lib/select";
import { openConfirm } from "@/redux/slices/confirm-slice";
import { openDrawer } from "@/redux/slices/drawer-slice";
import { openModal } from "@/redux/slices/modal-slice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";

const Classes = () => {
  const dispatch = useDispatch();

  const handleOpenViewModal = () => {
    const modal: ModalState = {
      isOpen: true,
      title: "Detail class",
      content: <DetailClassModal />,
      className: "max-w-lg",
    };

    dispatch(openModal(modal));
  };

  const handleOpenDrawer = () => {
    const drawer: ModalState = {
      isOpen: true,
      title: "Add class",
      content: <AddClass />,
    };

    dispatch(openDrawer(drawer));
  };

  const handleOpenEditDrawer = () => {
    const drawer: ModalState = {
      isOpen: true,
      title: "Edit class",
      content: <EditClass />,
    };

    dispatch(openDrawer(drawer));
  };

  const handleOpenConfirmDelete = () => {
    const confirm: ConfirmState = {
      isOpen: true,
      title: "Are you sure?", 
      subtitle: "This action cannot be undone. All values associated in this class will be lost.",
      titleAction: "Delete",
      handleAction: () => {},
    };

    dispatch(openConfirm(confirm));
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 mb-8">
        <Image src="/icons/vertical-divide.svg" alt="vertical-divide" width={2} height={20} />
        <div className="text-xl font-bold">Classes</div>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-base">1. Class list</div>

        {/* filter class */}
        <div className="grid grid-cols-6 gap-3 mb-5 mt-4">
          <div className="col-span-4 grid sm:grid-cols-4 sm:gap-3">
            <div className="sm:col-span-2">
              <Select
                label="Select class"
                options={[
                  { label: "MMA Class", value: "MMA" },
                  { label: "TLA Class", value: "TLA" },
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
                label="Add class"
                status="success"
                className="py-3 px-4"
                onClick={handleOpenDrawer}
                startIcon={<Image src={"/icons/add-icon.svg"} alt="add-icon" width={20} height={20} />}
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
                  <th className="px-1 py-4">Created at</th>
                  <th className="px-1 py-4">Capacity</th>
                  <th className="px-1 py-4">Total sessions</th>
                  <th className="px-1 py-4">Average</th>
                  <th className="px-1 py-4">Status</th>
                  <th className="px-1 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-primary-c10 hover:text-grey-c700">
                  <th className="pl-3 py-4">1</th>
                  <th className="px-1 py-4">MMA Class</th>
                  <th className="px-1 py-4">7/1/2024</th>
                  <th className="px-1 py-4">30</th>
                  <th className="px-1 py-4">2</th>
                  <th className="px-1 py-4">60.000 VND</th>
                  <th className="px-1 py-4">
                    <Label status="success" label="ACTIVE" />
                  </th>
                  <th className="px-1 py-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button data-tooltip-id="view-icon" data-tooltip-content="View" onClick={handleOpenViewModal}>
                        <Image src="/icons/detail-icon.svg" alt="detail-icon" width={24} height={24} />
                      </button>
                      <Tooltip id="view-icon" />

                      <button data-tooltip-id="edit-icon" data-tooltip-content="Edit" onClick={handleOpenEditDrawer}>
                        <Image src="/icons/edit-icon.svg" alt="edit-icon" width={24} height={24} />
                      </button>
                      <Tooltip id="edit-icon" />

                      <button data-tooltip-id="delete-icon" data-tooltip-content="Delete" onClick={handleOpenConfirmDelete}>
                        <Image src="/icons/delete-icon.svg" alt="delete-icon" width={24} height={24} />
                      </button>
                      <Tooltip id="delete-icon" />
                    </div>
                  </th>
                </tr>
                <tr className="hover:bg-primary-c10 hover:text-grey-c700">
                  <th className="pl-3 py-4">1</th>
                  <th className="px-1 py-4">MMA Class</th>
                  <th className="px-1 py-4">7/1/2024</th>
                  <th className="px-1 py-4">30</th>
                  <th className="px-1 py-4">2</th>
                  <th className="px-1 py-4">60.000 VND</th>
                  <th className="px-1 py-4">
                    <Label status="error" label="INACTIVE" />
                  </th>
                  <th className="px-1 py-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button title="View">
                        <Image src="/icons/detail-icon.svg" alt="detail-icon" width={24} height={24} />
                      </button>
                      <button title="Edit">
                        <Image src="/icons/edit-icon.svg" alt="edit-icon" width={24} height={24} />
                      </button>
                      <button title="Delete">
                        <Image src="/icons/delete-icon.svg" alt="delete-icon" width={24} height={24} />
                      </button>
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

export default Classes;
