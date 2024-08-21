"use client"
import Pic1 from "../../../public/favicon.ico"
import Image from "next/image"

import { useRouter } from "next/navigation"

const ConnectScan = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/checkData')
    }
    return (
        <>
            <div className="flex flex-col items-center bg-transparent h-screen md:gap-12 gap-4 justify-center">
                <div className="flex flex-row gap-3 items-center">
                    <div>
                        <Image src={Pic1} alt="Icon" className="md:w-16 md:h-16 w-8 h-8"></Image>
                    </div>
                    <div>
                        <p className="text-white md:text-5xl text-3xl font-bold">Node</p>
                    </div>
                </div>
                <div className="flex flex-col text-center gap-8">
                    <p className="md:text-4xl text-2xl">Run Compatibility Check</p>
                    <p className="text-sm md:text-xl text-[#BCBCBC]">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praese.</p>
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    <button className="px-8 py-1 border-[1px] border-[#FF0083] rounded-[100px] md:text-2xl text-lg hover:bg-[#FF0083]" onClick={nextPage}>Start</button>
                    <button className="px-8 py-1 border-[1px] border-[#FF0083] rounded-[100px] md:text-2xl text-lg hover:bg-[#FF0083]" onClick={nextPage}>Skip</button>
                </div>
            </div>
        </>
    )
}

export default ConnectScan