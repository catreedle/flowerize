"use client"

import React, { useContext } from 'react'
import { FlowerizeContext } from '../provider/FlowerizeProvider'

export const Input = () => {

  const { singleData, addData, onContentChange, onImageChange, isOnEdit, cancelEdit, updateData, id_update } = useContext(FlowerizeContext);
  const { content, additionalData } = singleData;
  return (
    <div className=' flex flex-col w-full lg:w-1/3 space-y-2 m-auto lg:min-w-fit'>
      <input className=' p-2 rounded-xl focus:outline-none border-b-2 border-r-2 border-rose-400' placeholder="Nama bunga..." type="text" value={content} onChange={onContentChange} />
      <input className=' p-2 rounded-xl focus:outline-none border-b-2 border-r-2 border-rose-400' placeholder="Url gambar dari unsplash.com..." type='text' value={additionalData} onChange={onImageChange} />
      {isOnEdit ? <div className=' flex justify-center space-x-2'><button className=' w-1/3 bg-rose-300 py-2 rounded-xl hover:bg-red-400' onClick={() => updateData(id_update)}>Update</button><button className=' w-1/3 bg-rose-300 py-2 rounded-xl hover:bg-red-400' onClick={cancelEdit}>Cancel</button></div> : <button className=' bg-rose-300 py-2 rounded-xl hover:bg-red-400' onClick={addData}>Create</button>}

    </div>
  )
}
