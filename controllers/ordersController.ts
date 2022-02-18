import { toast } from "react-toastify";

export const updateStatus = async (token: string, orderId: string, status: string) => {
    const result = await fetch(`/api/comedor/orders?orderId=${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            status
        })
    });
    const data = await result.json();
    if (result.ok) {
        toast.info('Order has being updated')
    } else {
        toast.error('Error');
    }
}