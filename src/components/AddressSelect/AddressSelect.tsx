import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, Modal, Portal } from 'react-native-paper';

import { observer } from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';

import { AddressCell } from './AddressCell';

type Props = {
    visible: boolean;
    onDismiss: () => void;
};

export const AddressSelect = observer(function AddressSelect({ visible, onDismiss }: Props) {
    const { addresses } = userService;

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onDismiss}
                contentContainerStyle={styles.modalContainer}
            >
                <FlatList
                    data={addresses}
                    renderItem={({ item }) => <AddressCell {...item} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={<Divider />}
                    ListHeaderComponent={() => (
                        <Text style={styles.headerTitle}>Выберите адрес</Text>
                    )}
                    ListFooterComponent={() => (
                        <View style={styles.buttonContainer}>
                            <Button
                                mode="contained"
                                buttonColor="#EB786E"
                                onPress={onDismiss}
                            >
                                <Text style={styles.buttonTitle}>
                                    Готово
                                </Text>
                            </Button>
                        </View>
                    )}
                />
            </Modal>
        </Portal>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 700,
        color: '#404040',
        marginBottom: 24,
    },
    divider: {
        marginHorizontal: 16,
    },
    buttonContainer: {
        marginTop: 24,
    },
    buttonTitle: {
        fontSize: 14,
        fontWeight: 700,
        color: '#FFFFFF',
    },
});
