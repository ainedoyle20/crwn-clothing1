import { Key } from "react"
import { CartItem } from "../../store/cart/cart.types"

export type AdditionalInformation = {
    displayName?: string;
}

export type ObjectToAdd = {
    title: string;
}

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
    id?: string;
}

export type OrderData = {
    id: Key;
    createdAt: string;
    dateString: string;
    total: number;
    confirmedOrders: CartItem[];
}
