"use client"
// @ts-ignore
import React from "react"
import { MonitorReportForm } from "@/components/business-account-elements/monitor.report.form"
import { SubHeader } from "@/components/business-account-elements/sub.header"
import { ArrowLineText } from "@/components/business-account-elements/arrow.line.text"
import { VideoCard } from "@/components/cards/video-card"
import { ImportantInformation } from "@/components/business-account-elements/important.imformation"
import { Button, Input } from "@mui/material"
import { GeneralCard } from "@/components/cards/general.cad"
import { GotoWebsiteCard } from "@/components/cards/goto.website.card"
import { SubFormFooter } from "@/components/business-account-elements/sub.form.footer"
import { EditableContentRecord } from "@/components/business-account-elements/edaitable.content.record"
import { BlogCardLeft, BlogCustomCardLeft } from "@/components/cards/blog.card"
import { GotoWebsiteThreeCard } from "@/components/cards/goto.website.three.card"
import { SelectCard, SelectCardInvidual } from "@/components/cards/select.card"
import { Alert } from "@/components/business-account-elements/alert"
import { PaymentsSubHeader } from "@/components/payments/sub.header"
import { PaymentsStripePay } from "./stripe.pay"
import { PaymentsProceedForm } from "./proceed.form"
import { PaymnetsLineText } from "./line.text"

const subHeaderContents = {
	name: "Payments",
	url: "#"
}

export const PaymentsDetails = () => {
	return (
		<>
			<div className="flex flex-col w-full pr-12">
				<div className="flex w-full pl-8 mt-6">
					<PaymentsSubHeader contents={subHeaderContents} />
				</div>
				{/* <div className="flex flex-col w-full pl-8 mt-12">
                    <PaymentsStripePay />
                </div> */}
				<div className="flex flex-col w-full pl-8 mt-6 pr-6">
					<PaymnetsLineText contents="Personal Details" />
				</div>

				<div className="flex w-full">
					<PaymentsProceedForm />
				</div>
			</div>
		</>
	)
}
