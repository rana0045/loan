"use client"
// @ts-ignore
import useForm from "new-react-use-form"
import axios from "axios"
import React, { FormEventHandler, useContext, useLayoutEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { ApiCalls } from "@/api/calls/calls"
import { PaymentContext } from "@/context/payment/context"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Card } from "iconsax-react"

interface Option {
	label: string
}

export const PaymentsPaymentForm = () => {
	const router = useRouter()
	const { state, dispatch } = useContext(PaymentContext)

	const LOGIN_ID = process.env.NEXT_PUBLIC_AUTHORIZE_API_LOGIN_ID
	const TRANSACTION_ID = process.env.NEXT_PUBLIC_AUTHORIZE_API_TRANSACTION_ID
	const API_URL =
		process.env.NEXT_PUBLIC_AUTHORIZE_API_URL ||
		"https://apitest.authorize.net/xml/v1/request.api"

	const form = useForm({
		cardType: "",
		cardHolderName: "",
		creditCardNumber: "",
		expireDateMonth: "",
		expireDateYear: "",
		cvv: ""
	})

	const useData = useQuery({
		queryKey: ["CheckOutBilling"],
		queryFn: () =>
			ApiCalls.CheckOutBilling({
				_id: state?.packageID,
				type: "module1",
				paytype: state?.paymentType
			}),
		refetchOnWindowFocus: false,
		retryOnMount: false,
		refetchIntervalInBackground: false
	})

	const numericValue = parseFloat(useData?.data?.total.$numberDecimal)

	function handleSubmit() {
		if (state?.paymentType === "full") {
			const payload = {
				createTransactionRequest: {
					merchantAuthentication: {
						name: LOGIN_ID,
						transactionKey: TRANSACTION_ID
					},
					transactionRequest: {
						transactionType: "authCaptureTransaction",
						amount: numericValue?.toString(),
						payment: {
							creditCard: {
								cardNumber:
									form?.originalData?.creditCardNumber,
								expirationDate: `${form?.originalData?.expireDateYear}-${form?.originalData?.expireDateMonth}`,
								cardCode: form?.originalData?.cvv
							}
						},
						billTo: {
							firstName:
								form?.originalData?.cardHolderName?.split(
									" "
								)[0],
							lastName:
								form?.originalData?.cardHolderName?.split(
									" "
								)[1],
							address: state?.customerDetails?.streetAddress,
							city: state?.customerDetails?.city,
							state: state?.customerDetails?.stateProvince,
							zip: state?.customerDetails?.postalCode,
							country: state?.customerDetails?.country
						}
					}
				}
			}

			axios
				.post(API_URL, payload)
				?.then((res) => {
					console.log(res)
					if (res?.data?.messages?.resultCode === "Ok") {
						toast.success(res?.data?.messages?.message[0]?.text)
						if (state?.packageType === "personal") {
							router?.push("/onboarding/pcr/docs-upload")
						} else if (state?.packageType === "business") {
							router?.push("/step1/monitor-report")
						}
					} else {
						toast.error(
							res?.data?.transactionResponse?.errors[0]?.errorText
						)
					}
				})
				?.catch((err) => {
					console.log(err)
					toast.error("Error!")
				})
		}

		if (state?.paymentType === "emi") {
			const date = new Date()
			const year = date?.getFullYear()
			const month = String(date?.getMonth() + 1).padStart(2, "0")
			const day = String(date?.getDate()).padStart(2, "0")

			const formattedDate = `${year}-${month}-${day}`

			const payload = {
				ARBCreateSubscriptionRequest: {
					merchantAuthentication: {
						name: LOGIN_ID,
						transactionKey: TRANSACTION_ID
					},
					subscription: {
						paymentSchedule: {
							interval: {
								length: "1",
								unit: "months"
							},
							startDate: formattedDate,
							totalOccurrences: "9999"
						},
						amount: numericValue?.toString(),
						payment: {
							creditCard: {
								cardNumber:
									form?.originalData?.creditCardNumber,
								expirationDate: `${form?.originalData?.expireDateYear}-${form?.originalData?.expireDateMonth}`
							}
						},
						billTo: {
							firstName:
								form?.originalData?.cardHolderName?.split(
									" "
								)[0],
							lastName:
								form?.originalData?.cardHolderName?.split(
									" "
								)[1],
							address: state?.customerDetails?.streetAddress,
							city: state?.customerDetails?.city,
							state: state?.customerDetails?.stateProvince,
							zip: state?.customerDetails?.postalCode,
							country: state?.customerDetails?.country
						}
					}
				}
			}

			axios
				.post(API_URL, payload)
				?.then((res) => {
					console.log(res)
					if (res?.data?.messages?.resultCode === "Ok") {
						toast.success(res?.data?.messages?.message[0]?.text)
						if (state?.packageType === "personal") {
							router?.push("/onboarding/pcr/docs-upload")
						} else if (state?.packageType === "business") {
							router?.push("/step1/monitor-report")
						}
					} else {
						toast.error(res?.data?.messages?.message[0]?.text)
					}
				})
				?.catch((err) => {
					console.log(err)
					toast.error("Error!")
				})

			console.log(formattedDate, payload)
		}

		// console.log(form?.originalData, state)
	}

	return (
		<form
			id={"proceed-pay"}
			className={
				"  flex flex-col h-fit justify-center items-center  md:px-8 px-[16px] w-full mb-24"
			}
		>
			<div
				className={
					"mt-6 h-fit flex flex-col justify-center items-center gap-8 md:w-full w-full"
				}
			>
				<div className={"w-full mt-4"}>
					<label className="flex text-xl mb-2">Card Type</label>
					<TextField
						select={true}
						disabled={form.busy}
						variant="outlined"
						value={form.cardType}
						onChange={(e) => {
							form.set("cardType", e.target.value)
							form.errors.clear("cardType")
						}}
						color="primary"
						placeholder="American Express"
						error={form.errors.has("cardType")}
						helperText={
							form.errors.has("cardType") &&
							form.errors.get("cardType")
						}
						InputProps={{
							sx: {
								borderRadius: "999px",
								fontSize: "1rem",
								px: "2rem",
								color: "blue"
							}
						}}
					>
						<MenuItem value={"American Express"}>
							American Express
						</MenuItem>
						<MenuItem value={"PayPal"}>PayPal</MenuItem>
						<MenuItem value={"PayOnner"}>PayOnner</MenuItem>
					</TextField>
				</div>
				<div className={"w-full mt-4"}>
					<label className="flex text-xl mb-2">
						Card Holder Number
						<span className="text-lg text-gray-400">
							&nbsp;&nbsp; Optional
						</span>
					</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.cardHolderName}
						onChange={(e) => {
							form.set("cardHolderName", e.target.value)
							form.errors.clear("cardHolderName")
						}}
						placeholder="Name On Credit Debit Card"
						error={form.errors.has("cardHolderName")}
						helperText={
							form.errors.has("cardHolderName") &&
							form.errors.get("cardHolderName")
						}
						InputProps={{
							sx: {
								borderRadius: "999px",
								fontSize: "1rem",
								px: "2rem"
							}
						}}
					/>
				</div>
				<div className={"w-full mt-4"}>
					<label className="flex text-xl mb-2">
						Credit Card Number
					</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.creditCardNumber}
						onChange={(e) => {
							form.set("creditCardNumber", e.target.value)
							form.errors.clear("creditCardNumber")
						}}
						placeholder="XXXX   XXXX   XXXX   XXXX"
						error={form.errors.has("creditCardNumber")}
						helperText={
							form.errors.has("creditCardNumber") &&
							form.errors.get("creditCardNumber")
						}
						InputProps={{
							sx: {
								borderRadius: "999px",
								fontSize: "1rem",
								px: "2rem"
							},
							startAdornment: (
								<InputAdornment position="start">
									<Card />
								</InputAdornment>
							)
						}}
					/>
				</div>
				<div className={"w-full mt-4"}>
					<div className=" flow-root justify-between w-full">
						<div className=" float-left w-max">
							<label className="flex text-xl mb-2">
								Expire Date
							</label>
							<div className="flex flex-row">
								<div className="flex w-32">
									<TextField
										disabled={form.busy}
										variant="outlined"
										value={form.expireDateMonth}
										onChange={(e) => {
											form.set(
												"expireDateMonth",
												e.target.value
											)
											form.errors.clear("expireDateMonth")
										}}
										placeholder="MM"
										error={form.errors.has(
											"expireDateMonth"
										)}
										helperText={
											form.errors.has(
												"expireDateMonth"
											) &&
											form.errors.get("expireDateMonth")
										}
										InputProps={{
											sx: {
												borderRadius: "999px",
												fontSize: "1rem",
												px: "2rem"
											}
										}}
									/>
								</div>
								<div className="flex w-40 ml-6">
									<TextField
										disabled={form.busy}
										variant="outlined"
										value={form.expireDateYear}
										onChange={(e) => {
											form.set(
												"expireDateYear",
												e.target.value
											)
											form.errors.clear("expireDateYear")
										}}
										placeholder="YYYY"
										error={form.errors.has(
											"expireDateYear"
										)}
										helperText={
											form.errors.has("expireDateYear") &&
											form.errors.get("expireDateYear")
										}
										InputProps={{
											sx: {
												borderRadius: "999px",
												fontSize: "1rem",
												px: "2rem"
											}
										}}
									/>
								</div>
							</div>
						</div>
						<div className=" float-right">
							<label className="flex text-xl mb-2">CVV</label>
							<TextField
								disabled={form.busy}
								variant="outlined"
								value={form.cvv}
								onChange={(e) => {
									form.set("cvv", e.target.value)
									form.errors.clear("cvv")
								}}
								placeholder="123"
								error={form.errors.has("cvv")}
								helperText={
									form.errors.has("cvv") &&
									form.errors.get("cvv")
								}
								InputProps={{
									sx: {
										borderRadius: "999px",
										fontSize: "1rem",
										px: "2rem"
									},
									endAdornment: (
										<InputAdornment position="end">
											<Card />
										</InputAdornment>
									)
								}}
							/>
						</div>
					</div>
				</div>

				<div className=" flow-root w-full px-6 mt-16">
					<p className=" float-left text-gray-400 text-lg">
						Subtotal
					</p>
					<p className=" float-right font-bold text-xl">
						${numericValue}
					</p>
				</div>
				<hr className="flex border-t-2 w-full border-gray-200 mt-[-1.5rem]" />
				<div className=" flow-root w-full px-6  mt-[-1.5rem]">
					<p className=" float-left text-gray-400 text-lg">Total</p>
					<p className=" float-right font-bold text-xl">
						${numericValue}
					</p>
				</div>
				<div className="flex w-full justify-center mt-8">
					<div className="w-[95%]">
						<Button
							sx={{
								borderRadius: "999px",
								fontSize: "1.5rem"
							}}
							onClick={handleSubmit}
						>
							PAY NOW
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}
