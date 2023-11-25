"use client";

import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
const user = process.env.NEXT_PUBLIC_API_USER;
const url_item = process.env.NEXT_PUBLIC_API_URL_ITEM;

export const Input = () => {
  const [singleData, setSingleData] = useState({ content: "", additionalData: "", user });

  const router = useRouter()
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSingleData({ ...singleData, [name]: value });
  };

  async function addData() {
    const imageUrl =
      singleData.additionalData === "" || !singleData.additionalData.startsWith("https://images.unsplash.com")
        ? "https://images.unsplash.com/photo-1500412830877-c77d92c33203"
        : singleData.additionalData;

    try {
      const res = await fetch(url_item, {
        method: "POST",
        body: JSON.stringify({
          content: singleData.content,
          additionalData: imageUrl,
          user,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("success", data);
      setSingleData({
        content: "",
        additionalData: "",
      });
      return data;
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      router.refresh()

    }
  }

  return (
    <div className=" flex flex-col w-full lg:w-1/3 space-y-2 m-auto lg:min-w-fit">
      <input
        className=" p-2 rounded-xl focus:outline-none border-b-2 border-r-2 border-rose-400"
        placeholder="Nama bunga..."
        type="text"
        name="content"
        value={singleData.content}
        onChange={handleChangeInput}
      />
      <input
        className=" p-2 rounded-xl focus:outline-none border-b-2 border-r-2 border-rose-400"
        placeholder="Url gambar dari unsplash.com..."
        type="text"
        name="additionalData"
        value={singleData.additionalData}
        onChange={handleChangeInput}
      />
      {/* {isOnEdit ? (
          <div className=" flex justify-between space-x-2">
            <button className=" w-[49%] bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={() => updateData(id_update)}>
              Update
            </button>
            <button className=" w-[49%] bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <button className=" bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={addData}>
            Create
          </button>
        )} */}

      <button className=" bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={addData}>
        Create
      </button>

    </div>

  );
};
