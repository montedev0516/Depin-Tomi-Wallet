'use client'
import { ipcRenderer } from "electron";
const Template = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  // const minimizeWindow = () => {
  //   ipcRenderer.send("minimize-me");
  // }
  return <>
    <div className="container rounded-t-2xl " id="header">
      <div className="titlebar flex flex-row" style={{ float: "right" }}>
        <button className=" text-3xl hover:opacity-80 cursor-default" id="minimize">&nbsp;&nbsp;_</button>
        <button className=" text-3xl hover:opacity-80 cursor-default" onClick={() => window.close()}>&nbsp;&nbsp;&times;&nbsp;</button>
      </div>
    </div>
    {children}
  </>
}

export default Template