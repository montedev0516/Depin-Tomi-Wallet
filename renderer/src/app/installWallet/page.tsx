"use client"
import Mobile from "../../assets/images/mobile.svg"
import Scanner from "../../assets/images/scanner.svg"
import Frame from "../../assets/images/Frame.png"
import MetamaskQR from "@/assets/images/MetamaskQR.png";
import chrome from "@/assets/images/chrome.svg";
import Image from "next/image"
import Link from "next/link";

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const RunCheck = () => {
    const [walletType, setWalletType] = useState("");
    useEffect(() => {
        const tmpType = localStorage.getItem("installWallet");
        console.log("type------> ", tmpType);
        if (tmpType) setWalletType(tmpType);
    }, [])
    const router = useRouter();

    const nextPage = () => {
        router.push('/RunCheck')
    }
    return (
        <>
            <div className="flex flex-col justify-between items-center bg-transparent px-[10vw] py-[12vh] h-screen gap-2">
                <div className="flex text-lg border-white border-opacity-10 rounded-xl md:rounded-2xl items-center border-[2px] p-5 h-[12vh] w-full">
                    <p className="text-center w-full font-bold text-lg md:text-2xl">Connect Your Wallet</p>
                </div>
                <div className="flex flex-row flex-wrap gap-20">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src={Mobile} alt="" />
                        <p className="text-sm md:text-xl">Mobile</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Image src={Scanner} alt="" />
                        <p className="text-sm md:text-xl">Scan with your wallet</p>
                    </div>
                </div>
                <div onClick={nextPage}>
                    <Image src={Frame} alt="" className="w-[320px] md:w-[400px]" />
                    {
                        walletType === "metamask" ?
                            <Image src={MetamaskQR} alt="meatmaskQR" className="w-[320px] md:w-[400px] rounded-xl" />
                            :
                            <Image src={Frame} alt="" className="w-[320px] md:w-[400px]" />
                    }
                </div>
                <div className="flex flex-row gap-4 items-center bg-[#171717] p-2 px-4 rounded-md cursor-pointer">
                    <Image src={chrome} alt="chrome" />
                    <Link href={"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"} target="_blank">
                        Download Chrome Extension
                    </Link>
                </div>
            </div>
        </>
    )
}

export default RunCheck