export type Product = {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    stock: number;
}

export type CartItem = {
    product: Product;
    amountInCart: number;
}

export type Address = {
    id: string;
    city: string;
    address: string;
    isSelected: boolean;
}

export type Card = {
    id: string;
    number: string;
    isSelected: boolean;
}

export type OrderData = {
    address: Address;
    card: Card;
    comment: string;
    leaveAtTheDoor: boolean;
    orderItems: CartItem[];
    orderSum: number;
}

export type Order = {
    id: string,
    data: OrderData,
}
