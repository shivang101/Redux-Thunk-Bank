import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer(state, action) {
            state.fullName = action.payload.fullName;
            state.nationalID = action.payload.nationalID;
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }
})

export const { createCustomer, updateName } = customerSlice.actions

export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalID: action.payload.nationalID,
//                 createdAt: action.payload.createdAt
//             }
//         case "customer/updateName":
//             console.log(action.payload);
//             return {
//                 ...state,
//                 fullName: action.payload
//             }

//         default: return state
//     }
// }

// export function createCustomer(fullName, nationalID) {
//     return {
//         type: "customer/createCustomer",
//         payload: { fullName, nationalID, createdAt: new Date().toISOString() }
//     }
// }

// export function updateName(fullName) {
//     console.log(fullName);
//     return {
//         type: "customer/updateName", payload: fullName
//     }
// }
