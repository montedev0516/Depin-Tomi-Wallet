import "@/styles/globals.css"

import { Inter } from "next/font/google"
import Image from "next/image"
import { ThirdwebProvider } from "thirdweb/react"

import { TRPCReactProvider } from "@/trpc/react"
import Header from "./_components/layout/Header"
import Background from "@/assets/images/background.png"
import Footer from "./_components/layout/Footer"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const LocalStorageMock = require('localstorage-mock/jest');
global.localStorage = new LocalStorageMock();

export const metadata = {
  title: "Tomi-Depin-Node",
  description: "Tomi Depin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-transparent text-white relative`}>
        <div className="bg-black rounded-2xl w-full h-full top-0 left-0 flex flex-col">
          <ThirdwebProvider>
            {children}
          </ThirdwebProvider>
        </div>

      </body>
    </html>
  )
}
