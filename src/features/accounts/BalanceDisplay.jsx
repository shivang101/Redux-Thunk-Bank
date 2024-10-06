import { useSelector } from "react-redux";
import store from "../../store";

function formatCurrency(value) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

function BalanceDisplay() {
    console.log(store.getState())
    const bal = useSelector((state) => state.account.balance)
    console.log(bal);

    return <div className="balance">{formatCurrency(bal)}</div>;
}

export default BalanceDisplay;