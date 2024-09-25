import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function OrderScreen({ navigation }: { navigation: any }): React.JSX.Element {
    return (
        <>
            <View style={{ flex: 1 }}>
                <Text>ORDER SCREEN</Text>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
});

export default OrderScreen;