import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { cartItemIds, cartItemList, getCartSize, getItemInCart } from '../../redux/features/cart';
import { updateCheckedSize, updateItemSizeHelper } from '../helper/CartHelper';
import { AppDispatch } from '../../redux/store';
import { filterDeletedAndInactiveSizes } from '../helper/ItemHelper';

export function useItemSizes(item: any, render: number) {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const CartItemIds = useSelector(cartItemIds);

    const sizeOptions = JSON.parse(JSON.stringify(item?.itemSizes || []));

    const sortedData = sizeOptions?.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id) || [];

    const sizeOptionsGet = JSON.parse(JSON.stringify(sortedData));

    const [activeTab, setActiveTab] = useState(0);
    const [sizeTab, setSizeTab] = useState<any[]>([]);
    const [selectedSizePrice, setSelectedSizePrice] = useState<any>({ enable: false, price: 0 });

    const switchTab = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(0);
    }, [setActiveTab]);

    const clickSizeHandler = useCallback(
        (optionIndex: number) => {
            setSizeTab((prevTabs: any[]) =>
                prevTabs.map((tab, i) => {
                    return { ...tab, checked: i === optionIndex ? !tab.checked : false };
                })
            );
        },
        [setSizeTab]
    );

    useEffect(() => {
        if (item?.id && render > 0) {
            const cartSizeOptions = getCartSize(item?.id, CartItemList);

            updateCheckedSize(sizeOptionsGet, cartSizeOptions);
            setSizeTab(filterDeletedAndInactiveSizes(sizeOptionsGet));
        }
    }, [item?.id, render])

    useEffect(() => {
        if (render > 0) {
            const status = getItemInCart(item?.id, CartItemIds);

            if (status) {
                updateItemSizeHelper(item, sizeTab, dispatch);
            }
            setSelectedSizePrice({ enable: sizeTab?.find(d => d.checked), price: sizeTab?.find(d => d.checked)?.finalPrice || 0 });
        }
    }, [item?.id, sizeTab, render]);

    return { activeTab, sizeTab, switchTab, clickSizeHandler, selectedSizePrice };
}