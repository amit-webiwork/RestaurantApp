import React, { ReactNode } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

import { COLORS } from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { dialogData, hideDialog } from '../../redux/features/customDialog';
import CustomActionDialogComp from '../dialogs/CustomActionDialog';
import CartNotificationBarSection from './CartNotificationBar';
import { cartItemList, itemAdded } from '../../redux/features/cart';

interface LayoutProps {
    children: ReactNode;
}

const CartLayout: React.FC<LayoutProps> = ({
    children
}) => {
    const ItemAdded = useSelector(itemAdded);

    return (
        <>
            <View>
                {children}

                {/* Cart Notification bar */}
                <CartNotificationBarSection isVisible={ItemAdded} />
            </View>
        </>
    );
};

export default CartLayout;

const styles = StyleSheet.create({
});
