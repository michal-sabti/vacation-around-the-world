import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

function PayPalCheckout({ price }) {
    return (<>
        <h3>מחיר לתשלום : {price}</h3><br/>
        <div className="pay-div">
            <PayPalScriptProvider>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                { amount: { value: "13.99", }, },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        const name = details.payer.name.given_name;
                        Swal.fire("Transaction completed by " + name);
                    }}
                />
            </PayPalScriptProvider>
        </div></>
    );
}

export default PayPalCheckout