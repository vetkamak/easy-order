import { useMemo } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { observer } from 'mobx-react-lite';

import { orderService } from '@/src/services/OrderService';

import type { Product } from '@/src/models';

type Props = {
    product: Product;
    amountInCart: number;
};

export const ProductCell = observer(function ProductCell({ product, amountInCart }: Props) {
    const {
        id,
        image,
        name,
        description,
        price,
        stock,
    } = product;
    const { addToCart, removeFromCart } = orderService;

    const priceAmountTitle = useMemo(() => {
        if (amountInCart === 0) {
            return `${price} ₽`;
        }

        return `${price} ₽ x ${amountInCart}`;
    }, [price, amountInCart]);

    const isRemoveDisabled = useMemo(() => {
        return amountInCart === 0;
    }, [amountInCart]);

    const isAddDisabled = useMemo(() => {
        return amountInCart >= stock;
    }, [amountInCart, stock]);

    return (
        <View key={id} style={styles.cell}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.textContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>{name}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{description}</Text>
            </View>

            <View style={[styles.priceAmountContainer]}>
                <IconButton
                    icon="minus"
                    iconColor="#FFFFFF"
                    size={16}
                    disabled={isRemoveDisabled}
                    onPress={() => removeFromCart(product)}
                />
                <Text
                    numberOfLines={1}
                    style={styles.priceAmountTitle}
                >
                    {priceAmountTitle}
                </Text>
                <IconButton
                    icon="plus"
                    iconColor="#FFFFFF"
                    size={16}
                    disabled={isAddDisabled}
                    onPress={() => addToCart(product)}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    image: {
        aspectRatio: 1,
        borderRadius: 16,
    },
    textContainer: {
        height: 56,
        marginVertical: 8,
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
    priceAmountContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: '#EB786E',
    },
    priceAmountTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#FFFFFF',
    },
});
