"use client";
import React from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
  item: any;
};

const DataCard: React.FC<Props> = (item: any) => {
  const queryClient = useQueryClient();

  
  const { mutate } = useMutation({
    mutationFn: async (id: any) => {
      return await axios.delete(
        `https://64eda7591f872182714186d3.mockapi.io/api/v1/register/${id}`
      );
    },
    onSuccess() {
      queryClient.invalidateQueries("allData" as any);
      console.log("item deleted");
    },
  });
  const handleDelete = (id: any) => {
    const shouldDelete = confirm("Are you sure you want to delete this item?");
    if (shouldDelete) {
      mutate(id);
    }
  };

 
  return (
    <div className="card border-2 border-black w-full grid grid-cols-1 p-3 rounded-md">
      <div className="name">First Name :{item?.item.firstname}</div>
      <div className="name">Last Name :{item?.item.lastname}</div>
      <div className="name">Email :{item?.item.email}</div>
      <div className="name">Password :{item?.item.password}</div>
      <div className="buttons flex justify-between w-[60%] my-3 mx-auto">
        <Link href={`/editpage/${item?.item.id}`}
          className="border px-3 py-1 rounded-md bg-green-500 text-white font-semibold hover:bg-green-600"
        >
          Edit
        </Link>
        <button
          className="border px-3 py-1 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600"
          onClick={() => handleDelete(item?.item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DataCard;
