import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function NotificationScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <>
            <View style={{ flex: 1 }}>
                <Text>NOTIFICATION SCREEN</Text>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
});

export default NotificationScreen;