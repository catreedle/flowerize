import React, { useContext } from 'react';
import Image from 'next/image';
import { Heart, Pencil, Trash } from 'lucide-react';
import { FlowerizeContext } from '../provider/FlowerizeProvider';



export const Card = ({ id, content, additionalData }) => {
    const { deleteData } = useContext(FlowerizeContext)
    return (
        <div className=' h-fit w-fit bg-slate-50 p-8 rounded-xl space-y-5 mb-3 lg:mb-0'>
            <Image src={additionalData} alt={"photo " + content} width={200} height={200} className='w-72 h-72 object-cover' priority={true} placeholder='empty' />
            <div className=' flex justify-between'>
                <h1>{content}</h1>
                <div className=' flex justify-between space-x-2'>
                    <Pencil className=' hover:text-rose-400' />
                    <Trash className=' hover:text-rose-400' onClick={() => deleteData(id)}/>
                    <Heart className=' hover:text-rose-400' />
                </div>
            </div>
        </div>
    )
}
