import Label from "@/lib/label";
import Image from "next/image";
import React from "react";

const DetailClassModal = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* 1. */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-primary-c900">1. General information</div>
          <Label status="success" label="ACTIVE" />
        </div>
        <div className="py-2 px-4 flex flex-col gap-2">
          {/* 1. Name */}
          <div className="px-3 py-2.5 flex flex-row items-center justify-between bg-primary-c50 rounded-xl">
            <div className="flex flex-row items-center gap-2">
              <Image src="/icons/name-icon.svg" alt="name-icon" width={20} height={20} />
              <div className="text-grey-c900">Name</div>
            </div>
            <div className="text-grey-c700">MMA Class</div>
          </div>

          {/* 2. Created at */}
          <div className="px-3 py-2.5 flex flex-row items-center justify-between bg-primary-c50 rounded-xl">
            <div className="flex flex-row items-center gap-2">
              <Image src="/icons/created-icon.svg" alt="created-icon" width={20} height={20} />
              <div className="text-grey-c900">Created at</div>
            </div>
            <div className="text-grey-c700">07/01/2025</div>
          </div>

          {/* 2. Sessions per week */}
          <div className="px-3 py-2.5 flex flex-row items-center justify-between bg-primary-c50 rounded-xl">
            <div className="flex flex-row items-center gap-2">
              <Image src="/icons/ring-icon.svg" alt="ring-icon" width={20} height={20} />
              <div className="text-grey-c900">Sessions per week</div>
            </div>
            <div className="text-grey-c700">2</div>
          </div>

          {/* 2. Students */}
          <div className="px-3 py-2.5 flex flex-row items-center justify-between bg-primary-c50 rounded-xl">
            <div className="flex flex-row items-center gap-2">
              <Image src="/icons/student-detail-icon.svg" alt="student-detail-icon" width={20} height={20} />
              <div className="text-grey-c900">Students</div>
            </div>
            <div className="text-grey-c700">20</div>
          </div>
        </div>
      </div>

      {/* 2. */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-primary-c900">2. Description</div>
        </div>
        <div className="py-2 px-4 flex flex-col gap-2">
          <div className="px-3 py-2.5 flex flex-row items-center justify-between bg-primary-c50 rounded-xl">
            <div className="text-grey-c900">This is description about your class</div>
          </div>
        </div>
      </div>

      {/* 3. */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-primary-c900">3. Detail sessions</div>
        </div>
        <div className="py-2 px-4 flex flex-col gap-3">
          {/* 1. session 1 */}
          <div className="px-3 py-3 bg-primary-c50 rounded-xl text-grey-c900">
            {/* title */}
            <div className="font-semibold mb-2">Session 1</div>
            {/* detail information */}
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-4 rounded-[10px]">
              {/* 1. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/day-icon.svg" alt="day-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Day</div>
                  <div className="text-grey-c900 font-bold">Monday</div>
                </div>
              </div>

              {/* 2. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/duration-icon.svg" alt="duration-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Duration</div>
                  <div className="text-grey-c900 font-bold">2 hours</div>
                </div>
              </div>

              {/* 3. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/time-icon.svg" alt="time-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Time</div>
                  <div className="text-grey-c900 font-bold">14:00 - 16:00</div>
                </div>
              </div>

              {/* 4. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/price-icon.svg" alt="price-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Price</div>
                  <div className="text-grey-c900 font-bold">60.000 VND</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. session 2 */}
          <div className="px-3 py-3 bg-primary-c50 rounded-xl text-grey-c900">
            {/* title */}
            <div className="font-semibold mb-2">Session 2</div>
            {/* detail information */}
            <div className="grid grid-cols-2 gap-4 bg-white px-4 py-4 rounded-[10px]">
              {/* 1. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/day-icon.svg" alt="day-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Day</div>
                  <div className="text-grey-c900 font-bold">Monday</div>
                </div>
              </div>

              {/* 2. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/duration-icon.svg" alt="duration-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Duration</div>
                  <div className="text-grey-c900 font-bold">2 hours</div>
                </div>
              </div>

              {/* 3. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/time-icon.svg" alt="time-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Time</div>
                  <div className="text-grey-c900 font-bold">14:00 - 16:00</div>
                </div>
              </div>

              {/* 4. */}
              <div className="flex flex-row gap-2 items-start">
                <Image src="/icons/price-icon.svg" alt="price-icon" width={24} height={24} />
                <div className="flex flex-col">
                  <div className="text-xs text-grey-c300">Price</div>
                  <div className="text-grey-c900 font-bold">60.000 VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailClassModal;
