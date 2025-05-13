import { ConfirmState, ModalState } from "@/config/types";
import Button from "@/lib/button";
import DatePicker from "@/lib/date-picker";
import Divider from "@/lib/divider";
import Select from "@/lib/select";
import TextField from "@/lib/textfield";
import { openConfirm } from "@/redux/slices/confirm-slice";
import { closeLoading, openLoading } from "@/redux/slices/loading-slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  studentId: number;
}

interface EditStudentFormValues {
  studentName: string;
  dateOfBirth: string;
  class: string;
  parentName: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
}

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required("Student name is required").min(2, "Student name must be at least 2 characters"),
  dateOfBirth: Yup.string()
    .required("Date of birth is required")
    .test("is-valid-date", "Invalid date format", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      return date instanceof Date && !isNaN(date.getTime());
    })
    .test("is-future-date", "Date of birth cannot be in the future", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      return date <= new Date();
    }),
  class: Yup.string().required("Class is required").oneOf(["MMA_CLASS", "TLA_CLASS"], "Please select a valid class"),
  parentName: Yup.string().required("Parent name is required").min(2, "Parent name must be at least 2 characters"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(11, "Phone number must not exceed 11 digits"),
  secondaryPhoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Secondary phone number must contain only digits")
    .min(10, "Secondary phone number must be at least 10 digits")
    .max(11, "Secondary phone number must not exceed 11 digits")
    .nullable(),
});

const initialValues: EditStudentFormValues = {
  studentName: "",
  dateOfBirth: "",
  class: "",
  parentName: "",
  phoneNumber: "",
  secondaryPhoneNumber: "",
};

const EditStudent = ({ studentId }: Props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        dispatch(openLoading());
        // TODO: Handle form submission
        console.log(values);
        helpers.setSubmitting(false);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(closeLoading());
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const getStudent = async (studentId: number) => {
    try {
      dispatch(openLoading());
      // TODO: Replace with actual API call
      await new Promise((resolve) => {
        setTimeout(() => {
          // Mock data
          const mockStudentData = {
            studentName: "John Doe",
            dateOfBirth: "01-01-2025",
            class: "MMA_CLASS",
            parentName: "Jane Doe",
            phoneNumber: "0123456789",
            secondaryPhoneNumber: "0394356433",
          };
          formik.setValues(mockStudentData);
          resolve(true);
        }, 300);
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getStudent(studentId);
  }, [studentId]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <TextField
        name="studentName"
        label="Name of student"
        inputClassName="font-questrial"
        value={formik.values.studentName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.studentName && formik.errors.studentName)}
        helperText={
          formik.touched.studentName && formik.errors.studentName ? String(formik.errors.studentName) : undefined
        }
      />

      <DatePicker
        onChange={(value: string) => {
          formik.setFieldValue("dateOfBirth", value);
        }}
        defaultDate={formik.values.dateOfBirth}
        label="Date of birth"
        error={Boolean(formik.touched.dateOfBirth && formik.errors.dateOfBirth)}
        helperText={
          formik.touched.dateOfBirth && formik.errors.dateOfBirth ? String(formik.errors.dateOfBirth) : undefined
        }
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
        defaultValue={formik.values.class}
        onChange={(value) => formik.setFieldValue("class", value)}
        error={Boolean(formik.touched.class && formik.errors.class)}
        helperText={formik.touched.class && formik.errors.class ? String(formik.errors.class) : undefined}
      />

      <TextField
        name="parentName"
        label="Name of parent"
        inputClassName="font-questrial"
        value={formik.values.parentName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.parentName && formik.errors.parentName)}
        helperText={
          formik.touched.parentName && formik.errors.parentName ? String(formik.errors.parentName) : undefined
        }
      />

      <TextField
        name="phoneNumber"
        label="Phone number"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
        helperText={
          formik.touched.phoneNumber && formik.errors.phoneNumber ? String(formik.errors.phoneNumber) : undefined
        }
      />

      <TextField
        name="secondaryPhoneNumber"
        label="Secondary phone number"
        value={formik.values.secondaryPhoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.secondaryPhoneNumber && formik.errors.secondaryPhoneNumber)}
        helperText={
          formik.touched.secondaryPhoneNumber && formik.errors.secondaryPhoneNumber
            ? String(formik.errors.secondaryPhoneNumber)
            : undefined
        }
      />

      <div className="mx-1 my-2">
        <Divider />
      </div>

      <Button
        type="submit"
        label="Save"
        className="w-full py-3.5 mt-2 mb-6"
        disabled={!formik.isValid || formik.isSubmitting}
      />
    </form>
  );
};

export default EditStudent;
