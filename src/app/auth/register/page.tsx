"use client";
import Button from "@/lib/button";
import TextField from "@/lib/textfield";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // TODO: Add your registration API call here
        console.log("Form submitted:", values);
        // After successful registration, redirect to login page
        router.push("/auth/login");
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

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
          <div className="text-2xl font-bold text-grey-c400">REGISTER</div>
          <div className="flex flex-col items-center justify-center gap-4 w-full px-8">
            <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
              <div className="w-full">
                <TextField
                  label="Name"
                  className="w-full"
                  startIcon={<Image src="/icons/account-icon.svg" alt="account-icon" width={21} height={21} />}
                  placeholder="Enter your name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name ? String(formik.errors.name) : undefined}
                />
              </div>
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
              <div className="w-full">
                <TextField
                  label="Confirm password"
                  className="w-full"
                  startIcon={<Image src="/icons/lock-icon.svg" alt="lock-icon" width={21} height={21} />}
                  endIcon={
                    <button
                      type="button"
                      className="flex items-center justify-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Image
                        src={showConfirmPassword ? "/icons/view-icon.svg" : "/icons/view-off.svg"}
                        alt="view-icon"
                        width={21}
                        height={21}
                      />
                    </button>
                  }
                  inputType={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                  helperText={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? String(formik.errors.confirmPassword)
                      : undefined
                  }
                />
              </div>
              <div className="w-full">
                <Button
                  type="submit"
                  label="Register"
                  className="py-3 w-full"
                  disabled={!formik.isValid || formik.isSubmitting}
                />
              </div>
            </form>
            <div className="text-grey-c400 text-sm">
              You already have an account?{" "}
              <Link href="/auth/login" className="text-primary-c900 underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
