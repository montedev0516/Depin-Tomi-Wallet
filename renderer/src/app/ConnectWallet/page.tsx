"use client"
import Icon_tomi from "../../../public/favicon.ico"
import Icon_meta from "../../../public/images/metamask-icon 1.png"
import Icon_connect from "../../../public/images/metamask-icon 1 (1).png"
import Icon_arrow from "../../../public/images/Arrow_Up_Right_MD.png"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useConnect } from "thirdweb/react"
import { createWallet, injectedProvider } from "thirdweb/wallets"
import { thirdwebClient } from "@/utils/thirdweb-client"
import { useState } from "react"

const ConnectWallet = () => {
    const { connect, isConnecting, error } = useConnect();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const nextPage = () => {
        router.push('/checkStart')
    }
    return (
        <>
            <div className="flex items-center bg-black px-[10vw] py-[10vh] h-screen">
                <div className="w-full p-5 flex flex-col gap-7 ">
                    <div className="flex text-lg rounded-3xl items-center border-[2px] p-5 h-[12vh] border-white border-opacity-10">
                        <p className="text-center w-full font-bold md:text-2xl text-lg">Connect Your Wallet</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() =>
                                connect(async () => {
                                    const tomiPAY = createWallet("com.tomi") // pass the wallet id

                                    // if user has tomiPAY installed, connect to it
                                    if (injectedProvider("com.tomi")) {
                                        const { address } = await tomiPAY.connect({ client: thirdwebClient })
                                        if (address) {
                                            setOpen(false)
                                            router.push("/checkStart")
                                        } else {
                                            router.push("/checkStart");
                                            console.log("here----->")
                                        }
                                    }

                                    // open wallet connect modal so user can scan the QR code and connect
                                    else {
                                        console.log("-----------")
                                        await tomiPAY.connect({
                                            client: thirdwebClient,
                                            walletConnect: { showQrModal: true },
                                        }).then(() => {
                                            router.push("/checkStart");

                                        }).catch(() => {
                                            router.push("/checkStart");
                                        })
                                    }

                                    // return the wallet
                                    return tomiPAY
                                })
                            }
                        // onClick={nextPage}
                        >
                            <div className="mr-6"><Image src={Icon_tomi} alt="" className="w-7 h-7" /></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-lg">tomi Wallet</p></div>
                            <div className=""><Image src={Icon_arrow} alt="" /> </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() =>
                                connect(async () => {
                                    const metamask = createWallet("io.metamask") // pass the wallet id

                                    // if user has metamask installed, connect to it
                                    if (injectedProvider("io.metamask")) {
                                        const { address } = await metamask.connect({ client: thirdwebClient })
                                        if (address) {
                                            setOpen(false)
                                            router.push("/checkStart")
                                        } else {
                                            router.push("/checkStart")
                                        }
                                    }

                                    // open wallet connect modal so user can scan the QR code and connect
                                    else {
                                        await metamask.connect({
                                            client: thirdwebClient,
                                            walletConnect: { showQrModal: true },
                                        })
                                    }

                                    // return the wallet
                                    return metamask
                                })
                            }
                        >
                            <div className="mr-6"><Image src={Icon_meta} alt="" className="w-7 h-7" /></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-lg">Metamask</p></div>
                            <div className=""><Image src={Icon_arrow} alt="" /> </div>
                        </div>
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() =>
                                connect(async () => {
                                    const WalletConnect = createWallet("walletConnect") // pass the wallet id

                                    // if user has WalletConnect installed, connect to it
                                    if (injectedProvider("walletConnect")) {
                                        const { address } = await WalletConnect.connect({ client: thirdwebClient })
                                        if (address) {
                                            setOpen(false)
                                            router.push("/checkStart")
                                        } else {
                                            router.push("/checkStart")
                                        }
                                    }

                                    // open wallet connect modal so user can scan the QR code and connect
                                    else {
                                        await WalletConnect.connect({
                                            client: thirdwebClient,
                                        })
                                    }

                                    // return the wallet
                                    return WalletConnect
                                })
                            }
                        >
                            <div className="mr-6"><Image src={Icon_connect} alt="" className="w-7 h-7" /></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-lg">Connect Wallet</p></div>
                            <div className=""><Image src={Icon_arrow} alt="" /> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnectWallet