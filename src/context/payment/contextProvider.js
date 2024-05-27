"use client"

import { useReducer } from "react"
import { PaymentContext } from "./context"
import { reducer } from "./reducer"

export default function PaymentContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, {
		customerDetails: null,
		packageID: "",
		paymentType: null,
		packageType: null
	})

	return (
		<PaymentContext.Provider value={{ state, dispatch }}>
			{children}
		</PaymentContext.Provider>
	)
}
