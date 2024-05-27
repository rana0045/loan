"use client"
// @ts-ignore
import useForm from "new-react-use-form"
import React, {
	FormEventHandler,
	useEffect,
	useLayoutEffect,
	useContext
} from "react"
import { PaymentContext } from "@/context/payment/context"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers-pro"
import { DatePicker } from "@mui/x-date-pickers-pro"
import { useMutation } from "@tanstack/react-query"
import { ApiCalls } from "@/api/calls/calls"
import { Calls } from "@/api/calls/type"
import Autocomplete from "@mui/material/Autocomplete"
import { states } from "@/data/ states"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Checkbox, Typography } from "@material-tailwind/react"
import { usePCR } from "@/context/onboarding/personal.credit.repair.context"
import { handleFormError } from "@/utils/error"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Option {
	label: string
}
export const PaymentsProceedForm = () => {
	const { state, dispatch } = useContext(PaymentContext)

	const router = useRouter()

	const form = useForm({
		streetAddress: "",
		appartmentNo: "",
		city: "",
		stateProvince: "",
		country: "",
		postalCode: ""
	})

	function handleSubmit() {
		dispatch({
			type: "SET_CUSTOMER_DETAILS",
			payload: form?.originalData
		})
		router?.push("/payments/payment")
	}

	// console.log(state)

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
					<label className="flex text-xl mb-2">Street Address</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.streetAddress}
						onChange={(e) => {
							form.set("streetAddress", e.target.value)
							form.errors.clear("streetAddress")
						}}
						placeholder="1900 Albany Ave"
						error={form.errors.has("streetAddress")}
						helperText={
							form.errors.has("streetAddress") &&
							form.errors.get("streetAddress")
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
						Appartment No
						<span className="text-lg text-gray-400">
							&nbsp;&nbsp; Optional
						</span>
					</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.appartmentNo}
						onChange={(e) => {
							form.set("appartmentNo", e.target.value)
							form.errors.clear("appartmentNo")
						}}
						placeholder="40233 Suit No"
						error={form.errors.has("appartmentNo")}
						helperText={
							form.errors.has("appartmentNo") &&
							form.errors.get("appartmentNo")
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
					<label className="flex text-xl mb-2">City</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.city}
						onChange={(e) => {
							form.set("city", e.target.value)
							form.errors.clear("city")
						}}
						placeholder="Brooklyn"
						error={form.errors.has("city")}
						helperText={
							form.errors.has("city") && form.errors.get("city")
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
					<label className="flex text-xl mb-2">State/Province</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						value={form.stateProvince}
						onChange={(e) => {
							form.set("stateProvince", e.target.value)
							form.errors.clear("stateProvince")
						}}
						placeholder="New York"
						error={form.errors.has("stateProvince")}
						helperText={
							form.errors.has("stateProvince") &&
							form.errors.get("stateProvince")
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
					<label className="flex text-xl mb-2">Country</label>
					<TextField
						select={true}
						disabled={form.busy}
						variant="outlined"
						value={form.country}
						onChange={(e) => {
							form.set("country", e.target.value)
							form.errors.clear("country")
						}}
						placeholder="United State"
						error={form.errors.has("country")}
						helperText={
							form.errors.has("country") &&
							form.errors.get("country")
						}
						InputProps={{
							sx: {
								borderRadius: "999px",
								fontSize: "1rem",
								px: "2rem",
								paddingRight: "2rem"
							}
						}}
					>
						<MenuItem value={"US"}>United State</MenuItem>
						<MenuItem value={"UK"}>United Kingdom</MenuItem>
						<MenuItem value={"VT"}>Vietnam</MenuItem>
					</TextField>
				</div>
				<div className={"w-full mt-4"}>
					<label className="flex text-xl mb-2">Postal Code</label>
					<TextField
						disabled={form.busy}
						variant="outlined"
						type="number"
						value={form.postalCode}
						onChange={(e) => {
							form.set("postalCode", e.target.value)
							form.errors.clear("postalCode")
						}}
						placeholder="234532"
						error={form.errors.has("postalCode")}
						helperText={
							form.errors.has("postalCode") &&
							form.errors.get("postalCode")
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

				<div className="flex w-full justify-center">
					<div className="w-[95%]">
						<Button
							sx={{
								borderRadius: "999px",
								fontSize: "1.5rem"
							}}
							onClick={handleSubmit}
						>
							PROCEED TO PAY
						</Button>
					</div>
				</div>
			</div>
		</form>
	)
}
