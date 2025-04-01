import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { Link } from 'expo-router';
import { observer} from 'mobx-react-lite';

import { userService } from '@/src/services/UserService';

const UserData = observer(function UserData() {
    const { name, phone } = userService;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header mode="small" statusBarHeight={0} style={styles.appbar}>
                <Link href="../" asChild>
                    <Appbar.Action icon="arrow-left" color="#404040" />
                </Link>
            </Appbar.Header>
            <View style={styles.contentContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.phone}>{phone}</Text>
            </View>
        </SafeAreaView>
    );
});

export default function UserProfile() {
    return <UserData />;
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 700,
        color: '#5A5A5A',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        fontWeight: 700,
        color: '#A5A5A5',
    },
});
