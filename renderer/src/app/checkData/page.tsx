"use client"
import Mobile from "../../assets/images/mobile.svg"
import Scanner from "../../assets/images/scanner.svg"
import Frame from "../../assets/images/Frame.png"
import Image from "next/image"
import StepperComponent from "@/components/ui/stepper"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getGPUTier } from 'detect-gpu';
// import { check } from "diskusage";
// import * as si from 'systeminformation';
import { ipcRenderer } from "electron"
import { string } from "zod"
// import * as drivelist from 'drivelist';
// const FastSpeedtest = require("fast-speedtest-api");
interface ComData {
    currentDate: string,
    operatingSystem: string,
    gpu: string,
    hd: string,
    networkSpeed: string,
    networkType: string,
}

const checkData = () => {
    const [pageStatus, setPageStatus] = useState('gather');
    const [gatherData, setGatherData] = useState({
        currentDate: '',
        operatingSystem: '',
        gpu: '',
        hd: '',
        networkSpeed: '',
        networkType: '',
    })

    const router = useRouter();

    const nextStatus = () => {
        if (pageStatus === 'gather') {
            setPageStatus('info');
        } else if (pageStatus === 'info') {
            router.push('/SetStorage')
        }
    }

    // const calculateNetworkSpeed = async () => {
    //     let fetchURL = "https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5";
    //     let tmp = await fetch(fetchURL).then((data:any) => {
    //         console.log("0123 ", data);

    //     });
    //     // let speedtest = new FastSpeedtest({
    //     //     token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    //     //     verbose: false, // default: false
    //     //     timeout: 5000, // default: 5000
    //     //     https: true, // default: true
    //     //     urlCount: 5, // default: 5
    //     //     bufferSize: 8, // default: 8
    //     // });

    //     // console.log("0000000 ", speedtest)
    //     // const s = speedtest.getSpeed().then((data:any) => {
    //     //     return data;
    //     // });
    //     console.log(tmp);
    //     return tmp;
    // }
    // const getGPUDetails = async () => {
    //     if (!navigator.gpu || !navigator.gpu.requestAdapter) {
    //         console.error("WebGPU API is not supported or not initialized.");
    //         return;
    //     }

    //     try {
    //         const adapter = await navigator.gpu.requestAdapter();
    //         if (!adapter) {
    //             console.error("Could not request a GPU adapter.");
    //             return;
    //         }

    //         const device = await adapter.requestDevice();
    //         if (!device) {
    //             console.error("Could not request a GPU device.");
    //             return;
    //         }

    //         // Check if the device has a description property
    //         if (!device.description) {
    //             console.error("Device description is not available.");
    //             return;
    //         }

    //         const gpuInfo = device.description;
    //         console.log("Device Description: ", gpuInfo);

    //         // Adjusting the regex to be more flexible in matching the vendor and product names
    //         let vendorMatch = gpuInfo.match(/Vendor: ([\w\s]+)/);
    //         let productNameMatch = gpuInfo.match(/Product: ([\w\s]+)/);

    //         let vendorName = "Unknown";
    //         let productName = "Unknown";

    //         if (vendorMatch && vendorMatch[1]) {
    //             vendorName = vendorMatch[1].trim();
    //         }

    //         if (productNameMatch && productNameMatch[1]) {
    //             productName = productNameMatch[1].trim();
    //         }

    //         console.log(`GPU Vendor: ${vendorName}`);
    //         console.log(`GPU Product Name: ${productName}`);
    //     } catch (error) {
    //         console.error("An error occurred while getting GPU details:", error);
    //     }
    // };
    const getData = async (): Promise<ComData> => {
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

        let start = navigator.userAgent.indexOf('(');

        // if (start === -1) {
        //     console.log("No opening parenthesis found.");
        //     return;
        // }

        // Find the index of the last ')'
        let end = navigator.userAgent.indexOf(')');

        // if (end === -1 || end <= start) {
        //     console.log("No closing parenthesis found or it comes before the opening one.");
        //     return;
        // }

        // Extract the subnavigator.userAgenting between the parentheses
        let operatingSystem = navigator.userAgent.substring(start + 1, end); // Adding 1 to start to exclude the '(' itself

        const gpu = (await getGPUTier()).gpu as string;
        const getDataPromise = new Promise<{ hd: string; networkSpeed: string; networkType: string }>((resolve) => {
            window.ipc.send("getData", true);
            window.ipc.on('getData', (arg: any) => {
                resolve({
                    hd: arg.hd,
                    networkSpeed: arg.cpu,
                    networkType: arg.ram
                })

            })

        })
        const { hd, networkSpeed, networkType } = await getDataPromise

        // Convert bytes to gigabytes

        // // Format the result to a string with 2 decimal places and append the unit
        // const ram = `${mbTotal.toFixed(2)} GB`;

        // const drives = await drivelist.list();
        // console.log("99999999 ", drives)

        // const diskUsageHD = check("").then(((data:any) => {
        //     console.log("here: ", data)
        // }));
        // const tmp = si.system().then((data) => {
        //     console.log("here--------- ", data);
        // })

        // const networkSpeed = await calculateNetworkSpeed();
        // si.cpu().then((data: any) => {
        //     console.log("cpu: ", data)
        // })

        return { currentDate, operatingSystem, gpu, hd, networkSpeed, networkType };
    }

    useEffect(() => {

        getData().then(data => {
            setGatherData(data);
            console.log("1111: ", data)
        });
        // const fetchGpuDetails = async () => {
        //     const gpuTier = await getGPUTier();
        //     console.log("-------- ", gpuTier);
        // };

    }, [])

    return (
        <>
            <div className="flex flex-col justify-center px-[10vw] bg-black h-screen">
                <div className="flex text-lg border-zinc-600 rounded-xl items-center border-[1px] p-5 w-full">
                    <p className="text-center w-full font-bold text-lg md:text-2xl">Compability Check</p>
                </div>
                <div className="w-full mt-[7vh]">
                    <StepperComponent pageStatus={pageStatus}></StepperComponent>
                </div>
                {
                    pageStatus === 'gather' ?
                        <div className="flex flex-col justify-center items-center mt-12">
                            <div className="text-2xl font-medium">
                                Gathering Data
                            </div>
                            <div className="mt-4">
                                <div className="relative size-40">
                                    <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#4A0026] dark:text-neutral-700" strokeWidth="2"></circle>
                                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#FF0083] dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset="75" strokeLinecap="round"></circle>
                                    </svg>

                                    <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <span className="text-center text-[30px] font-bold text-white">25%</span>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="flex flex-col justify-center items-center mt-12">
                            <div className="text-3xl font-medium">
                                System Information
                            </div>
                            <div className="text-sm mt-4 flex flex-row gap-4">
                                <div className="flex flex-col text-right gap-1">
                                    <div>Current Date/Time:</div>
                                    <div>Operating System:</div>
                                    <div>GPU:</div>
                                    <div>HD/SSD:</div>
                                    <div>Network Speed:</div>
                                    <div>Location:</div>
                                </div>
                                <div className="flex flex-col text-left gap-1">
                                    <div>{gatherData.currentDate}</div>
                                    <div>{gatherData.operatingSystem}</div>
                                    <div>{gatherData.gpu}</div>
                                    <div>{gatherData.hd}</div>
                                    <div>{gatherData.networkSpeed}</div>
                                    <div>{gatherData.networkType}</div>
                                </div>
                            </div>
                        </div>
                }
                <div className="flex justify-center items-center mt-10">
                    <button className="bg-[#FF0083] py-2 px-12 rounded-full text-sm" onClick={nextStatus}>
                        Save
                    </button>
                </div>
                {/* () => nextStatus('info') */}
            </div>
        </>
    )
}

export default checkData;