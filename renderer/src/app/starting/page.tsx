'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"

import Pic1 from "../../../public/favicon.ico";
import Pic2 from "../assets/images/image1.png"
import Image from "next/image";
import StartLogo from "@/components/ui/StartLogo";


const StartingPage = () => {
    const router = useRouter();

    async function auth(url: string | URL, data: any) {
        try {
            console.log(data)
            const response = await fetch(url, {
                method: 'POST', // Specify the method as POST
                credentials: 'include', // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify(data) // Convert the data to JSON
            });

            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                const data = await response.json();
                // console.log(data)
                const token = data.token;
                // console.log("token", token)
                localStorage.setItem("token", token)
            }
            router.push("/RunCheck")

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }

    const nextPage = async () => {
        await window.walletConnect.openURL("http://localhost:8888/ConnectWallet")

        await window.walletConnect.receiveCode(async (code: any) => {


            if (code) {
                const { address, amount, symbol } = await window.walletConnect.ipcRenderer.invoke('getWalletInfo');
                // console.log(address, amount, symbol)
                // console.log("code", code)
                localStorage.setItem("address", address);
                localStorage.setItem("amount", amount);
                localStorage.setItem("symbol", symbol);
                // console.log("code arrived. and go to axios")
                auth("http://localhost:5000/api/auth", { address: address, amount: amount, symbol: symbol })
            }
        })
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