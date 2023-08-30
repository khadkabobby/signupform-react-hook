"use client";
import React from "react";
import DataCard from "./DataCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Props = {};

const AllData: React.FC<Props> = (props: Props) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["allData"] as any,
    queryFn: async () => {
      const response = await axios.get(
        "https://64eda7591f872182714186d3.mockapi.io/api/v1/register"
      );
      {
        data && console.log(data);
      }
      return response?.data;
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <section className="flex flex-col items-center bg-white text-black h-[100vh] px-4">
      <h2 className="text-3xl font-bold pt-5">All data</h2>
      <div className="cards w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        {data?.map((item: any) => (
          <DataCard key={item.id} item={item} />
        ))}
      </div>
      <Link
        href="/signup"
        className="mt-5 bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-400"
      >
        Add Data
      </Link>
    </section>
  );
};

export default AllData;
