"use client"
import Pic1 from "../../../public/favicon.ico"
import Image from "next/image"

import { useRouter } from "next/navigation"

const ConnectScan = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/checkData')
    }
    return(
        <>
            <div className="flex flex-col items-center bg-black px-[10vw] py-[12vh] h-screen md:gap-10 gap-20 justify-center">
                <div className="flex flex-row gap-2 items-center">
                    <div>
                        <Image src={Pic1} alt="Icon" className="md:w-16 md:h-16 w-10 h-10"></Image>
                    </div>
                    <div>
                        <p className="text-white md:text-6xl text-4xl font-bold">Node</p>
                    </div>
                </div>
                <div className="flex flex-col text-center gap-8">
                    <p className="md:text-5xl text-3xl">Run Compatibility Check</p>
                    <p className="text-xl text-[#BCBCBC]">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praese.</p>
                </div>
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    <button className="px-8 py-2 border-[1px] border-[#FF0083] rounded-[100px] md:text-2xl text-xl hover:bg-[#FF0083]" onClick={nextPage}>Start</button>
                    <button className="px-8 py-2 border-[1px] border-[#FF0083] rounded-[100px] md:text-2xl text-xl hover:bg-[#FF0083]" onClick={nextPage}>Skip</button>
                </div>
            </div>
        </>
    )
}

export default ConnectScan