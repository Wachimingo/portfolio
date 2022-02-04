import { toast } from 'react-toastify';
import { Dish, Response } from '../interfaces/DishInterface'
import { resizedataURL } from './imgController'

export const getItems = async (setItems: Function) => {
    const response = await fetch('/api/comedor/dish?type=all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json();
    if (response.ok) {
        setItems(data.records)
    } else {
        console.log(data.error.message)
    }
}

export const getFavorites = async (userId: string, token: string, setFavorites: Function) => {
    const response = await fetch(`/api/comedor/favoriteDish?userId=${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const data = await response.json();
    if (response.ok) {
        setFavorites(data)
    } else {
        toast.error(data.error.message)
    }
}

export const addNewItem = async (dish: any, image: any, token: string, setShowModal: Function) => {
    const optimizedImage = await resizedataURL(image, 100, 100)
    const response = await fetch('/api/comedor/dish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            name: dish?.name,
            description: dish?.description,
            price: dish?.price,
            category: dish?.category,
            image: optimizedImage
        })
    })
    const data = await response.json()
    if (response.ok) {
        toast.info('Platillo añadido')
        setShowModal('hidden')
    } else {
        toast.error(data.message)
    }
}

export const modifyItem = async (dish: any, item: Dish, image: any, token: string, setShowModal: Function, setItem: Function) => {
    let optimizedImage: any = item?.image
    if (image) optimizedImage = await resizedataURL(image, 100, 100)

    const response = await fetch('/api/comedor/dish', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id: item?._id,
            name: dish?.name ?? item?.name,
            description: dish?.description ?? item?.description,
            price: dish?.price ?? item?.price,
            image: optimizedImage,
            type: 'modify'
        })
    })

    const data = await response.json();

    if (response.ok) {
        setShowModal('hidden')
        setItem(undefined)
        toast.success('Informacion actualizada', {
            onOpen: () => document.location.reload(),
            onClose: () => document.location.reload()
        })
        document.location.reload();
    } else {
        toast.error(data.error.message);
    }
}

export const updateItem = (data: Dish, setShowModal: Function, setItem: Function) => {
    setItem(data);
    setShowModal('')
}

export const deleteItem = async (id: string, token: string) => {
    const response = await fetch('/api/comedor/dish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id })
    });
    const data = await response.json();
    if (response.ok) {
        toast.info(data)
    } else {
        toast.error(data)
    }
}

// This function sets the item to either show it is in sale for the current day or not, if it is going to be sell in the current day and active border will be added to the div
export const changeStateOfItem = async (id: string, state: boolean, token: string, toggleCard: void, updateProp: void) => {
    const response = await fetch('/api/comedor/dish', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            id,
            state,
            type: 'state'
        })
    });

    const data = await response.json();
    if (response.ok) {
        toast.success(state ? 'Activado' : 'Desactivado')
    } else {
        toast.error(data.error.message);
    }
}

export const setAsFavorite = async (dishId: string, userId: string, token: string, toggleStar: void) => {
    const response = await fetch('/api/comedor/favoriteDish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });

    const data = await response.json();
    if (response.ok) {
        toast.success('Marcado como favorito')
    } else {
        toast.error(data.error.message);
    }
}

export const removeFavorite = async (dishId: string, userId: string, token: string, toggleStar: void) => {
    const response = await fetch('/api/comedor/favoriteDish', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });
    const data = await response.json();
    if (response.ok) {
        toast.success('Eliminado de favoritos')
    } else {
        toast.error(data);
    }
}

export const reviewItem = async (dishId: string, userId: string, token: string) => {
    const response = await fetch('/api/comedor/review', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            dishId,
            userId,
        })
    });
    const data = await response.json();
    if (!response.ok) console.log(data.error.message)
}

export const increaseCount = (
    i: number,
    dish: any,
    dishCounter: any,
    dishCounters: any,
    setDishCounter: Function,
    totalDishes: number,
    setTotalDishes: Function,
    selectedDishes: any,
    setSelectedDishes: Function,
    totalPrice: number,
    setTotalPrice: Function
) => {
    if (dishCounter < 1) {
        let dishes = [...selectedDishes]
        // let newDish: any = { ...dish }
        delete dish!.createdAt
        delete dish!.description
        delete dish!.forToday
        delete dish!.favoriteQuantity
        delete dish!.ratingsAverage
        delete dish!.ratingsQuantity
        // delete dish!.image
        delete dish!.__v
        dishes.push(dish)
        setSelectedDishes(dishes)
    }
    dishCounter++;
    let newArray = [...dishCounters];
    newArray[i] = dishCounter;
    setDishCounter(newArray);
    totalDishes++;
    setTotalDishes(totalDishes);
    totalPrice = totalPrice + dish!.price;
    setTotalPrice(totalPrice);
}
export const decreaseCount = (
    i: number,
    dish: Dish,
    dishCounter: any,
    dishCounters: any,
    setDishCounter: Function,
    totalDishes: number,
    setTotalDishes: Function,
    selectedDishes: any,
    setSelectedDishes: Function,
    totalPrice: number,
    setTotalPrice: Function
) => {
    if (dishCounter > 0) {
        dishCounter--;
        let newArray = [...dishCounters];
        newArray[i] = dishCounter;
        setDishCounter(newArray);
        totalDishes--;
        setTotalDishes(totalDishes);
        totalPrice = totalPrice - dish!.price;
        setTotalPrice(totalPrice);
    } else if (dishCounter < 1) {
        let dishes = [...selectedDishes]
        const index = selectedDishes.indexOf(dish);
        if (index > -1) {
            dishes[index] = undefined
            dishes.splice(index, 1); // 2nd parameter means remove one item only
        }
        setSelectedDishes(dishes)
    }
}

export const processTransaction = async (
    totalPrice: number,
    totalDishes: number,
    token: string,
    userId: string,
    customer: string | undefined,
    selectedDishes: any,
    dishCounters: any,
    items: any,
) => {
    let dishes = [...selectedDishes]
    dishes.forEach((dish: any) => {
        const index = items.indexOf(dish)
        if (index > -1) {
            dish.quantity = dishCounters[index]
            delete dish!.image
        }
    });

    const result = await fetch('/api/comedor/bills', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userId,
            customer: customer ?? userId,
            totalDishes,
            totalPrice,
            status: 'isPending',
            isPaid: false,
            body: [...dishes]
        })
    });
    const data = await result.json();
    if (result.ok) {
        toast.success('Transaccion realizada');
    } else {
        toast.error(data.error)
    }
}