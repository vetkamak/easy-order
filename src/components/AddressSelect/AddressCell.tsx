import { useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { observer } from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';

import type { Address } from '@/src/models';

export const AddressCell = observer(function AddressCell(address: Address) {
    const { onSelectAddress } = userService;

    const onSelect = useCallback(() => {
        onSelectAddress(address);
    }, [address, onSelectAddress]);

    return (
        <View style={styles.cell}>
            <RadioButton
                value={address}
                status={address.isSelected ? 'checked' : 'unchecked'}
                color="#EB786E"
                uncheckedColor="blue"
                onPress={onSelect}
            />
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{address.address}</Text>
                <Text style={styles.city}>{address.city}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    addressContainer: {
        marginLeft: 8,
    },
    address: {
        fontSize: 14,
        fontWeight: 600,
        color: '#5A5A5A',
    },
    city: {
        fontSize: 12,
        fontWeight: 600,
        color: '#A5A5A5',
    },
});
