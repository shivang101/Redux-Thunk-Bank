import { useSelector } from "react-redux";


function Customer() {
    console.log("Customer Name Component got rendered")
    const val = useSelector((store) => store.customer)
    console.log(val)
    return <h2>👋 Welcome, {val.fullName}</h2>;
}

export default Customer;