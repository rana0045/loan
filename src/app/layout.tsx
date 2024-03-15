import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import ThemeRegistry from "@/provider/ThemeRegistry/ThemeRegistry";
import "./tab.css";
import { ThemeProvider } from "@/provider/tailwindmui/themeProvider";
import { ReactQuery } from "@/provider/reactquery/reactquery";
import { Toaster } from "react-hot-toast";
import { GuardContextProvider } from "@/context/guard/guard.context";

export const metadata: Metadata = {
  title: "Services Type",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={"h-fit md:bg-white bg-white"}>
        <GuardContextProvider>
          <ReactQuery>
            <Toaster />
            <ThemeProvider>
              <ThemeRegistry>{children}</ThemeRegistry>
            </ThemeProvider>
            {/*<footer*/}
            {/*  className={*/}
            {/*    "flex flex-row justify-center items-center text-center h-32 text-slate-400 text-sm "*/}
            {/*  }*/}
            {/*>*/}
            {/*  © 2023. Official TGIscalme.com Website*/}
            {/*</footer>*/}
          </ReactQuery>
        </GuardContextProvider>
      </body>
    </html>
  );
}
