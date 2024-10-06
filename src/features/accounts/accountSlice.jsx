import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false
        },

        withdraw(state, action) {
            state.balance -= action.payload
        },
        // if we do not receive object input
        // requestLoan: {
        //     prepare(amount, purpose) {
        //         return {
        //             payload: { amount, purpose },
        //         }
        //     },
        //     reducer(state, action) {
        //         if (state.loan > 0) return;

        //         console.log(action.payload);
        //         state.loan = action.payload.amount
        //         state.loanPurpose = action.payload.loanPurpose;
        //     }
        // },

        requestLoan(state, action) {
            if (state.loan > 0) return;

            console.log(action.payload);
            state.loan = action.payload.loanAmount;
            state.loanPurpose = action.payload.loanPurpose;
        },

        payloan(state, action) {

            if (state.balance >= state.loan) {
                state.balance = state.balance - state.loan;
                state.loan = 0;
                state.loanPurpose = "";
            }
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
})



export const { withdraw, payloan, requestLoan } = accountSlice.actions

export default accountSlice.reducer;

export function deposit(amount, currency) {
    if (currency === "USD")
        return { type: "account/deposit", payload: amount }
    //this is the function called thunk which is dispatched in case of ashychronus func, redux internally calls this function later
    return async function (dispatch, getState) {
        dispatch({ type: "account/convertingCurrency" })

        //API CALL
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

        const data = await res.json();
        console.log(data)
        const converted = data.rates.USD;
        //return Action
        dispatch({ type: "account/deposit", payload: converted })

    }
}



// export default function accountReducer(state = initialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state, balance: state.balance + action.payload, isLoading: false
//             }
//         case "account/withdraw":
//             return {
//                 ...state, balance: state.balance - action.payload
//             }
//         case "account/requestLoan":
//             if (state.loan > 0) return state;

//             return {
//                 ...state,
//                 loan: action.payload.amount, loanPurpose: action.payload.loanPurpose,
//             }
//         case "account/payLoan":
//             console.log(state.balance, state.loan)
//             if (state.balance >= state.loan) {
//                 return {
//                     ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan,
//                 }
//             } else {
//                 return {
//                     ...state
//                 }
//             }
//         case "account/convertingCurrency":
//             return { ...state, isLoading: true }
//         default:
//             return state;

//     }
// }


// export function deposit(amount, currency) {
//     if (currency === "USD")
//         return { type: "account/deposit", payload: amount }
//     //this is the function called thunk which is dispatched in case of ashychronus func, redux internally calls this function later
//     return async function (dispatch, getState) {
//         dispatch({ type: "account/convertingCurrency" })

//         //API CALL
//         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

//         const data = await res.json();
//         console.log(data)
//         const converted = data.rates.USD;
//         //return Action
//         dispatch({ type: "account/deposit", payload: converted })

//     }
// }
// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount }
// }
// export function requestLoan(amount, loanPurpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount, loanPurpose }
//     }
// }

// export function payloan() {
//     return { type: "account/payLoan" };
// }