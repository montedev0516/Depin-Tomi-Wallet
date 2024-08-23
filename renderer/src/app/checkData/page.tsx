"use client"
import Mobile from "../../assets/images/mobile.svg"
import Scanner from "../../assets/images/scanner.svg"
import Frame from "../../assets/images/Frame.png"
import Image from "next/image"
import StepperComponent from "@/components/ui/stepper"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getGPUTier } from 'detect-gpu';
import gsap from 'gsap'
import { string } from "zod"


const checkData = () => {
    const [pageStatus, setPageStatus] = useState('gather');
    const [gatherData, setGatherData] = useState({
        currentDate: '',
        operatingSystem: '',
        cpu: '',
        ram: '',
        totalHd: '',
        remainHd: '',
        gpu: '',
        networkSpeed: '',
        location: ''
    })

    let progress = 0;

    const router = useRouter();

    const nextStatus = async () => {
        if (pageStatus === 'gather') {
            setPageStatus('info');
        } else if (pageStatus === 'info') {
            localStorage.setItem("currentDate", gatherData.currentDate)
            localStorage.setItem("operatingSystem", gatherData.operatingSystem)
            localStorage.setItem("cpu", gatherData.cpu)
            localStorage.setItem("ram", gatherData.ram)
            localStorage.setItem("totalHd", gatherData.totalHd)
            localStorage.setItem("remainHd", gatherData.remainHd)
            localStorage.setItem("gpu", gatherData.gpu)
            localStorage.setItem("networkSpeed", gatherData.networkSpeed)
            localStorage.setItem("location", gatherData.location)
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
    const getCurrentDate = async () => {
        const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
        setGatherData(data => ({ ...data, currentDate: currentDate }))
        updateProgressBar(12.5);
        return true
    }
    const getOperatingSystem = async () => {
        let start = navigator.userAgent.indexOf('(');
        let end = navigator.userAgent.indexOf(')');

        let operatingSystem = navigator.userAgent.substring(start + 1, end); // Adding 1 to start to exclude the '(' itself
        setGatherData(data => ({ ...data, operatingSystem: operatingSystem }))
        updateProgressBar(12.5);
        return true
    }
    const getDataInfo = async () => {
        const getDataPromise = new Promise<{ totalHd: string; remainHd: string; cpu: string; ram: string }>((resolve) => {
            window.ipc.send("getData", true);
            window.ipc.on('getData', (arg: any) => {
                resolve({
                    totalHd: arg.totalHd,
                    remainHd: arg.remainHd,
                    cpu: arg.cpu,
                    ram: arg.ram
                })
            })
        })
        const { totalHd, remainHd, cpu, ram } = await getDataPromise
        setGatherData(data => ({ ...data, totalHd: totalHd, remainHd: remainHd, cpu: cpu, ram: ram }))
        updateProgressBar(12.5 * 3);
        return true
    }

    const getGpuInfo = async () => {
        const gpu = (await getGPUTier()).gpu as string;
        setGatherData(data => ({ ...data, gpu: gpu }))
        updateProgressBar(12.5)
    }

    const getNetInfo = async () => {
        const getDataPromise = new Promise<{ downloadSpeed: string, uploadSpeed: string }>((resolve) => {
            window.ipc.send("getNetInfo", true);
            window.ipc.on('getNetInfo', (arg: any) => {
                console.log("firstNet", arg)
                resolve({
                    downloadSpeed: arg.downloadSpeed,
                    uploadSpeed: arg.uploadSpeed
                })
            })
        })
        const { downloadSpeed, uploadSpeed } = await getDataPromise
        setGatherData(data => ({ ...data, networkSpeed: `Download: ${downloadSpeed} Upload: ${uploadSpeed}` }))

        progress !== 100 && updateProgressBar(12.5);
        return true
    }

    const getLocation = async () => {
        const getLocationPromise = new Promise<{ location: string }>((resolve) => {
            window.ipc.send("getLocation", true);
            window.ipc.on('getLocation', (arg: any) => {
                resolve({
                    location: arg
                })
            })
        })
        const { location } = await getLocationPromise;
        setGatherData(data => ({ ...data, location: location }))
        updateProgressBar(12.5);
    }

    const updateProgressBar = async (addition: number) => {
        const progressBar = document.getElementById("progressBar");
        let value = 0;
        if (progressBar instanceof SVGElement) {
            (progressBar.style as CSSStyleDeclaration).strokeDashoffset = (100 - (progress + addition)).toString();
        }
        const progressText = document.getElementById("progressText");
        gsap.fromTo(progressText, {
            textContent: progress,
        }, {
            textContent: progress + addition,
            duration: 2.5,
            ease: "power1.inout",
            snap: { textContent: 1 },
        });
        progress += addition;
        if (progress === 100) {
            setTimeout(() => setPageStatus('info'), 4000);
        }
    }
    const getComDatas = async () => {
        const steps = [getCurrentDate, getOperatingSystem, getNetInfo, getDataInfo, getGpuInfo, getLocation]
        for (const step of steps) {
            if (await step()) {
                continue;
            }
        }
        window.ipc.send("getNetInfo", false);
    }
    useEffect(() => {
        getComDatas()
    }, [])


    return (
        <>
            <div className="flex flex-col justify-center px-[10vw] bg-transparent h-screen">
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
                                    <svg className="size-full -rotate-90 " viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#4A0026] dark:text-neutral-700" strokeWidth="2"></circle>
                                        <circle id='progressBar' cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#FF0083] dark:text-blue-500 transition-all duration-1500 ease-in-out" strokeWidth="2" strokeDasharray="100" strokeDashoffset='100' strokeLinecap="round"></circle>
                                    </svg>

                                    <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                        <span className="text-center text-[30px] font-bold text-white after:content-['%'] after:w-16 after:text-[30px] after:text-white" id='progressText'>0</span>
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
                                    <div>CPU:</div>
                                    <div>RAM:</div>
                                    <div>HD/SSD:</div>
                                    <div>GPU:</div>
                                    <div>Network Speed:</div>
                                    <div>Location:</div>
                                </div>
                                <div className="flex flex-col text-left gap-1">
                                    <div>{gatherData.currentDate}</div>
                                    <div>{gatherData.operatingSystem}</div>
                                    <div>{gatherData.cpu}</div>
                                    <div>{gatherData.ram} GB</div>
                                    <div>{gatherData.totalHd} TB</div>
                                    <div className="capitalize">{gatherData.gpu}</div>
                                    <div>{gatherData.networkSpeed}</div>
                                    <div>{gatherData.location}</div>
                                </div>
                            </div>
                        </div>
                }
                <div className="flex justify-center items-center mt-10">
                    <button className={`${pageStatus === "gather" && "opacity-0"} bg-[#FF0083] py-2 px-12 rounded-full text-sm`} disabled={pageStatus === "gather" && true} onClick={nextStatus}>
                        Save
                    </button>
                </div>
            </div >
        </>
    )
}

export default checkData;