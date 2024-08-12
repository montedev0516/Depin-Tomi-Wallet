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
        <div className="flex flex-col md:p-8 p-4 justify-between md:gap-2 h-screen">
            <div className="flex flex-row justify-between items-center">
                <button className="flex flex-row items-center align-middle border-2 border-zinc-900 px-5 md:rounded-2xl rounded-xl">
                    <Image src={UserAvatar} alt="userAvatar" className="w-6 h-6"></Image>
                    <select className="text-[#999999] bg-black md:rounded-xl md:p-4 p-3 md:w-[200px] w-[140px] md:text-xl text-sm focus:outline-none">
                        <option>0x81504...320</option>
                    </select>
                </button>
                <div className="flex justify-end h-[70px] items-center">
                    <DropDown></DropDown>
                </div>
            </div>
            <div className="flex flex-row justify-between md:gap-10 gap-4 flex-wrap flex-1">
                <div className="flex-[7] flex flex-col justify-between md:gap-5 gap-3">
                    <div className="flex flex-col justify-between flex-1 bg-zinc-900 p-5 gap-2 md:rounded-3xl rounded-xl">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <p className=" text-[#999999] md:text-lg text-xs">Disk space Remaining</p>
                                <p className="md:text-3xl text-xl font-medium">49.5 TB</p>
                            </div>
                            <div className="flex h-10">
                                <button className="px-7 py-2 border-[#FF0083] border-[1px] rounded-2xl text-sm hover:bg-[#FF0083]">Edit</button>
                            </div>
                        </div>
                        <div className="w-full">
                            <progress value="60" max="100" className="w-full md:h-5 h-2">70</progress>
                        </div>
                    </div>
                    <div className="flex flex-row flex-1 justify-between bg-zinc-900 p-5 gap-2 md:rounded-3xl rounded-xl">
                        <div className="flex flex-col justify-between md:gap-4">
                            <p className=" text-[#999999] md:text-lg text-xs">CPU</p>
                            <p className=" md:text-3xl text-xl font-medium">Core i7 11500K</p>
                        </div>
                        <div className="flex flex-col justify-between md:gap-4">
                            <p className=" text-[#999999]  md:text-lg text-xs">Donate your CPU</p>
                            <div className="flex justify-end">
                                <label className="switch items-end">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-1 justify-between bg-zinc-900 p-5 gap-2 md:rounded-3xl rounded-xl">
                        <div className="flex flex-col justify-between md:gap-4">
                            <p className=" text-[#999999]  md:text-lg text-xs">GPU</p>
                            <p className=" md:text-3xl text-xl font-medium">RTX 4090</p>
                        </div>
                        <div className="flex flex-col justify-between md:gap-4">
                            <p className=" text-[#999999]  md:text-lg text-xs">Donate your CPU</p>
                            <div className="flex justify-end">
                                <label className="switch items-end">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-between bg-zinc-900 p-5 gap-4 md:rounded-3xl rounded-xl">
                        <div className="flex flex-row justify-between flex-wrap gap-4">
                            <div className="flex flex-col">
                                <p className="text-white md:text-lg text-xs font-medium">Connect more devices to earn more.</p>
                                <p className="text-white opacity-70 md:text-sm text-[9px]">You can always disconnect device in the profile tab.</p>
                            </div>
                            <div className="flex flex-row gap-5">
                                <Image src={Wifi} alt="wifi"></Image>
                                <button className="flex flex-row gap-2 items-center border border-[#FF0083] md:px-6 px-3 rounded-full">
                                    <Image src={Connected} alt="connected" className="w-2 h-2"></Image>
                                    <span className="md:text-sm text-xs">Connected</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center border-[1px] border-[#FF0083] rounded-full bg-zinc-900 p-1 px-2">
                            <input className="bg-zinc-900 w-full outline-none placeholder:text-xl" placeholder="Device type: Grass lite node" />
                            <button className="border-[1px] border-[#FF0083] rounded-full px-4 py-1 text-xs">1.00x</button>
                        </div>
                    </div>
                </div>

                <div className="flex-[3] flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-1 min-w-[170px] bg-zinc-900 md:p-10 p-4 md:rounded-3xl rounded-xl">
                        <div className="gap-8 rounded-3xl">
                            <div><p className="md:text-lg text-xs text-white opacity-70 uppercase">Balance</p></div>
                            <div className="flex flex-row justify-between mt-2">
                                <div className="md:text-3xl text-2xl font-bold">0.00</div>
                                <div className="flex flex-row gap-2 items-center">
                                    <Image src={tomi_icon} alt="" className="w-5 h-5" />
                                    <p className="text-white opacity-70 text-sm">TOMI</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6"><hr /></div>
                        <div className="flex flex-col gap-2 mt-2 pb-4">
                            <div className="flex flex-row justify-between">
                                <div className="text-white md:text-xl text-sm">0.00</div>
                                <div className="text-white opacity-70 md:text-lg text-xs">Total Rewards</div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="text-white md:text-xl text-sm">0.00</div>
                                <div className="text-white opacity-70 md:text-lg text-xs">Withdrawn</div>
                            </div>
                        </div>
                        <div className="flex justify-center flex-1 items-end">
                            <Drawer direction="right">
                                <DrawerTrigger asChild>
                                    <button className="w-full p-[auto] bg-[#FF0083] rounded-full md:h-[50px] h-[40px] md:text-xl text-xs">Withdraw</button>
                                </DrawerTrigger>
                                <DrawerContent className="flex justify-between items-center top-0 mt-0 ml-[60vw] rounded-t-none rounded-[10px] bg-[#171717] border border-zinc-600">
                                        <div className="flex flex-col justify-between w-full h-full p-1 flex-1">
                                            <DrawerHeader className="flex flex-rows justify-between items-center">
                                                <DrawerDescription className="md:text-2xl text-lg text-white">Withdraw</DrawerDescription>
                                                <DrawerClose className="bg-black">
                                                    <Button variant="outline" className="bg-zinc-900 border-none rounded-none hover:bg-zinc-900 p-0"><Image src={close_icon} alt="close_button" className="h-6 w-6"/></Button>
                                                </DrawerClose>
                                            </DrawerHeader> 
                                            <div className="flex flex-col gap-4 p-4">
                                                <div className="flex flex-col gap-2">
                                                    <p className="md:text-lg text-sm text-white opacity-70">Amount</p>
                                                    <div className="flex flex-row gap-2 justify-between items-center">
                                                        <div className="flex flex-row justify-between border-[1px] border-[#2E2E2E] rounded-lg bg-zinc-900 p-2 flex-[9]">
                                                            <input className="bg-zinc-900 w-full outline-none"/>
                                                            <div className="px-4 flex flex-row items-center gap-2">
                                                                <Image src={tomi_icon} alt="logo" className="w-2 h-2"></Image>
                                                                <span className="text-xs md:text-sm text-white opacity-70">
                                                                    TOMI
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-[1] text-sm">Max</div>
                                                    </div>
                                                    <p className="md:text-lg text-sm text-white opacity-70">Balance 0 TOMI</p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="md:text-lg text-sm text-white opacity-70">To</p>
                                                    <input className="bg-zinc-900 border-[#2E2E2E] border-[1px] w-full p-2 rounded-lg" />
                                                    <p className="md:text-lg text-sm text-white opacity-70 underline cursor-pointer">Paste from clipboard</p>
                                                </div>
                                            </div>
                                            <DrawerFooter>
                                                <Button variant="outline" className="p-[auto] bg-[#FF0083] md:text-sm text-xs rounded-full h-[40px] border-[#FF0083] border-[1px]" onClick={nextPage}>Proceed</Button>
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