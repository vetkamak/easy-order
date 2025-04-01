import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Appbar, Button, Dialog, Divider, Icon, Switch } from 'react-native-paper';
import { Link } from 'expo-router';

import { observer} from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';
import { orderService } from '@/src/services/OrderService';

import { MIN_ORDER_SUM } from '@/src/constants';

import { CartCell } from '@/src/components';

import type { CartItem } from '@/src/models';

function keyExtractor(item: CartItem) {
    return item.product.id;
}

const ListHeaderComponent = observer(function ListHeaderComponent() {
    const { orderComment, leaveAtTheDoor, toggleLeaveAtTheDoor } = orderService;

    return (
        <>
            <Divider style={styles.divider} />
            <Link href="/comment" asChild>
                <TouchableOpacity>
                    <View style={[styles.optionContainer, styles.rowSpaceBetween]}>
                        <View>
                            <Text style={styles.optionTitle}>Комментарий</Text>
                            {orderComment ? (
                                <Text style={styles.optionNote}>{orderComment}</Text>
                            ) : null}
                        </View>
                        <Icon source="chevron-right" size={20} color="#E0E0E0" />
                    </View>
                </TouchableOpacity>
            </Link>
            <Divider style={styles.divider} />
            <View style={styles.optionContainer}>
                <View style={styles.rowSpaceBetween}>
                    <Text style={styles.optionTitle}>Оставить у двери</Text>
                    <Switch
                        color="#EB786E"
                        value={leaveAtTheDoor}
                        onValueChange={toggleLeaveAtTheDoor}
                    />
                </View>
            </View>
            <View style={[styles.emptyView, styles.lightBackground]} />
        </>
    );
});

const ListFooterComponent = observer(function ListFooterComponent() {
    const { getCardNumberHidden, currentCard } = userService;
    const { isOrderValid, orderSum, isSendingOrder, onSendOrder } = orderService;

    const totalSum = useMemo(() => {
        return `${orderSum} ₽`;
    }, [orderSum]);

    const buttonTitle = useMemo(() => {
        if (isOrderValid) {
            return (
                <View style={styles.buttonTitleContainer}>
                    {isSendingOrder ? (
                        <ActivityIndicator color="#EB786E" size="small" />
                    ) : (
                        <Text style={styles.buttonTitle}>
                            Оплатить
                        </Text>
                    )}
                </View>
            );
        }

        return (
            <View style={styles.buttonTitleContainer}>
                <Text style={[styles.buttonTitle, styles.buttonTitleDisabled]}>
                    {`Заказ от ${MIN_ORDER_SUM} ₽`}
                </Text>
                <Text style={[styles.buttonTitle, styles.buttonTitleDisabled]}>
                    {`Не хватает еще ${MIN_ORDER_SUM - orderSum} ₽`}
                </Text>
            </View>
        );
    }, [isOrderValid, totalSum, isSendingOrder]);

    return (
        <View>
            <View style={[styles.emptyView, styles.lightBackground]} />
            <Divider style={styles.divider} />
            <Link href="/cards" asChild>
                <TouchableOpacity>
                    <View style={[styles.optionContainer, styles.rowSpaceBetween, styles.lightBackground]}>
                        <Text style={styles.optionTitle}>
                            {`Оплата картой ${getCardNumberHidden(currentCard)}`}
                        </Text>
                        <Icon source="chevron-right" size={20} color="#E0E0E0" />
                    </View>
                </TouchableOpacity>
            </Link>
            <Divider style={styles.divider} />
            <View style={[styles.emptyView, styles.lightBackground]} />
            <View style={[styles.emptyView, styles.lightBackground]} />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Итого</Text>
                <Text style={styles.totalSum}>{totalSum}</Text>
            </View>
            <View style={{ marginHorizontal: 32 }}>
                <Button
                    mode="contained"
                    buttonColor="#EB786E"
                    disabled={!isOrderValid || isSendingOrder}
                    onPress={onSendOrder}
                >
                    {buttonTitle}
                </Button>
            </View>
        </View>
    );
});

const OrderCart = observer(function OrderCart() {
    const { currentAddress } = userService;
    const { cartItemsList, isErrorVisible, setErrorVisible } = orderService;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                <Appbar.Content
                    title={(
                        <Text style={styles.appbarTitle}>{currentAddress?.address || ''}</Text>
                    )}
                />
            </Appbar.Header>

            <FlatList
                data={cartItemsList}
                renderItem={({ item }) => <CartCell {...item} />}
                keyExtractor={keyExtractor}
                ListHeaderComponent={ListHeaderComponent}
                ListFooterComponent={ListFooterComponent}
            />

            <Dialog
                visible={isErrorVisible}
                onDismiss={() => setErrorVisible(false)}
                style={styles.errorDialogContainer}
            >
                <Dialog.Content style={styles.errorDialogContentContainer}>
                    <Text style={styles.errorDialogText}>Недостаточно средств.</Text>
                    <Text style={styles.errorDialogText}>Пополните карту или выберите другую</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        mode="contained"
                        buttonColor="#EB786E"
                        onPress={() => setErrorVisible(false)}
                    >
                        <View style={styles.errorDialogButtonTitleContainer}>
                            <Text style={styles.errorDialogButtonTitle}>
                                Хорошо
                            </Text>
                        </View>
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </SafeAreaView>
    );
});

export default function OrderCartModal() {
    return <OrderCart />;
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: '#F7F7F7',
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
    optionContainer: {
        padding: 16,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#5A5A5A'
    },
    optionNote: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
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
    buttonTitleContainer: {
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: '#FFFFFF',
    },
    buttonTitleDisabled: {
        color: '#5A5A5A',
    },
    divider: {
        marginHorizontal: 16,
    },
    lightBackground: {
        backgroundColor: '#FFFFFF',
    },
    emptyView: {
        flex: 1,
        height: 24,
    },
    errorDialogContainer: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorDialogContentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorDialogText: {
        fontSize: 14,
        fontWeight: 600,
        color: '#5A5A5A',
    },
    errorDialogButtonTitleContainer: {
        paddingHorizontal: 16,
    },
    errorDialogButtonTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: '#FFFFFF',
    },
});

