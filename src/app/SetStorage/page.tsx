'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SetStorage = () => {
    const router = useRouter();
    const nextPage = () => {
        router.push('/WithDraw')
    }
    
    const [value, setValue] = useState(49.5);
    const changeValue = (e:any) => {
        setValue(e.target.value);
    }
    return (
        <div className="md:py-[20vh] py-[20vh] md:px-[10vw] px-[5vw] h-screen justify-items-center">
            <div className="flex flex-col gap-4 bg-zinc-900 h-full md:py-10 py-6 px-8 text-center rounded-xl justify-between">
                <div className="border-[1px] border-[#535353] p-5 rounded-xl md:text-2xl text-xl font-bold">
                    <p>Set storage limit</p>
                </div>
                <div className="px-10 text-base md:text-xl">
                    <p>Configure the maximum amount of storage capacity that can be used by your node.</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-20 text-[#999999] text-lg">0 GB</p>
                    <input type="range" className="win10-thumb text-[#00FF1A] flex-1" defaultValue="49.5" min="0" max="100" step="0.5" onChange={(e)=>changeValue(e)}/>
                    <div className="w-20 flex flex-col text-sm text-[#999999]">
                        <p className="text-lg">100 TB</p>
                        <p>max limit</p>
                    </div>
                </div>
                <div className="flex flex-row text-center justify-center">
                    <p className="text-3xl font-bold text-left">{value}TB</p>
                </div>
                <div className="">
                    <button className="bg-[#FF0083] py-2 px-12 rounded-full" onClick={nextPage}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetStorage