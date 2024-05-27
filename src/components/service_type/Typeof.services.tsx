"use client"
import { PersonalUserSVG } from "@/components/svg/personal.user.svg"
import { BusinessUserSVG } from "@/components/svg/business.user.svg"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useContext, useState } from "react"
import { PaymentContext } from "@/context/payment/context"
import { useAuth } from "@/context/guard/guard.context"
export const TypeofServices = () => {
	const { state, dispatch } = useContext(PaymentContext)

	const { isSignIn } = useAuth()

	const router = useRouter()

	return (
		<>
			<div
				className={
					" select-none flex gap-12 md:flex-row flex-col justify-center items-center"
				}
			>
				<button
					className={
						" select-none flex flex-col justify-center items-center rounded-[28px]  hover:ring-1 ring-white  shadow-lg shadow-blue-500/50  boxGradient1st p-2 w-60 h-60"
					}
					onClick={() => {
						dispatch({
							type: "SET_PACKAGE_TYPE",
							payload: "personal"
						})
						if (isSignIn) {
							router?.push("/onboarding/pcr/pull-report")
						} else {
							router?.push("/onboarding/pcr/sign-up")
						}
					}}
				>
					<PersonalUserSVG />
					<p className={"text-white"}>Personal Credit Restoration</p>
				</button>
				<button
					className={
						"cursor-pointer select-none  hover:ring-1 ring-[#2684ff] flex flex-col justify-center items-center rounded-[28px]   bg-white p-2 w-60 h-60"
					}
					onClick={() => {
						dispatch({
							type: "SET_PACKAGE_TYPE",
							payload: "business"
						})
						router?.push("/business-account")
					}}
				>
					<BusinessUserSVG />
					<p className={"text-slate-800"}>Business Credit</p>
				</button>
			</div>
			<div
				className={
					" select-none flex gap-12 md:flex-row flex-col justify-center items-center"
				}
			>
				<Link
					href={"/leads/business-funding/business-details"}
					className={
						"cursor-pointer  select-none hover:ring-1 ring-[#2684ff] flex flex-col justify-center items-center rounded-[28px]  bg-white p-2 w-60 h-60"
					}
				>
					<img src={"bf.png"} alt={"business_funding"} />
					<p className={"text-slate-800"}> Business Funding</p>
				</Link>
				<Link
					href={"/leads/digital-marketing"}
					className={
						"cursor-pointer select-none hover:ring-1 ring-[#2684ff] flex flex-col justify-center items-center rounded-[28px]  bg-white p-2 w-60 h-60"
					}
				>
					<img src={"dm.png"} alt={"digital_marketing"} />
					<p className={"text-slate-800"}>Digital Marketing</p>
				</Link>
			</div>
		</>
	)
}
