import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Appbar, FAB, Icon } from 'react-native-paper';
import { Link } from 'expo-router';
import type { ListRenderItem } from 'react-native';

import { observer} from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';
import { productService } from '@/src/services/ProductService';
import { orderService } from '@/src/services/OrderService';

import { AddressSelect, ProductCell } from '@/src/components';

import type { Product } from '@/src/models';

const ProductFeed = observer(function Index() {
    const { onLoadUserData, isLoadingUserData, currentAddress } = userService;
    const { onLoadProducts, onRefreshProducts, products } = productService;
    const { getProductAmountInCart, isOrderStatusVisible, orderSum } = orderService;

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        onLoadUserData();
        onLoadProducts();
    }, []);

    const renderItem: ListRenderItem<Product> = useCallback(({ item, index}) => {
        const amountInCart = getProductAmountInCart(item);

        return (
            <ProductCell amountInCart={amountInCart} product={item} />
        );
    }, [getProductAmountInCart]);

    const totalSum = useMemo(() => {
        return `${orderSum} ₽`;
    }, [orderSum]);

    const appbar = useMemo(() => {
        if (isLoadingUserData) {
            return (
                <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                    <Appbar.Content
                        title={(
                            <ActivityIndicator color="#EC8476" size="small" />
                        )}
                    />
                </Appbar.Header>
            );
        }

        return (
            <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                <Appbar.Content
                    title={(
                        <TouchableOpacity onPress={showModal} style={styles.rowContainer}>
                            <View style={styles.appbarAddressContainer}>
                                <Text style={styles.appbarTitle}>{currentAddress?.address || ''}</Text>
                                <Text style={styles.appbarSubtitle}>{currentAddress?.city || ''}</Text>
                            </View>
                            <Icon source="chevron-down" size={20} color="#656565" />
                        </TouchableOpacity>
                    )}
                />
                <Link href="/userProfile" asChild>
                    <Appbar.Action icon="account" color="#404040" />
                </Link>
            </Appbar.Header>
        );
    }, [isLoadingUserData, currentAddress]);

    return (
        <SafeAreaView style={styles.container}>
            {appbar}

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReached={onRefreshProducts}
                onEndReachedThreshold={0.5}
            />

            <Link href="/orderStatusModal" asChild>
                <FAB
                    icon="clock-fast"
                    label="Собираем заказ"
                    color="#404040"
                    style={styles.fabOrderStatus}
                    visible={isOrderStatusVisible}
                />
            </Link>

            <Link href="/orderCartModal" asChild>
                <FAB
                    icon="cart"
                    label={totalSum}
                    color="#FFFFFF"
                    style={styles.fabOrderCart}
                    visible={orderSum > 0}
                />
            </Link>

            <AddressSelect visible={visible} onDismiss={hideModal} />
        </SafeAreaView>
    );
});

export default function Index() {
    return <ProductFeed />;
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: '#FFFFFF',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    appbarAddressContainer: {
        marginRight: 4,
    },
    appbarTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#404040',
    },
    appbarSubtitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    fabOrderStatus: {
        backgroundColor: '#FFFFFF',
        bottom: 40,
        left: 16,
        position: 'absolute',
    },
    fabOrderCart: {
        backgroundColor: '#EC8476',
        bottom: 40,
        right: 16,
        position: 'absolute',
    },
});
