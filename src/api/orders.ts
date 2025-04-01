import { MONEY_AMOUNT_ON_CARD, INSUFFICIENT_FUNDS_ERROR } from '@/src/constants';

import type { Order } from '@/src/models';

export function sendOrder(order: Order) {
    if (order.data.orderSum > MONEY_AMOUNT_ON_CARD) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(INSUFFICIENT_FUNDS_ERROR));
            }, 3000);
        });
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                json: () => Promise.resolve(order),
                ok: true,
                status: 201,
            });
        }, 2000);
    })
}
