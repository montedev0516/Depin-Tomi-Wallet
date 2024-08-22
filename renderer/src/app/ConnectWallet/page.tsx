"use client"
import Icon_tomi from "../../../public/favicon.ico"
import Icon_meta from "../../../public/images/metamask-icon 1.png"
import Icon_connect from "../../../public/images/metamask-icon 1 (1).png"
import Icon_arrow from "../../../public/images/Arrow_Up_Right_MD.png"
import { TomiTokenAddress } from "@/utils/constants"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useConnect, ConnectButton, lightTheme, darkTheme, useDisconnect, useActiveWallet, useWalletBalance, useActiveAccount } from "thirdweb/react"
import { createWallet, injectedProvider, walletConnect, inAppWallet, disconnectWalletConnectSession, WalletId, getWalletBalance } from "thirdweb/wallets"
import { thirdwebClient } from "@/utils/thirdweb-client"
import { ethereum } from "thirdweb/chains"
import { useState, useEffect } from "react"

const ConnectWallet = () => {
    const { disconnect } = useDisconnect();
    const currentWallet = useActiveWallet();
    const { connect, isConnecting, error } = useConnect();
    const [open, setOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState('md');
    const [address, setAddress] = useState('');
    const [currentChain, setCurrentChain] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1000) {
                setWindowWidth("md");
            }
            else {
                setWindowWidth("lg");
            }
        }

        window.addEventListener('resize', handleResize);

        // Call the handler immediately to set the initial state
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const wallets = [
        createWallet("io.metamask"),
        createWallet("com.tomi"),
        walletConnect(),
        // inAppWallet({
        //     auth: {
        //         options: [
        //             "email",
        //             "google",
        //             "apple",
        //             "facebook",
        //             "phone",
        //         ],
        //     },
        // }),
    ];
    const account = useActiveAccount()

    const { data: tokenData, isLoading, isError } = useWalletBalance({
        chain: ethereum,
        address: account?.address,
        client: thirdwebClient,
        tokenAddress: TomiTokenAddress,
    });

    console.log("here ", !tokenData)
    return (
        <>
            <div className="flex items-center bg-black px-[10vw] py-[10vh] h-screen">
                <div className="w-full p-5 flex flex-col gap-7 ">
                    <div className="flex text-lg rounded-3xl items-center border-[2px] p-5 h-[12vh] border-white border-opacity-10">
                        <p className="text-center w-full font-bold md:text-2xl text-lg">Connect Your Wallet</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() =>
                                connect(async () => {
                                    const tomiPAY = createWallet("com.tomi") // pass the wallet id

                                    // if user has tomiPAY installed, connect to it
                                    if (injectedProvider("com.tomi")) {
                                        const { address } = await tomiPAY.connect({ client: thirdwebClient })
                                        if (address) {
                                            setOpen(false)
                                            router.push("/installWallet")
                                        } else {
                                            router.push("/installWallet");
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
                                            router.push("/installWallet");

                                        }).catch(() => {
                                            router.push("/installWallet");
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
                        </div> */}
                        {/* <div className="relative flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]">
                            <div className="mr-2 md:mr-6"><Image src={Icon_tomi} alt="" className="w-7 h-7" onClick={() => {
                                if (address && currentWallet && tokenData?.symbol !== "TOMI") {
                                    disconnect(currentWallet)
                                }
                            }} /></div>
                            {
                                // (address === "" || (address && tokenData?.symbol !== "TOMI") || tokenData === undefined) &&
                                !tokenData &&
                                <>
                                    <ConnectButton wallets={wallets2} client={thirdwebClient} theme={darkTheme({
                                        colors: {
                                            // modalBg: '#171717',
                                            primaryButtonBg: 'black',
                                            secondaryButtonBg: 'black',
                                            primaryButtonText: 'white',
                                            accentButtonBg: 'black',
                                        },
                                    })}
                                        connectButton={{
                                            label: "Tomi Wallet",
                                            className: "md:text-2xl text-lg",
                                            style: {
                                                borderRadius: "10px",
                                                height: '100%',
                                                display: 'flex',
                                                width: `90%`,
                                                fontSize: `24px`,
                                                justifyContent: 'left'
                                            },
                                        }}
                                        detailsButton={{
                                            className: "my-custom-class",
                                            style: {
                                                display: 'none'
                                            },
                                        }}
                                        onConnect={async (wallet) => {
                                            const tmpAddress = wallet.getAccount()?.address;
                                            const tmpChain = wallet.getChain();
                                            console.log("connected to", wallet.getAccount()?.address, wallet.getChain()?.name)
                                            if (tmpAddress !== undefined) setAddress(tmpAddress);
                                            if (tmpChain !== undefined) setCurrentChain(tmpChain)
                                            // if (tmpAddress !== undefined && tmpChain !== undefined) {
                                            //     const balance = await getWalletBalance({
                                            //         address: tmpAddress,
                                            //         client: thirdwebClient,
                                            //         chain: tmpChain
                                            //     });
                                            //     console.log("000000> ", balance)

                                            // }
                                        }}
                                    />
                                </>

                            }
                            {
                                (address && tokenData?.symbol === "TOMI") &&
                                <div onClick={() => {
                                    if (currentWallet) disconnect(currentWallet)
                                    setAddress("")
                                }}
                                    className="cursor-pointer"
                                >
                                    {address}
                                    &nbsp;<span>({`${parseFloat(tokenData?.displayValue || "0").toFixed(2)} ${tokenData?.symbol || "TOMI"}`})</span>
                                </div>
                            }
                            <div className="absolute right-6"><Image src={Icon_arrow} alt="" /> </div>
                        </div> */}
                        <div className="relative flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]">
                            <div className="mr-2 md:mr-6"><Image src={Icon_meta} alt="" className="w-7 h-7" /></div>
                            {
                                address === "" ?
                                    <ConnectButton wallets={wallets} client={thirdwebClient} theme={darkTheme({
                                        colors: {
                                            // modalBg: '#171717',
                                            primaryButtonBg: 'black',
                                            secondaryButtonBg: 'black',
                                            primaryButtonText: 'white',
                                            accentButtonBg: 'black',
                                        },
                                    })}
                                        connectButton={{
                                            label: "Metamask",
                                            className: "md:text-2xl text-lg",
                                            style: {
                                                borderRadius: "10px",
                                                height: '100%',
                                                display: 'flex',
                                                width: `90%`,
                                                fontSize: `24px`,
                                                justifyContent: 'left'
                                            },
                                        }}
                                        detailsButton={{
                                            className: "my-custom-class",
                                            style: {
                                                display: 'none'
                                            },
                                        }}
                                        onConnect={async (wallet) => {

                                            const tmpAddress = wallet.getAccount()?.address;
                                            const tmpChain = wallet.getChain();
                                            console.log("connected to", wallet.getAccount()?.address, wallet.getChain()?.name)
                                            if (tmpAddress !== undefined) setAddress(tmpAddress);
                                            if (tmpChain !== undefined) setCurrentChain(tmpChain)
                                            // if (tmpAddress !== undefined && tmpChain !== undefined) {
                                            //     const balance = await getWalletBalance({
                                            //         address: tmpAddress,
                                            //         client: thirdwebClient,
                                            //         chain: tmpChain
                                            //     });
                                            //     console.log("000000> ", balance)

                                            // }
                                        }}
                                    />
                                    :
                                    <div onClick={() => {
                                        if (currentWallet) disconnect(currentWallet)
                                        setAddress("")
                                    }}
                                        className="cursor-pointer"
                                    >
                                        {address}
                                        &nbsp;<span>({`${parseFloat(tokenData?.displayValue || "0").toFixed(2)} ${tokenData?.symbol || "TOMI"}`})</span>
                                    </div>
                            }
                            <div className="absolute right-6"><Image src={Icon_arrow} alt="" /> </div>
                        </div>
                        {/* <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() => {
                                // const ethereum = window.ethereum;
                                // if (ethereum === undefined) {
                                //     window.localStorage.setItem("installWallet", "metamask");
                                //     // router.push("/installWallet")
                                // } else {
                                connect(async () => {
                                    const metamask = createWallet("io.metamask"); // pass the wallet id

                                    // if user has metamask installed, connect to it
                                    if (injectedProvider("io.metamask")) {
                                        await metamask.connect({ client: thirdwebClient });
                                    }

                                    // open wallet connect modal so user can scan the QR code and connect
                                    else {
                                        await metamask.connect({
                                            client: thirdwebClient,
                                            walletConnect: { showQrModal: true },
                                        });
                                    }

                                    // return the wallet
                                    return metamask;
                                })
                                // }
                            }
                            }
                        >
                            <div className="mr-6"><Image src={Icon_meta} alt="" className="w-7 h-7" /></div>
                            <div className="flex-[2]"><p className="md:text-2xl text-lg">Metamask</p></div>
                            <div className=""><Image src={Icon_arrow} alt="" /> </div>
                        </div> */}
                        <div className="flex flex-row flex-wrap items-center text-lg border-white border-opacity-10 hover:border-[#FF0083] rounded-3xl border-[2px] p-7 text-left w-full h-[15vh]"
                            onClick={() =>
                                connect(async () => {
                                    const WalletConnect = createWallet("walletConnect") // pass the wallet id

                                    // if user has WalletConnect installed, connect to it
                                    if (injectedProvider("walletConnect")) {
                                        const { address } = await WalletConnect.connect({ client: thirdwebClient })
                                        if (address) {
                                            setOpen(false)
                                            router.push("/installWallet")
                                        } else {
                                            router.push("/installWallet")
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
            </div >
        </>
    )
}

export default ConnectWallet