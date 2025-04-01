import { action, computed, makeObservable, observable } from 'mobx';

import * as api from '@/src/api';

import type { Address, Card } from '@/src/models';

export class UserService {
    isLoadingUserData: boolean = false;

    name: string = '';

    phone: string = '';

    addresses: Array<Address> = [];

    cards: Array<Card> = [];

    constructor() {
        makeObservable(this, {
            isLoadingUserData: observable,
            name: observable,
            phone: observable,
            addresses: observable,
            cards: observable,
            setIsLoadingUserData: action,
            setName: action,
            setPhone: action,
            setAddresses: action,
            setCards: action,
            currentAddress: computed,
            currentCard: computed,
        });
    }

    // Setters

    private setIsLoadingUserData = (isLoading: boolean) => {
        this.isLoadingUserData = isLoading;
    }

    private setName = (name: string) => {
        this.name = name;
    }

    private setPhone = (phone: string) => {
        this.phone = phone;
    }

    private setAddresses = (addresses) => {
        this.addresses = addresses;
    }

    private setCards = (cards) => {
        this.cards = cards;
    }

    // Actions

    public onLoadUserData = async () => {
        this.setIsLoadingUserData(true);

        try {
            const response = await api.fetchUserData();
            const userData = await response.json();
            const { name, phone, cards, addresses } = userData;
            this.setName(name);
            this.setPhone(phone);
            this.setCards(cards);
            this.setAddresses(addresses);
        } catch (error) {
            console.log('Failed to load user data with error:', error);
        } finally {
            this.setIsLoadingUserData(false);
        }
    }

    public onSelectAddress = (address) => {
        if (!this.currentAddress) {
            return;
        }

        const { currentAddress } = this;

        if (currentAddress.id === address.id) {
            return;
        }

        let newAddresses = [];
        this.addresses.forEach(addressItem => {
            if (addressItem.id === currentAddress.id) {
                newAddresses.push({ ...addressItem, isSelected: false });
            } else if (addressItem.id === address.id) {
                newAddresses.push({ ...addressItem, isSelected: true });
            } else {
                newAddresses.push(addressItem);
            }
        });
        this.setAddresses(newAddresses);
    }

    public onSelectCard = (card) => {
        if (!this.currentCard) {
            return;
        }

        const { currentCard } = this;

        if (currentCard.id === card.id) {
            return;
        }

        let newCards = [];
        this.cards.forEach(cardItem => {
            if (cardItem.id === currentCard.id) {
                newCards.push({ ...cardItem, isSelected: false });
            } else if (cardItem.id === card.id) {
                newCards.push({ ...cardItem, isSelected: true });
            } else {
                newCards.push(cardItem);
            }
        });
        this.setCards(newCards);
    }

    // Getters

    get currentAddress() {
        return this.addresses.find(address => address.isSelected);
    }

    get currentCard() {
        return this.cards.find(card => card.isSelected);
    }

    getCardNumberHidden = (card: Card): string => {
        if (!card?.number) {
            return '';
        }

        return card.number.slice(-4).padStart(7, '•');
    }
}
