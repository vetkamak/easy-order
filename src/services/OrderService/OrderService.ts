import { action, computed, makeObservable, observable } from 'mobx';
import { router } from 'expo-router';

import { userService } from '@/src/services/UserService';

import { MIN_ORDER_SUM } from '@/src/constants';

import * as api from '@/src/api';

import type { Product, CartItem, Order } from '@/src/models';

export class OrderService {
    private productCart = new Map<string, CartItem>();

    public orderComment: string = '';

    public leaveAtTheDoor: boolean = false;

    public isSendingOrder: boolean = false;

    public isErrorVisible: boolean = false;

    private createdOrder: Order | null = null;

    constructor() {
        makeObservable(this, {
            productCart: observable,
            orderComment: observable,
            leaveAtTheDoor: observable,
            isSendingOrder: observable,
            isErrorVisible: observable,
            createdOrder: observable,
            setOrderComment: action,
            toggleLeaveAtTheDoor: action,
            setIsSendingOrder: action,
            setErrorVisible: action,
            addToCart: action,
            removeFromCart: action,
            clearCart: action,
            setCreatedOrder: action,
            orderSum: computed,
            isOrderValid: computed,
            cartItemsList: computed,
            isOrderStatusVisible: computed,
            createdOrderSum: computed,
            createdOrderDate: computed,
            createdOrderAddress: computed,
            createdOrderComment: computed,
            createdOrderProducts: computed,
        });
    }

    // Setters

    public setOrderComment = (comment) => {
        this.orderComment = comment;
    }

    public toggleLeaveAtTheDoor = () => {
        this.leaveAtTheDoor = !this.leaveAtTheDoor;
    }

    private setIsSendingOrder = (isSending: boolean) => {
        this.isSendingOrder = isSending;
    }

    public setErrorVisible = (isVisible: boolean) => {
        this.isErrorVisible = isVisible;
    }

    private setCreatedOrder = (order: Order) => {
        this.createdOrder = order;
    }

    // Actions

    public addToCart = (product: Product) => {
        const { id } = product;

        if (this.productCart.has(id)) {
            const cartItem = this.productCart.get(id);
            this.productCart.set(id, {...cartItem, amountInCart: cartItem.amountInCart + 1});
        } else {
            this.productCart.set(id, { product, amountInCart: 1 });
        }
    }

    public removeFromCart = (product: Product) => {
        const { id } = product;

        const cartItem = this.productCart.get(id);

        if (!cartItem) {
            return;
        }

        if (cartItem.amountInCart > 1) {
            this.productCart.set(id, {...cartItem, amountInCart: cartItem.amountInCart - 1});
        } else {
            this.productCart.delete(id);
        }

        if (this.productCart.size === 0) {
            if (router.canDismiss()) {
                router.dismiss();
            }
        }
    }

    private clearCart = () => {
        this.productCart.clear();
    }

    public onSendOrder = async () => {
        if (!this.isOrderValid) {
            return;
        }

        this.setIsSendingOrder(true);

        try {
            const order = this.getOrderDetails();
            const response = await api.sendOrder(order);

            if (response.ok && response.status === 201) {
                this.clearCart();

                const createdOrder = await response.json();
                this.setCreatedOrder(createdOrder);

                if (router.canDismiss()) {
                    router.dismiss();
                }

                router.push('/orderStatusModal');
            }
        } catch (error) {
            console.log('Failed to send order with error:', error);
            this.setErrorVisible(true);
        } finally {
            this.setIsSendingOrder(false);
        }
    }

    // Getters

    get orderSum() {
        return (
            this.cartItemsList
                .reduce((sum, cartItem) => sum += cartItem.product.price * cartItem.amountInCart, 0)
        );
    }

    get isOrderValid() {
        return this.orderSum >= MIN_ORDER_SUM;
    }

    get cartItemsList() {
        return Array.from(this.productCart.values());
    }

    get isOrderStatusVisible() {
        return !!this.createdOrder;
    }

    get createdOrderSum() {
        if (this.createdOrder === null) {
            return 0;
        }

        return `${this.createdOrder.data.orderSum} ₽`;
    }

    get createdOrderDate() {
        if (this.createdOrder === null) {
            return '';
        }

        const { id: timestampStr } = this.createdOrder;
        const timestamp = Number(timestampStr);
        const locDateTime = `${new Date(timestamp).toLocaleDateString()} в ${new Date(timestamp).toLocaleTimeString()}`;
        return locDateTime.slice(0, locDateTime.length - 3);
    }

    get createdOrderAddress() {
        if (this.createdOrder === null) {
            return '';
        }

        const { city, address } = this.createdOrder.data.address
        return `${city}, ${address}`;
    }

    get createdOrderComment() {
        if (this.createdOrder === null) {
            return '';
        }

        return this.createdOrder.data.comment;
    }

    get createdOrderProducts() {
        if (this.createdOrder === null) {
            return [];
        }

        return this.createdOrder.data.orderItems;
    }

    // Utils

    public getProductAmountInCart = (product: Product): number => {
        return this.productCart.get(product.id)?.amountInCart || 0;
    }

    private getOrderDetails = (): Order => {
        const { currentAddress, currentCard } = userService;
        const { productCart, orderComment, leaveAtTheDoor, orderSum } = this;

        const orderItems = Array.from(productCart.values());

        return {
            id: Date.now().toString(),
            data: {
                address: currentAddress,
                card: currentCard,
                comment: orderComment,
                leaveAtTheDoor,
                orderItems,
                orderSum,
            },
        };
    }
}
