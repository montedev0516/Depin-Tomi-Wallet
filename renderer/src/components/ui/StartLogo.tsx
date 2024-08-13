'use client'

import { useEffect } from "react"

const StartLogo = () => {
    useEffect(() => {

        async function getLoader() {
            const { quantum } = await import('ldrs')
            quantum.register()
        }
        getLoader();
    }, [])

    return (
        <l-quantum
            size="45"
            speed="1.75"
            color="#FF0083"
        ></l-quantum>
    )
    // Default values shown
}

export default StartLogo;