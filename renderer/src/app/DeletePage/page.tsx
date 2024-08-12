'use client'

import { useRouter } from "next/navigation";

const DeletePage = () => {
    const router = useRouter();

    const PreviousPage = () => {
        router.push('/WithDraw')
    }
    return (
        <div className="flex h-screen py-[25vh] px-[20vw] justify-center">
            <div className="flex flex-col text-center items-center justify-center md:gap-10 gap-10 bg-zinc-900 p-10 rounded-3xl">
                <div className="">
                    <div className="hourglass w-[100%] h-[100%]"></div>
                </div>
                <div className="text-md">
                    <p>Pleasde be aware that once deleted, you will no longer earn rewards on the data that has been removed.</p>
                </div>
                <div className="flex flex-row gap-4 flex-wrap">
                    <button className="py-3 px-7 border-[1px] border-[#FF0083] hover:bg-[#FF0083] rounded-full text-sm" onClick={PreviousPage}>Cancel</button>
                    <button className="py-3 px-7 border-[1px] border-[#FF0083] hover:bg-[#FF0083] rounded-full text-sm">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePage