import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Divider } from 'react-native-paper';

import { observer} from 'mobx-react-lite';

import { orderService } from '@/src/services/OrderService';

import { OrderCell } from '@/src/components';

import type { CartItem } from '@/src/models';

function keyExtractor(item: CartItem) {
    return item.product.id;
}

const ListHeaderComponent = () => (
    <>
        <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderTitle}>Что в заказе</Text>
        </View>
        <Divider style={styles.divider} />
    </>
);

const ListFooterComponent = observer(function ListFooterComponent() {
    const { createdOrderSum, createdOrderDate, createdOrderAddress, createdOrderComment } = orderService;

    return (
        <View style={styles.listFooterContainer}>
            <Divider style={styles.divider} />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Итого</Text>
                <Text style={styles.totalSum}>{createdOrderSum}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Время заказа</Text>
                <Text style={styles.optionNote}>{createdOrderDate}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.optionContainer}>
                <Text style={styles.optionTitle}>Адрес доставки</Text>
                <Text style={styles.optionNote}>{createdOrderAddress}</Text>
            </View>
            {createdOrderComment ? (
                <>
                    <Divider style={styles.divider} />
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionTitle}>Комментарий</Text>
                        <Text style={styles.optionNote}>{createdOrderComment}</Text>
                    </View>
                </>
            ) : null}
        </View>
    );
});

const OrderStatus = observer(function OrderStatus() {
    const { createdOrderProducts } = orderService;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode="center-aligned" statusBarHeight={0} style={styles.appbar}>
                <Appbar.Content
                    title={(
                        <View style={styles.appbarTitleContainer}>
                            <Text style={styles.appbarTitle}>Приняли заказ.</Text>
                            <Text style={styles.appbarTitle}>Уже собираем</Text>
                        </View>
                    )}
                />
            </Appbar.Header>

            <FlatList
                data={createdOrderProducts}
                renderItem={({ item }) => <OrderCell {...item} />}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={<Divider style={styles.divider} />}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
                showsVerticalScrollIndicator={false}
                style={styles.listContainer}
            />
        </SafeAreaView>
    );
});

export default function OrderStatusModal() {
    return <OrderStatus />;
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: '#F7F7F7',
    },
    appbarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    appbarTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#404040',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listContainer: {
        marginHorizontal: 16,
    },
    listHeaderContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    listHeaderTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: '#404040',
    },
    listFooterContainer: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: 16,
    },
    optionContainer: {
        padding: 16,
    },
    optionTitle: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    optionNote: {
        fontSize: 12,
        fontWeight: 600,
        color: '#5A5A5A',
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    totalText: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    totalSum: {
        fontSize: 32,
        fontWeight: 700,
        color: '#404040',
    },
    divider: {
        marginHorizontal: 16,
    },
});
