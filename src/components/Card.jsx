"use client"

import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { Heart, Pencil, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
const url_item = process.env.NEXT_PUBLIC_API_URL_ITEM;


export const Card = ({ id, content, additionalData }) => {
    const router = useRouter()
    const [isOnEdit, setIsOnEdit] = useState(false)
    const [singleData, setSingleData] = useState({
        id: "", content: "", additionalData: ""
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setSingleData({ ...singleData, [name]: value });
    };

    async function deleteData(id) {
        try {
            const res = await fetch(url_item + id, {
                method: "DELETE"
            })

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            router.refresh()
        }
    }

    async function updateData() {

        const { id } = singleData;

        try {
            const res = await fetch(url_item + id, {
                method: "PATCH",
                body: JSON.stringify(singleData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('success', data);
            setSingleData({
                id: '',
                content: '',
                additionalData: ''
            })

        } catch (error) {
            console.error('Error during fetch:', error)
        } finally {
            setIsOnEdit(false)
            router.refresh()
        }
    }

    function editData(id, content, additionalData) {
        const data = { id, content, additionalData };
        setIsOnEdit(true);
        setSingleData((prevData) => ({
            ...prevData,
            id,
            content,
            additionalData
        }))
    }

    function cancelEdit() {
        setIsOnEdit(false)
    }

    return (
        <div className={`h-fit w-fit bg-slate-50 p-8 rounded-xl space-y-5 mb-3 lg:mb-0 ${isOnEdit ? 'border-b-2 border-r-2 border-rose-400' : ''}`}>

            {isOnEdit ? (
                <>
                    <input
                        value={singleData.content} className=' border-b-2 border-rose-400 focus:outline-none w-full'
                        onChange={handleChangeInput}
                        name="content"
                    />
                    <input
                        value={singleData.additionalData} className=' border-b-2 border-rose-400 focus:outline-none w-full'
                        onChange={handleChangeInput}
                        name='additionalData'
                    />
                    <div className=" flex justify-between space-x-2">
                        <button className=" w-[49%] bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={updateData}>
                            Update
                        </button>
                        <button className=" w-[49%] bg-rose-300 py-2 rounded-xl hover:bg-red-400" onClick={cancelEdit}>
                            Cancel
                        </button>
                    </div>
                </>

            ) : (
                <>
                    <Image src={additionalData} alt={"photo " + content} width={200} height={200} className='w-72 h-72 object-cover' priority={true} placeholder='empty' />
                    <div className=' flex justify-between'>
                        <h1>{content}</h1>
                        <div className=' flex justify-between space-x-2'>
                            <Pencil className=' hover:text-rose-400' onClick={() => editData(id, content, additionalData)} />
                            <Trash className=' hover:text-rose-400' onClick={() => deleteData(id)} />
                            <Heart className=' hover:text-rose-400' />
                        </div>
                    </div>
                </>
            )}

        </div>

    )
}
