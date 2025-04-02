import { useMemo } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { observer } from 'mobx-react-lite';

import { orderService } from '@/src/services/OrderService';

import type { CartItem } from '@/src/models';

export const CartCell = observer(function CartCell(cartItem: CartItem) {
    const { product, amountInCart } = cartItem;
    const { image, name, description, price, stock } = product;
    const { addToCart, removeFromCart } = orderService;

    const isAddDisabled = useMemo(() => {
        return amountInCart >= stock;
    }, [amountInCart, stock]);

    const totalPrice = useMemo(() => {
        const total = price * amountInCart;

        return `${total} ₽`;
    }, [price, amountInCart]);

    return (
        <View style={styles.cell}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.detailsContainer}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>{name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{description}</Text>
                </View>

                <View style={styles.amountTotalContainer}>
                    <View style={styles.amountContainer}>
                        <IconButton
                            icon="minus"
                            iconColor="#404040"
                            size={12}
                            onPress={() => removeFromCart(product)}
                        />
                        <Text style={styles.amountTitle}>{amountInCart}</Text>
                        <IconButton
                            icon="plus"
                            iconColor="#404040"
                            size={12}
                            disabled={isAddDisabled}
                            onPress={() => addToCart(product)}
                        />
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalTitle}>{totalPrice}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    image: {
        aspectRatio: 1,
        borderRadius: 8,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 8,
    },
    textContainer: {
        flex: 1,
        height: 56,
        marginBottom: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: 600,
        color: '#5A5A5A',
    },
    description: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    amountTotalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#F1F1F1',
    },
    amountTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: '#404040',
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    totalTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: '#404040',
    },
});
