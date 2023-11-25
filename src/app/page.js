"use client"
import { Dancing_Script } from 'next/font/google'
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { Input } from "./components/Input";
import { useContext } from "react";
import { FlowerizeContext } from "./provider/FlowerizeProvider";
import ReactLoading from 'react-loading'
import Head from 'next/head';


export const dancingScript = Dancing_Script({ weight: "700", subsets: ['latin'] })

export default function Home() {
  const { flowers, isLoading } = useContext(FlowerizeContext);
  const additionalData = "https://images.unsplash.com/photo-1548460464-2a68877c7a5f?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <>
      <Head>
        <title>
          Flowerize
        </title>
      </Head>
      <div className=" space-y-3 lg:space-y-8 relative">
        <Header />
        <Input />
        {isLoading && (
          <div className='absolute inset-0 flex justify-center items-center'>
            <ReactLoading type={"bubbles"} color="red" />
          </div>
        )}

        <div className=" lg:grid lg:grid-cols-4 gap-1 lg:gap-6">
          {flowers.map(({ id, content, additionalData }) => {
            return <Card key={id} id={id} content={content} additionalData={additionalData} />
          })}
        </div>
      </div>
    </>

  )
}
