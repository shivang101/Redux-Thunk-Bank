import { createStore } from "redux";

const intialState={
    balance:0,
    loan:0,
    loanPurpose:"",
}

function reducer(state=intialState,action){
    switch(action.type){
        case "account/deposit":
        return{
            ...state, balance:state.balance+action.payload
        }
        case "account/withdraw":
        return{
            ...state, balance:state.balance-action.payload
        }
        case "account/requestLoan":
            if(state.loan>0) return state;
            return{...state, loan:action.payload}
        case "account/payLoan":
            if(state.balance>=state.loan){
                return{
                    ...state, loan:0, loanPurpose:"", balance:state.balance-state.loan,
                }
            }else{
                return{
                    ...state
                }
            }
        default:
            return state;

    }
}