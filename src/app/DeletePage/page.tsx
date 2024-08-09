'use client'

import sand_glass from "@/assets/images/sand-glass.png"
import Image from "next/image"
import { useRouter } from "next/navigation";

const DeletePage = () => {
    const router = useRouter();

    const PreviousPage = () => {
        router.push('/WithDraw')
    }
    return (
        <div className="flex h-screen md:py-[25vh] md:px-[30vw] p-[10vw] justify-center">
            <div className="flex flex-col text-center items-center justify-center md:gap-10 gap-20 bg-zinc-900 p-10 rounded-3xl">
                <div>
                    <Image src={sand_glass} alt="sand glass"/>
                </div>
                <div>
                    <p>Pleasde be aware that once deleted, you will no longer earn rewards on the data that has been removed.</p>
                </div>
                <div className="flex flex-row gap-4 flex-wrap">
                    <button className="py-3 px-7 border-[1px] border-[#FF0083] hover:bg-[#FF0083] rounded-full" onClick={PreviousPage}>Cancel</button>
                    <button className="py-3 px-7 border-[1px] border-[#FF0083] hover:bg-[#FF0083] rounded-full">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePage