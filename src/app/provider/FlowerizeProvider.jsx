"use client"

import React, { createContext, useEffect, useState } from 'react'

const url = process.env.NEXT_PUBLIC_API_URL_ALL;
const url_item = process.env.NEXT_PUBLIC_API_URL_ITEM;
const user = process.env.NEXT_PUBLIC_API_USER;

async function getFlowers() {
    console.log(url)
    const res = await fetch(url, { cache: "no-store" })
    const { items } = await res.json()
    return items
}

export const FlowerizeContext = createContext()

export const FlowerizeProvider = ({ children }) => {
    const [singleData, setSingleData] = useState({ content: "", additionalData: "", user });
    const [flowers, setFlowers] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const checkUrlImage = async (urlImage) => {
        console.log('cek dulss say')
        if (urlImage == "" || !urlImage.startsWith('https://images.unsplash.com')) {
            urlImage = "https://images.unsplash.com/photo-1500412830877-c77d92c33203?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }

        setSingleData((prevData) => ({
            ...prevData,
            additionalData: urlImage
        }))
    }

    const onContentChange = (e) => {
        setSingleData((prevData) => ({
            ...prevData,
            content: e.target.value,
        }));
    };

    const onImageChange = (e) => {
        setSingleData((prevData) => ({
            ...prevData,
            additionalData: e.target.value
        }))
    }

    async function getData() {
        const data = await getFlowers();
        setFlowers(data);
    }

    async function addData() {
        console.log('creation', singleData)
        setLoading(true)
        await checkUrlImage(singleData.additionalData)
        console.log(singleData)
        try {
            const res = await fetch(url_item, {
                method: "POST",
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
            // setSingleData({
            //     content: '',
            //     additionalData: ''
            // })
            return data;
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            setLoading(false)
        }
    }

    async function deleteData(id) {
        setLoading(true)
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
            setLoading(false)
        }
    }


    useEffect(() => {
        getData()
    }, [isLoading])


    return (
        <FlowerizeContext.Provider value={{ flowers, singleData, addData, onContentChange, onImageChange, deleteData, isLoading }}>{children}</FlowerizeContext.Provider>
    )

}
