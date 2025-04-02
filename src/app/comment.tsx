import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Link } from 'expo-router';

import { observer} from 'mobx-react-lite';

import { orderService } from '@/src/services/OrderService';

const OrderComment = observer(function OrderComment() {
    const { orderComment, setOrderComment } = orderService;

    const [comment, setComment] = useState<string>(orderComment);

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                <Appbar.Content
                    title={(
                        <View>
                            <Text style={styles.appbarTitle}>Комментарий</Text>
                            <Text style={styles.appbarSubtitle}>Что нам учесть при доставке или сборке</Text>
                        </View>
                    )}
                />
                {Platform.OS === 'android' ? (
                    <Link href="../" asChild>
                        <Appbar.Action icon="close" color="#404040" />
                    </Link>
                ) : null}
            </Appbar.Header>

            <TextInput
                autoFocus
                value={comment}
                onChangeText={setComment}
                multiline
                style={{ height: 200 }}
                contentStyle={{ backgroundColor: '#F7F7F7' }}
                underlineStyle={{ borderRadius: 0, borderColor: '#F7F7F7' }}
                selectionColor="#EB786E"
                cursorColor="#EB786E"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                textColor="#5A5A5A"
            />

            <View style={styles.buttonContainer}>
                <Link href={'../'} asChild>
                    <Button
                        mode="contained"
                        buttonColor="#EB786E"
                        onPress={() => setOrderComment(comment)}
                    >
                        <Text style={styles.buttonTitle}>
                            Сохранить
                        </Text>
                    </Button>
                </Link>
            </View>
        </SafeAreaView>
    );
});

export default function Comment() {
    return <OrderComment />;
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
    appbarSubtitle: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
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

