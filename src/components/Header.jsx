import React from 'react'
import { dancingScript } from '../app/layout'

export const Header = () => {
    return (
        <div className=' text-center'>
            <h1 className={`${dancingScript.className} text-4xl mt-2 lg:mt-4`}>
                Flowerize
            </h1>
        </div>
    )
}
