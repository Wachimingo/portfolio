import { toast } from "react-toastify";
import { Dish, SelectedDishes } from "../interfaces/DishInterface";

export const creditCard = async (
    items: Dish[],
    selectedDishes: SelectedDishes[],
    dishCounters: number[],
    totalDishes: number,
    totalPrice: number,
    token: string,
    userId: string,
    customer: string,
    setClientSecret: Function,
    setType: Function
) => {

    let dishes = [...selectedDishes]
    dishes.forEach((dish: any) => {
        const index = items.indexOf(dish)
        if (index > -1) {
            dish.quantity = dishCounters[index]
            delete dish!.image
        }
    });

    const result = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            items: [...dishes],
            dishCounters,
            totalDishes,
            totalPrice,
            userId,
            customer: customer ?? '',
        }),
    });

    const data = await result.json();

    if (result.ok) {
        const newBill = await fetch('/api/comedor/bills', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                body: [...dishes],
                totalDishes,
                totalPrice,
                userId,
                customer: customer ?? '',
                paymentIntent: data.clientSecret.split('_secret_')[0],
                status: 'isPending',
                isPaid: false
            })
        });
        // console.log("TCL: data.clientSecret ", data.clientSecret)
        setClientSecret(data.clientSecret);
        const newBillRes = await newBill.json();
        if (newBill.ok) {
            setType('credit');
        } else {
            toast(newBillRes)
        }
    } else {
        toast.error(data)
    }
}