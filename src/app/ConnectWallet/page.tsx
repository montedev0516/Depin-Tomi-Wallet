"use client"
import Icon_tomi from "../../../public/favicon.ico"
import Icon_meta from "../../../public/images/metamask-icon 1.png"
import Icon_connect from "../../../public/images/metamask-icon 1 (1).png"
import Icon_arrow from "../../../public/images/Arrow_Up_Right_MD.png"

import Image from "next/image"
import { useRouter } from "next/navigation"

const ConnectWallet = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/checkStart')
    }
    return(
        <>
            <div className="flex items-center bg-black px-[10vw] py-[10vh] h-screen">
                <div className="w-full p-5 flex flex-col gap-7 ">
                    <div className="flex text-lg rounded-3xl items-center border-[2px] p-5 h-[12vh] border-white border-opacity-10">
                        <p className="text-center w-full font-bold md:text-2xl text-xl">Connect Your Wallet</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]" onClick={nextPage}>
                            <div className="mr-6"><Image src={Icon_tomi} alt=""/></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-xl">tomi Wallet</p></div>
                            <div className=""><Image src={Icon_arrow} alt=""/> </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]" onClick={nextPage}>
                            <div className="mr-6"><Image src={Icon_meta} alt=""/></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-xl">Metamask</p></div>
                            <div className=""><Image src={Icon_arrow} alt=""/> </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]" onClick={nextPage}>
                            <div className="mr-6"><Image src={Icon_connect} alt=""/></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-xl">Connect Wallet</p></div>
                            <div className=""><Image src={Icon_arrow} alt=""/> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnectWallet