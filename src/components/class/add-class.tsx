import { AmountSessions, Days, Times } from "@/config/constants";
import Button from "@/lib/button";
import Collapse from "@/lib/collapse";
import Divider from "@/lib/divider";
import Label from "@/lib/label";
import Select from "@/lib/select";
import TextArea from "@/lib/textarea";
import TextField from "@/lib/textfield";
import Image from "next/image";
import React from "react";

const AddClass = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Name of class"
        defaultValue="Anh Leonard"
        error={true}
        helperText="Please enter an valid value"
      />
      <Select
        label="Sessions per week"
        options={AmountSessions}
        error={true}
        helperText="Please enter an valid value"
      />
      <TextArea label="About class" error={true} helperText="Please enter an valid value" />

      <div className="mx-1 my-2">
        <Divider />
      </div>

      <div className="flex flex-col gap-8">
        <Collapse title={<Label label="Session 1" className="w-fit" />} defaultOpen={true}>
          <Select label="Select day" options={Days} position="top" />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Start time"
              options={Times}
              position="top"
              endIcon={<Image src="/icons/clock-icon.svg" alt="clock-icon" width={20} height={20} />}
              isRotateIcon={false}
            />
            <Select
              label="End time"
              options={Times}
              position="top"
              endIcon={<Image src="/icons/clock-icon.svg" alt="clock-icon" width={20} height={20} />}
              isRotateIcon={false}
            />
          </div>
          <TextField label="Money of this session" />
        </Collapse>

        <Collapse title={<Label label="Session 2" className="w-fit" />} defaultOpen={true}>
          <Select label="Select day" options={Days} position="top" />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Start time"
              options={Times}
              position="top"
              endIcon={<Image src="/icons/clock-icon.svg" alt="clock-icon" width={20} height={20} />}
              isRotateIcon={false}
            />
            <Select
              label="End time"
              options={Times}
              position="top"
              endIcon={<Image src="/icons/clock-icon.svg" alt="clock-icon" width={20} height={20} />}
              isRotateIcon={false}
            />
          </div>
          <TextField label="Money of this session" />
        </Collapse>
      </div>

      <div className="mx-1 my-2">
        <Divider />
      </div>

      <Button label="Save" className="w-full py-3.5 mt-2 mb-6" />
    </div>
  );
};

export default AddClass;
