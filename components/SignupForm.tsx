"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const schema = yup.object({
  firstname: yup.string().required("first name is required"),
  lastname: yup.string().required("last name is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("email is required"),
  password: yup.string().min(6).max(15).required("password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null] as any, "Passwords must match")
    .required("Confirm password is required"),
});

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

const SignupForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const queryClient = useQueryClient();

  const registerUser = async (data: FormValues) => {
    try {
      await axios.post(
        "https://64eda7591f872182714186d3.mockapi.io/api/v1/register",
        data
      );
      console.log(data);
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("allData" as any);
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
    form.reset();
    console.log("Form submitted", data);
  };
  return (
    <div className="signupPage bg-slate-500 flex flex-col justify-center items-center h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col space-y-4 bg-slate-800 rounded-md justify-center items-center p-8 text-black"
      >
        <h2 className="text-2xl text-white">Signup Form!</h2>
        <div className="form-input">
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            className="p-1 pl-2  rounded-md"
            {...register("firstname")}
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname?.message}</p>
          )}
        </div>
        <div className="form-input">
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            className="p-1 pl-2  rounded-md"
            {...register("lastname")}
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname?.message}</p>
          )}
        </div>
        <div className="form-input">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="p-1 pl-2  rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </div>
        <div className="form-input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="p-1 pl-2  rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          )}
        </div>
        <div className="form-input">
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            className="p-1 pl-2  rounded-md"
            {...register("confirmpassword")}
          />
          {errors.confirmpassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmpassword?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-3 py-1 rounded-md text-white"
        >
          Sign Up
        </button>
      </form>
      <DevTool control={control} />
      <Link
        href="/datapage"
        className="mt-5 bg-white px-3 py-1 rounded-md text-black hover:bg-gray-200"
      >
        All data
      </Link>
      <Link
        href="/"
        className="mt-5 bg-white px-3 py-1 rounded-md text-black hover:bg-gray-200"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default SignupForm;
