import { useMemo } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

import { observer } from 'mobx-react-lite';

import type { CartItem } from '@/src/models';

export const OrderCell = observer(function OrderCell(item: CartItem) {
    const { product, amountInCart } = item;
    const { image, name, description, price } = product;

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
                    <Text style={styles.amountTotalTitle}>{`${amountInCart} шт.`}</Text>
                    <Text style={[styles.amountTotalTitle, styles.dot]}>•</Text>
                    <Text style={styles.amountTotalTitle}>{totalPrice}</Text>
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
        marginLeft: 8,
    },
    textContainer: {
        flex: 1,
        height: 44,
        marginBottom: 16,
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    amountTotalTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: '#5A5A5A',
    },
    dot: {
        color: '#A5A5A5',
        marginHorizontal: 4,
    },
});
