import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image';
import SettingIcon from "@/assets/images/setting-2.png";
import PauseIcon from "@/assets/logos/pause.svg";
import LockIcon from "@/assets/logos/lock.svg";
import FolderIcon from "@/assets/logos/folder.svg";
import DetailsIcon from "@/assets/logos/details.svg";
import RemoveIcon from "@/assets/logos/remove.svg";
import ReportIcon from "@/assets/logos/report.svg";
import EnergyIcon from "@/assets/logos/Energy.svg";
import LogoutIcon from "@/assets/logos/logout.svg";
import SwitchIcon from "@/assets/logos/Switch.png";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import close_icon from "../../../public/images/close-circle.png"
import tomi_icon from "../../../public/favicon.ico"
import { Button } from './button';

const DropDown = () => {
    const router = useRouter();
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);

    const nextPage = () => {
        router.push('/DeletePage')
    }
    return (<Menu as="div" className="relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 hover:cursor-pointer">
                <Image src={SettingIcon} alt="" className="w-8 h-8" />
            </MenuButton>
        </div>

        <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            <div className="p-5 bg-[#171717] border-2 border-zinc-800 text-white rounded-xl text-xs h-[50vh] flex flex-col justify-between">
                <div className='px-4 text-sm font-medium text-white'>Controls</div>
                <MenuItem>
                    <div
                        className="flex flex-row justify-between gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={PauseIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Pause
                        </span>
                        <div className='flex flex-1 justify-end'>Ctrl+P</div>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row justify-between gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={LockIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Lock
                        </span>
                        <div className='flex flex-1 justify-end'>Ctrl+L</div>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={FolderIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Storage Folder
                        </span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <Drawer direction="right">
                        <DrawerTrigger asChild>
                            <div
                                className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl cursor-pointer">
                                <Image src={DetailsIcon} alt='pause Icon'></Image>
                                <span className="text-white text-opacity-70 ">Storage Details</span>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent className="flex justify-between items-center top-0 mt-0 lg:ml-[70vw] sm:ml-[50vw] ml-[20vw] rounded-t-none rounded-[10px] bg-[#171717] border border-zinc-600">
                            <div className="flex flex-col justify-between w-full lg:px-12 px-8 flex-1">
                                <DrawerHeader className="flex flex-rows justify-between">
                                    <DrawerDescription className="text-2xl text-white">Storage details</DrawerDescription>
                                    <DrawerClose className="bg-zinc-900">
                                        <Button variant="outline" className="bg-zinc-900 border-none rounded-none hover:bg-zinc-900"><Image src={close_icon} alt=""/></Button>
                                    </DrawerClose>
                                </DrawerHeader>
                                <div className="flex flex-col gap-4 p-4">
                                    <div>
                                        <p>WD PC SN810 SDCPNRY-512G-1006</p>
                                        <p className="text-white opacity-70">Drive</p>
                                    </div>
                                    <div>
                                        <div className="relative size-40">
                                            <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#2B2D2F] dark:text-neutral-700" stroke-width="4"></circle>
                                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#646566] dark:text-blue-500" stroke-width="2.5" stroke-dasharray="100" stroke-dashoffset="65" stroke-linecap=""></circle>
                                            </svg>

                                            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 flex flex-col">
                                                <span className="text-center text-lg font-bold text-white">377 GB</span>
                                                <span className='text-xs text-white text-opacity-70'>Drive Capacity</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex w-4 h-4 border-[1px] border-[#FF0083] bg-[#FF0083] rounded-[5px] bg-opacity-50"></div>
                                            <p className="text-white">Storage Limit</p>
                                            <p className="text-white opacity-20">11 GB</p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex w-4 h-4 border-[1px] border-[#FF0083] bg-[#FF0083] rounded-[5px]"></div>
                                            <p className="text-white">In Used </p>
                                            <p className="text-white opacity-20">9.14 GB</p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <div className="flex w-4 h-4 border-none bg-zinc-700 rounded-[5px] bg-opacity-50"></div>
                                            <p className="text-white">Max Limit </p>
                                            <p className="text-white opacity-20">128.61 GB</p>
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button variant="outline" className="px-20 py-4 bg-[#FF0083] rounded-full h-[50px] border-[#FF0083] border-[1px]" onClick={nextPage}>Edit storage limit</Button>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={RemoveIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Remove Node Data
                        </span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={ReportIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Report Error
                        </span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={EnergyIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Take a Tour of TOMI Node
                        </span>
                    </div>
                </MenuItem>
                <div className='px-2'><hr className='bg-[#2E2E2E] border-[1.5px] border-[#2E2E2E]'></hr></div>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={SwitchIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Launch on startup
                        </span>
                    </div>
                </MenuItem>
                <MenuItem>
                    <div
                        className="flex flex-row gap-2 px-4 py-2 data-[focus]:bg-zinc-600 data-[focus]:text-gray-400 data-[focus]:rounded-xl"
                    >
                        <Image src={LogoutIcon} alt='pause Icon'></Image>
                        <span className='text-white text-opacity-70 '>
                            Log Out
                        </span>
                    </div>
                </MenuItem>
            </div>
        </MenuItems>
    </Menu>
    )
}

export default DropDown;