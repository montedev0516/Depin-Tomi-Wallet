'use client'


import Image from "next/image"
import close_icon from "../../../public/images/close-circle.png"
import tomi_icon from "../../../public/favicon.ico"
import Wifi from "@/assets/logos/wifi.svg";
import Connected from "@/assets/logos/connected.svg";
import UserAvatar from "@/assets/logos/userAvatar.svg";
import DropDown from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useRouter } from "next/navigation";
import { useState } from "react"


const WithDraw = () => {
    const router = useRouter();

    const nextPage = () => {
        router.push('/DeletePage')
    }

    return (
        <div className="flex flex-col md:p-10 p-5 justify-between gap-3 pb-6">
            <div className="flex flex-row justify-between items-center">
                <button className="flex flex-row items-center align-middle border-2 border-zinc-900 px-5 rounded-2xl">
                    <Image src={UserAvatar} alt="userAvatar" className="w-6 h-6"></Image>
                    <select className="text-[#999999] bg-black rounded-xl p-4 w-[200px] text-2xl focus:outline-none">
                        <option>0x81504...320</option>
                    </select>
                </button>
                <div className="flex justify-end h-[70px] items-center">
                    <DropDown></DropDown>
                </div>
            </div>
            <div className="flex flex-row justify-between gap-10 flex-wrap">
                <div className="flex-[7] flex flex-col justify-between gap-4">
                    <div className="flex flex-col bg-zinc-900 p-10 gap-8 rounded-3xl">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col">
                                <p className=" text-[#999999]  text-lg">Disk space Remaining</p>
                                <p className="text-3xl font-medium">49.5 TB</p>
                            </div>
                            <div className="flex h-[40px]">
                                <button className="px-10 border-[#FF0083] border-[1px] rounded-xl">Edit</button>
                            </div>
                        </div>
                        <div className="w-full">
                            <progress value="60" max="100" className="w-full">70</progress>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between bg-zinc-900 p-10 gap-8 rounded-3xl">
                        <div className="flex flex-col justify-between gap-4">
                            <p className=" text-[#999999] text-lg">CPU</p>
                            <p className=" text-3xl font-medium">Core i7 11500K</p>
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                            <p className=" text-[#999999]  text-lg">Donate your CPU</p>
                            <div className="flex justify-end">
                                <label className="switch items-end">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between bg-zinc-900 p-10 gap-8 rounded-3xl">
                        <div className="flex flex-col justify-between gap-4">
                            <p className=" text-[#999999]  text-lg">GPU</p>
                            <p className=" text-3xl font-medium">RTX 4090</p>
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                            <p className=" text-[#999999]  text-lg">Donate your CPU</p>
                            <div className="flex justify-end">
                                <label className="switch items-end">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between bg-zinc-900 p-10 gap-8 rounded-3xl">
                        <div className="flex flex-row justify-between flex-wrap gap-4">
                            <div className="flex flex-col">
                                <p className="text-white text-lg font-medium">Connect more devices to earn more.</p>
                                <p className="text-white opacity-70 text-sm">You can always disconnect device in the profile tab.</p>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Image src={Wifi} alt="wifi"></Image>
                                <button className="flex flex-row gap-2 items-center border border-[#FF0083] px-6 rounded-full">
                                    <Image src={Connected} alt="connected"></Image>
                                    <span>Connected</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between border-[1px] border-[#FF0083] rounded-full bg-zinc-900 p-2">
                            <input className="bg-zinc-900 w-full outline-none" placeholder="Device type: Grass lite node" />
                            <button className="border-[1px] border-[#FF0083] rounded-full px-4 py-2">1.00x</button>
                        </div>
                    </div>

                </div>

                <div className="flex-[3] flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-1 bg-zinc-900 p-10 rounded-3xl">
                        <div className="gap-8 rounded-3xl">
                            <div><p className="text-lg text-white opacity-70 uppercase">Balance</p></div>
                            <div className="flex flex-row justify-between mt-2">
                                <div className="text-3xl font-bold">0.00</div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Image src={tomi_icon} alt="" className="w-5 h-5" />
                                    <p className="text-white opacity-70">TOMI</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6"><hr /></div>

                        <div className="flex flex-col gap-2 mt-2 pb-4">
                            <div className="flex flex-row justify-between">
                                <div className="text-white text-xl">0.00</div>
                                <div className="text-white opacity-70 text-lg">Total Rewards</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="text-white text-xl">0.00</div>
                                <div className="text-white opacity-70 text-lg">Withdrawn</div>
                            </div>
                        </div>
                        <div className="flex justify-center flex-1 items-end">
                            <Drawer direction="right">
                                <DrawerTrigger asChild>
                                    <button className="px-20 py-4 bg-[#FF0083] rounded-full h-[50px]">Withdraw</button>
                                </DrawerTrigger>
                                <DrawerContent className="flex justify-between items-center top-0 mt-0 md:ml-[60vw] ml-[20vw] rounded-t-none rounded-[10px] bg-[#171717] border border-zinc-600">
                                        <div className="flex flex-col justify-between w-full px-8 flex-1">
                                            <DrawerHeader className="flex flex-rows justify-between">
                                                {/* <DrawerTitle>Are you absolutely sure?</DrawerTitle> */}
                                                <DrawerDescription className="text-2xl text-white">Withdraw</DrawerDescription>
                                                <DrawerClose className="bg-black">
                                                    <Button variant="outline" className="bg-zinc-900 border-none rounded-none hover:bg-zinc-900"><Image src={close_icon} alt="" /></Button>
                                                </DrawerClose>
                                            </DrawerHeader>
                                            <div className="flex flex-col gap-4 p-4">
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-lg text-white opacity-70">Amount</p>
                                                    <div className="flex flex-row gap-2 justify-between items-center">
                                                        <div className="flex flex-row justify-between border-[1px] border-[#2E2E2E] rounded-xl bg-zinc-900 p-2 flex-[9]">
                                                            <input className="bg-zinc-900 w-full outline-none" />
                                                            <div className="px-4 py-2 flex flex-row items-center gap-2">
                                                                <Image src={tomi_icon} alt="logo" className="w-3 h-3"></Image>
                                                                <span className="text-sm">
                                                                    TOMI
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-[1]">MAX</div>
                                                    </div>
                                                    <p className="text-lg text-white opacity-70">Balance 0 TOMI</p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-lg text-white opacity-70">To</p>
                                                    <input className="bg-zinc-900 border-[#2E2E2E] border-[1px] w-full p-4 rounded-xl" />
                                                    <p className="text-lg text-white opacity-70 underline cursor-pointer">Paste from clipboard</p>
                                                </div>
                                            </div>
                                            <DrawerFooter>
                                                <Button variant="outline" className="px-20 py-4 bg-[#FF0083] rounded-full h-[50px] border-[#FF0083] border-[1px]" onClick={nextPage}>Proceed</Button>
                                            </DrawerFooter>
                                        </div>
                                    
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithDraw