"use client"
import StepperComponent from "@/components/ui/stepper"

import { useRouter } from "next/navigation"
import { useState } from "react"

const checkData = () => {
    const [pageStatus, setPageStatus] = useState('gather');

    const router = useRouter();

    const nextStatus = () => {
        if(pageStatus==='gather'){
            setPageStatus('info');
        } else if(pageStatus==='info'){
            router.push('/SetStorage')
        }
    }
    
    return (
        <>
            <div className="flex flex-col justify-center px-[10vw] bg-black h-screen">
                <div className="flex text-lg border-zinc-600 rounded-xl items-center border-[1px] p-5 w-full">
                    <p className="text-center w-full font-bold text-lg md:text-2xl">Compability Check</p>
                </div>
                <div className="w-full mt-[7vh]">
                    <StepperComponent pageStatus={pageStatus}></StepperComponent>
                </div>
                {
                    pageStatus === 'gather' ?
                    <div className="flex flex-col justify-center items-center mt-12">
                        <div className="text-2xl font-medium">
                            Gathering Data
                        </div>
                        <div className="mt-4">
                            <div className="relative size-40">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#4A0026] dark:text-neutral-700" stroke-width="2"></circle>
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#FF0083] dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="75" stroke-linecap="round"></circle>
                                </svg>

                                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span className="text-center text-3xl font-bold text-white">25%</span>
                                </div>
                            </div>
                        </div>
                    </div> : 
                    <div className="flex flex-col justify-center items-center mt-12">
                        <div className="text-3xl font-medium">
                            System Information
                        </div>
                        <div className="text-sm mt-4 flex flex-row gap-4">
                            <div className="flex flex-col text-right gap-1">
                                <div>Current Date/Time:</div>
                                <div>Operating System:</div>
                                <div>GPU:</div>
                                <div>HD/SSD:</div>
                                <div>Network Speed:</div>
                                <div>Location:</div>
                            </div>
                            <div className="flex flex-col text-left gap-1">
                                <div>Current Date/Time</div>
                                <div>Windows</div>
                                <div>RTX 4090</div>
                                <div>50TB</div>
                                <div>100GB/s</div>
                                <div>USA</div>
                            </div>
                        </div>
                    </div>
                }
                <div className="flex justify-center items-center mt-10">
                    <button className="bg-[#FF0083] py-2 px-12 rounded-full text-sm" onClick={nextStatus}>
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}

export default checkData;