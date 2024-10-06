import { combineReducers, createStore } from "redux";

const initialStateAccount={
    balance:0,
    loan:0,
    loanPurpose:"",
}

const initialStateCustomer={
    fullName:"",
    nationalID:"",
    createdAt:"",
}

function accountReducer(state=initialStateAccount,action){
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

            return{
                ...state,
                 loan:action.payload.amount, loanPurpose:action.payload.loanPurpose, 
                }
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

function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case "customer/createCustomer":
        return{
            ...state, 
            fullName: action.payload.fullName,
            nationalID:action.payload.nationalID,
            createdAt:action.payload.createdAt
        }
        case "customer/updateName":
            console.log(action.payload);
            return{
                ...state,
                 fullName:action.payload
                }

        default: return state
    }
}

const rootReducer = combineReducers({
    account:accountReducer,
    customer:customerReducer,
})
const store = createStore(rootReducer);

// store.dispatch({type:"account/deposit", payload:5000});

// console.log(store.getState())



// store.dispatch({type:"account/withdraw", payload:250});

// console.log(store.getState())

// store.dispatch({type:"account/requestLoan", payload:{amount:1000, loanPurpose:"buy a car"}})
// console.log(store.getState())

// store.dispatch({type:"account/payLoan"})
// console.log(store.getState());


function deposit(amount){
    return {type:"account/deposit", payload:amount}
}
function withdraw(amount){
    return {type:"account/withdraw", payload:amount}
}
function requestLoan(amount,loanPurpose){
    return {type:"account/requestLoan",
         payload:{amount, loanPurpose}}
}

function payloan(){
    return {type:"account/payLoan"};   
}

store.dispatch(deposit(5000))
console.log(store.getState());

store.dispatch(withdraw(250))
console.log(store.getState());
store.dispatch(requestLoan(1000,"buy a car"))
console.log(store.getState());
store.dispatch(payloan())
console.log(store.getState());


function createCustomer(fullName, nationalID){
   return {
    type:"customer/createCustomer",
    payload: {fullName, nationalID, createdAt: new Date().toISOString()} 
    }
}

function updateName(fullName){
    console.log(fullName);
    return{
        type:"customer/updateName", payload:fullName}
}

store.dispatch(createCustomer("Shivang Mathur", "197"))

console.log(store.getState());

store.dispatch(updateName("Arnav Mathur"))
console.log(store.getState());