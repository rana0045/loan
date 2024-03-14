import React from "react";
import { Metadata } from "next";
import { AddClientPanel } from "@/context/business-credit/panel/add.client.panel";

export const metadata: Metadata = {
  title: "Choose From Below Options",
  description: "Generated by create next app",
};

let activeState = "dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-7 justify-between">
        <div className="flex col-start-1 col-span-1 w-full justify-start content-start sidebar-mobileview">
          <AddClientPanel activeState={activeState} />
        </div>
        <div className="flex col-start-2 col-span-7 justify-start business-page-padding-sm">
            {children}
        </div>

      </div>
      <p className="flex w-full justify-center content-center items-center text-red-400 py-4">@2024. Official TGIscalme.com Website</p>

    </>

  );
}
