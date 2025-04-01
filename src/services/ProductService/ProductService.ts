import { action, makeObservable, observable } from 'mobx';

import * as api from '@/src/api';

import type { Product } from '@/src/models';

export class ProductService {
    public isLoadingProducts: boolean = false;

    public isRefreshingProducts: boolean = false;

    public products: Product[] = [];

    constructor() {
        makeObservable(this, {
            isLoadingProducts: observable,
            isRefreshingProducts: observable,
            setIsLoadingProducts: action,
            setIsRefreshingProducts: action,
            products: observable,
            setProducts: action,
        });
    }

    // Setters

    private setIsLoadingProducts = (isLoading: boolean) => {
        this.isLoadingProducts = isLoading;
    }

    private setIsRefreshingProducts = (isRefreshing: boolean) => {
        this.isRefreshingProducts = isRefreshing;
    }

    private setProducts = (products: Product[]) => {
        this.products = products;
    }

    // Actions

    public onLoadProducts = async () => {
        this.setIsLoadingProducts(true);

        try {
            const response = await api.fetchProducts({});
            const { products } = await response.json();
            this.setProducts(products as Product[]);
        } catch (error) {
            console.log('Failed to load products with error:', error);
        } finally {
            this.setIsLoadingProducts(false);
        }
    }

    public onRefreshProducts = async () => {
        this.setIsRefreshingProducts(true);

        try {
            const response = await api.fetchProducts({
                refresh: true,
                from: this.products.length + 1,
                to: this.products.length + 20,
            });
            const { products } = await response.json();
            this.setProducts([
                ...this.products,
                ...products as Product[],
            ]);
        } catch (error) {
            console.log('Failed to refresh products with error:', error);
        } finally {
            this.setIsRefreshingProducts(false);
        }
    }
}
