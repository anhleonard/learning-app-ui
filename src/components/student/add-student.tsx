import Button from "@/lib/button";
import DatePicker from "@/lib/date-picker";
import Divider from "@/lib/divider";
import Select from "@/lib/select";
import TextField from "@/lib/textfield";
import React, { useEffect, useState } from "react";

interface Props {}

const AddStudent = ({}: Props) => {
  const [date, setDate] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <TextField label="Name of student" />
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
      <TextField label="Name of parent" />
      <TextField label="Phone number" />
      <TextField label="Secondary phone number" defaultValue="0394356433" />

      <div className="mx-1 my-2">
        <Divider />
      </div>

      <Button label="Save" className="w-full py-3.5 mt-2 mb-6" />
    </div>
  );
};

export default AddStudent;
