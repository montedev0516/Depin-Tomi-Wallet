const StepperComponent = (props: any) => {
    return (
        <div className="ml-[18vw]">
            <ul className="relative flex flex-row gap-x-2 text-[20px] ">
                <li className="shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 w-full inline-flex items-center align-middle">
                        <span className="size-10 flex justify-center items-center shrink-0 bg-[#FF0083] font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                            1
                        </span>
                        <div className="ms-2 w-full h-px flex-1 bg-[#FF0083] group-last:hidden dark:bg-neutral-700"></div>
                    </div>
                    <div className="mt-3">
                        <span className="block font-medium text-[#FF0083] dark:text-white">
                            Start
                        </span>
                    </div>
                </li>

                <li className="shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 w-full inline-flex items-center align-middle">
                        <span className="size-10 flex justify-center items-center shrink-0 bg-[#FF0083] font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white">
                            2
                        </span>
                        <div className={`ms-2 w-full h-px flex-1 ${props.pageStatus === 'info' ? 'bg-[#FF0083]' : 'bg-gray-200'} group-last:hidden dark:bg-neutral-700`}></div>
                    </div>
                    <div className="mt-3">
                        <span className="block font-medium text-[#FF0083]">
                            Gathering
                        </span>
                    </div>
                </li>

                <li className="shrink basis-0 flex-1 group">
                    <div className="min-w-7 min-h-7 w-full inline-flex items-center align-middle">
                        <span className={`size-10 flex justify-center items-center shrink-0 ${props.pageStatus === 'info' ? 'bg-[#FF0083]' : 'bg-gray-100'} font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white`}>
                            3
                        </span>
                    </div>
                    <div className="mt-3">
                        <span className={`block font-medium ${props.pageStatus === 'info' ? 'text-[#FF0083]' : 'text-[#535353]'}`}>
                            Info
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default StepperComponent;