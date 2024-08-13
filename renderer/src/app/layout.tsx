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
      <body className={`font-sans ${inter.variable} bg-black text-white relative`}>
        {children}
      </body>
    </html>
  )
}
