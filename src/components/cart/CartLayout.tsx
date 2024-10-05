import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CartNotificationBarSection from './CartNotificationBar';
import { itemAdded } from '../../redux/features/cart';

interface LayoutProps {
    navigation: any;
    children: ReactNode;
}

const CartLayout: React.FC<LayoutProps> = ({
    navigation,
    children
}) => {
    const ItemAdded = useSelector(itemAdded);

    return (
        <>
            <View>
                {children}

                {/* Cart Notification bar */}
                <CartNotificationBarSection isVisible={ItemAdded} navigation={navigation} />
            </View>
        </>
    );
};

export default CartLayout;

const styles = StyleSheet.create({
});
