"use client"
import Mobile from "../../assets/images/mobile.svg"
import Scanner from "../../assets/images/scanner.svg"
import Frame from "../../assets/images/Frame.png"
import Image from "next/image"

import { useRouter } from "next/navigation"

const RunCheck = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/RunCheck')
    }
    return(
        <>
            <div className="flex flex-col justify-between items-center bg-black px-[10vw] py-[12vh] h-screen">
                <div className="flex text-lg border-zinc-600 rounded-3xl items-center border-[2px] p-5 h-[12vh] w-full">
                    <p className="text-center w-full font-bold text-2xl">Connect Your Wallet</p>
                </div>
                <div className="flex flex-row flex-wrap gap-20">
                    <div className="flex flex-row gap-2">
                        <Image src={Mobile} alt=""/>
                        <p>Mobile</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image src={Scanner} alt=""/>
                        <p>Scan with your wallet</p>
                    </div>
                </div>
                <div onClick={nextPage}>
                    <Image src={Frame} alt="" className="w-[400px]"/>
                </div>
            </div>
        </>
    )
}

export default RunCheck