export const reducer = (state, action) => {
	switch (action.type) {
		case "SET_CUSTOMER_DETAILS": {
			return { ...state, customerDetails: action?.payload }
		}
		case "SET_PACKAGE_ID": {
			return { ...state, packageID: action?.payload }
		}
		case "SET_PAYMENT_TYPE": {
			return { ...state, paymentType: action?.payload }
		}
		case "SET_PACKAGE_TYPE": {
			return { ...state, packageType: action?.payload }
		}
		default:
			return state
	}
}
