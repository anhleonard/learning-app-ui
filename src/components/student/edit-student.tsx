import { ConfirmState, ModalState } from "@/config/types";
import Button from "@/lib/button";
import DatePicker from "@/lib/date-picker";
import Divider from "@/lib/divider";
import Select from "@/lib/select";
import TextField from "@/lib/textfield";
import { openConfirm } from "@/redux/slices/confirm-slice";
import { closeLoading, openLoading } from "@/redux/slices/loading-slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface Props {  
  studentId: number;
}

const EditStudent = ({ studentId }: Props) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  const getStudent = async (studentId: number) => {
    try {
      dispatch(openLoading());
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log('test get student')
        }, 3000);
      });
    } catch (error) {
      
    } finally {
      dispatch(closeLoading());
    }
  }

  useEffect(() => {
    getStudent(studentId);
  }, [studentId]);

  return (
    <div className="flex flex-col gap-5">
      <TextField label="Name of student" inputClassName="font-questrial"/>
      <DatePicker
        onChange={(value: string) => {
          setDate(value);
        }}
        defaultDate={date}
        label="Date of birth"
        error={true}
        helperText="Please enter an valid value"
      />
      <Select
        label="Class"
        options={[
          {
            label: "MMA Class",
            value: "MMA_CLASS",
          },
          {
            label: "TLA Class",
            value: "TLA_CLASS",
          },
        ]}
      />
      <TextField label="Name of parent" inputClassName="font-questrial"/>
      <TextField label="Phone number" />
      <TextField label="Secondary phone number" defaultValue="0394356433" />

      <div className="mx-1 my-2">
        <Divider />
      </div>

      <Button label="Save" className="w-full py-3.5 mt-2 mb-6" />
    </div>
  );
};

export default EditStudent;
