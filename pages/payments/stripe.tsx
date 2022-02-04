import React, { useState, useEffect } from "react";
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/checkouts/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function stripe() {
    const [clientSecret, setClientSecret] = useState(undefined);

    //**TODO Move this to serversideprops
    useEffect(() => {
        fetch("/api/payments/stripe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance: any = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {
                clientSecret ?
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                    : undefined
            }
        </div>
    );
}