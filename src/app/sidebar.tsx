"use client";
import Divider from "@/lib/divider";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-[260px] h-full bg-white border-r border-grey-c100 overflow-y-auto hidden md:block">
      <div className="flex flex-col gap-2 justify-center items-center py-6">
        <Image src={"/images/avatar-user.jpg"} alt="User avatar" width={60} height={60} className="rounded-full" />
        <div className="font-bold text-grey-c900 text-base">Anh Leonard</div>
      </div>
      <Divider />
      <div className="flex flex-col p-3 gap-3">
        <div
          className={`flex flex-row px-4 py-3.5 items-center gap-2 active:bg-primary-c300 hover:bg-primary-c200 cursor-pointer rounded-xl duration-300 transition ${
            pathname === "/attendance" ? "bg-primary-c100" : ""
          }`}
          onClick={() => router.push("/attendance")}
        >
          <Image src="/icons/attendance-icon.svg" alt="attendance-icon" width={24} height={24} />
          <div className="font-semibold text-primary-c900">Attendance</div>
        </div>
        <div
          className={`flex flex-row px-4 py-3.5 items-center gap-2 active:bg-primary-c300 hover:bg-primary-c200 cursor-pointer rounded-xl duration-300 transition ${
            pathname === "/classes" ? "bg-primary-c100" : ""
          }`}
          onClick={() => router.push("/classes")}
        >
          <Image src="/icons/class-icon.svg" alt="class-icon" width={24} height={24} />
          <div className="font-semibold text-primary-c900">Classes</div>
        </div>
        <div
          className={`flex flex-row px-4 py-3.5 items-center gap-2 active:bg-primary-c300 hover:bg-primary-c200 cursor-pointer rounded-xl duration-300 transition ${
            pathname === "/students" ? "bg-primary-c100" : ""
          }`}
          onClick={() => router.push("/students")}
        >
          <Image src="/icons/student-icon.svg" alt="student-icon" width={24} height={24} />
          <div className="font-semibold text-primary-c900">Students</div>
        </div>
        <div
          className={`flex flex-row px-4 py-3.5 items-center gap-2 active:bg-primary-c300 hover:bg-primary-c200 cursor-pointer rounded-xl duration-300 transition ${
            pathname === "/payments" ? "bg-primary-c100" : ""
          }`}
          onClick={() => router.push("/payments")}
        >
          <Image src="/icons/payment-icon.svg" alt="payment-icon" width={26} height={26} />
          <div className="font-semibold text-primary-c900">Payments</div>
        </div>
        <div
          className={`flex flex-row px-4 py-3.5 items-center gap-2 active:bg-primary-c300 hover:bg-primary-c200 cursor-pointer rounded-xl duration-300 transition ${
            pathname === "/histories" ? "bg-primary-c100" : ""
          }`}
          onClick={() => router.push("/histories")}
        >
          <Image src="/icons/statistic-icon.svg" alt="statistic-icon" width={24} height={24} />
          <div className="font-semibold text-primary-c900">Histories</div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Sidebar;
