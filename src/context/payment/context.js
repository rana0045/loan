import { createContext, useContext } from "react"

export const PaymentContext = createContext()

export function usePaymentContext() {
	return useContext(PaymentContext)
}
