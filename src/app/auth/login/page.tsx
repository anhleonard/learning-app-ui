"use client";
import { ModalState } from "@/config/types";
import Button from "@/lib/button";
import TextField from "@/lib/textfield";
import { openModal } from "@/redux/slices/modal-slice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Add your login API call here
        console.log("Login form submitted:", values);
        // After successful login, redirect to calendar page
        router.push("/calendar");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const handleShowModal = () => {
    const modal: ModalState = {
      title: "Forgot Password",
      content: <ForgotPasswordModal />,
      isOpen: true,
      className: "max-w-xl",
    };
    dispatch(openModal(modal));
  };

  return (
    <div className="bg-white h-screen text-grey-c900 grid md:grid-cols-7">
      {/* left content */}
      <div className="hidden md:block relative w-full h-full col-span-3">
        <Image
          src={"/images/auth-bg.png"}
          alt="auth-background"
          fill
          className="object-cover p-4 rounded-[30px] object-[65%_75%]"
        />
      </div>
      {/* right content */}
      <div className="md:col-span-4 flex flex-col items-center mt-20 2xl:mt-40 w-full flex-shrink-0">
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          <div className="text-2xl font-bold text-grey-c700">WELCOME TO</div>
          <div className="text-5xl font-extrabold text-primary-c900">ATTENDANCE</div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 w-2/3">
          <div className="text-2xl font-bold text-grey-c400">LOGIN</div>
          <div className="flex flex-col items-center justify-center gap-4 w-full px-8">
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
              <div className="w-full">
                <TextField
                  label="Email"
                  className="w-full"
                  startIcon={<Image src="/icons/mail-icon.svg" alt="mail-icon" width={20} height={20} />}
                  placeholder="Enter your email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email ? String(formik.errors.email) : undefined}
                />
              </div>
              <div className="w-full">
                <TextField
                  label="Password"
                  className="w-full"
                  startIcon={<Image src="/icons/lock-icon.svg" alt="lock-icon" width={21} height={21} />}
                  endIcon={
                    <button
                      type="button"
                      className="flex items-center justify-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        src={showPassword ? "/icons/view-icon.svg" : "/icons/view-off.svg"}
                        alt="view-icon"
                        width={21}
                        height={21}
                      />
                    </button>
                  }
                  inputType={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  helperText={
                    formik.touched.password && formik.errors.password ? String(formik.errors.password) : undefined
                  }
                />
              </div>
              <div className="w-full flex justify-end">
                <Link href="/auth/forgot-password" className="text-primary-c900 text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  label="Login"
                  className="py-3 w-full"
                  disabled={!formik.isValid || formik.isSubmitting}
                />
              </div>
            </form>
            <div className="text-grey-c400 text-sm">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-primary-c900 underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const ForgotPasswordModal = () => {
  return (
    <div className="flex flex-col gap-4 py-4 px-3">
      <TextField
        label="Email"
        className="w-full"
        startIcon={<Image src="/icons/mail-icon.svg" alt="mail-icon" width={20} height={20} />}
        placeholder="Enter your email"
      />
      <div className="flex justify-end">
        <Button label="Send" className="py-3 w-32" />
      </div>
    </div>
  );
};
