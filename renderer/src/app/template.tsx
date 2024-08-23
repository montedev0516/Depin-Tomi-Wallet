'use client'

import { useEffect } from "react";

const Template = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const minimizeWindow = () => {
    window.ipc.send('minimize', true);
  }
  useEffect(() => {
    if (window.closed) localStorage.clear();
  })
  return <>
    <div className="container rounded-t-2xl " id="header">
      <div className="titlebar flex flex-row" style={{ float: "right" }}>
        <button className=" text-3xl hover:opacity-80 cursor-default" id="minimize" onClick={minimizeWindow}>&nbsp;&nbsp;-</button>
        <button className=" text-3xl hover:opacity-80 cursor-default" onClick={() => window.close()}>&nbsp;&nbsp;&times;&nbsp;</button>
      </div>
    </div>
    {children}
  </>
}

export default Template