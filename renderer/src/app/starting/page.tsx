'use client'
import { useRouter } from "next/navigation";
import Pic1 from "../../../public/favicon.ico";
import Pic2 from "../assets/images/image1.png"
import Image from "next/image";
import { useEffect } from "react";
import StartLogo from "@/components/ui/StartLogo";

const StartingPage = () => {
    const router = useRouter();

    const nextPage = async () => {
        await window.walletConnect.openURL("http://localhost:8888/ConnectWallet")
        const { address, amount, symbol } = await window.walletConnect.ipcRenderer.invoke('getWalletInfo');
        console.log(address, amount, symbol)
        await window.walletConnect.receiveCode(async ({ event, code }: { event: any, code: any }) => {
            console.log("code", code)

            if (address) {
                localStorage.setItem("address", address);
                localStorage.setItem("amount", amount);
                localStorage.setItem("symbol", symbol);
                router.replace("/RunCheck");
            }
        })
        // router.push('/ConnectWallet')
    }
    const checkRAM = () => {
        console.log("-----> ", navigator)
    }

    useEffect(() => {
        checkRAM()
    }, [])
    return (
        <>
            <div className="flex flex-col items-center md:px-[12vw] px-[8vw] md:py-[12vh] py-[8vh] text-white" onClick={nextPage}>
                <div className="flex flex-row gap-2 items-center">
                    <div>
                        <Image src={Pic1} alt="Icon" className="md:w-16 md:h-16 w-10 h-10"></Image>
                    </div>
                    <div>
                        <p className="md:text-6xl text-4xl font-bold">Node</p>
                    </div>
                </div>
                <div className="flex flex-col absolute md:bottom-[12vh] bottom-[8vh]">
                    <div className="flex w-full justify-center">
                        <StartLogo></StartLogo>
                    </div>
                    <div className="mt-6">
                        <p className="md:text-xl text-sm">Starting up</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default StartingPage;