import { useCallback } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Button, Divider, RadioButton } from 'react-native-paper';
import { Link } from 'expo-router';
import { observer} from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';

import type { Card } from '@/src/models';

const CardCell = observer(function CardCell(card: Card) {
    const { getCardNumberHidden, onSelectCard } = userService;

    const onSelect = useCallback(() => {
        onSelectCard(card);
    }, [card, onSelectCard]);

    return (
        <View style={styles.cell}>
            <Text style={styles.card}>{`Картой ${getCardNumberHidden(card)}`}</Text>
            <RadioButton
                value={card.number}
                status={card.isSelected ? 'checked' : 'unchecked'}
                color="#EC8476"
                uncheckedColor="#A5A5A5"
                onPress={onSelect}
            />
        </View>
    );
});

const CardSelect = observer(function CardsSelect() {
    const { cards } = userService;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                <Appbar.Content
                    title={(
                        <Text style={styles.appbarTitle}>Оплата</Text>
                    )}
                />
                {Platform.OS === 'android' ? (
                    <Link href="../" asChild>
                        <Appbar.Action icon="close" color="#404040" />
                    </Link>
                ) : null}
            </Appbar.Header>

            <FlatList
                data={cards}
                renderItem={({ item }) => <CardCell {...item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                ListFooterComponent={() => (
                    <View style={styles.buttonContainer}>
                        <Link href={'../'} asChild>
                            <Button
                                mode="contained"
                                buttonColor="#EC8476"
                            >
                                <Text style={styles.buttonTitle}>
                                    Готово
                                </Text>
                            </Button>
                        </Link>
                    </View>
                )}
            />
        </SafeAreaView>
    );
});

export default function Cards() {
    return <CardSelect />;
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
    cell: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    card: {
        fontSize: 14,
        fontWeight: 600,
        color: '#404040',
    },
    divider: {
        marginHorizontal: 16,
    },
    buttonContainer: {
        marginTop: 24,
        marginHorizontal: 16,
    },
    buttonTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: '#FFFFFF',
    },
});

