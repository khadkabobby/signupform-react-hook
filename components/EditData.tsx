"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
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

const EditData = () => {
  const { id } = useParams();
  const getUser = async (id: any) => {
    try {
      const response = await axios.get(
        `https://64eda7591f872182714186d3.mockapi.io/api/v1/register/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
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
  const { data } = useQuery({
    queryKey: ["allData", "getData"] as any,
    queryFn: () => getUser(id),
    onSuccess: (fetchedData) => {
      form.setValue("firstname", fetchedData.firstname);
      form.setValue("lastname", fetchedData.lastname);
      form.setValue("email", fetchedData.email);
      form.setValue("password", fetchedData.password);
      form.setValue("confirmpassword", fetchedData.confirmpassword);
    },
  });
    const queryClient = useQueryClient();
    const {mutate}=useMutation({
        mutationFn:async (data:FormValues)=>{
            await axios.put(`https://64eda7591f872182714186d3.mockapi.io/api/v1/register/${id}`,data)
            ,{
                onSuccess:()=>{
                    queryClient.invalidateQueries('allData' as any,"getData" as any)
                }
            }
        },
    })

    const onSubmit = (data: FormValues,id:any) => {
        mutate(data);
        form.reset();
        console.log("Form edited", data);
      };

  return (
    <div className="signupPage bg-slate-500 flex flex-col justify-center items-center h-[100vh]">
      <form
       onSubmit={handleSubmit(onSubmit)}
       noValidate
        className="flex flex-col space-y-4 bg-slate-800 rounded-md justify-center items-center p-8 text-black"
      >
        <h2 className="text-2xl text-white">Edit Data!</h2>
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
          Edit data
        </button>
      </form>
      <DevTool control={control} />
      <Link
        href="/datapage"
        className="mt-5 bg-white px-3 py-1 rounded-md text-black hover:bg-gray-200"
      >
        All data
      </Link>
    </div>
  );
};

export default EditData;
