import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation, LayoutChangeEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { cartItemIds, cartItemList, getCartCustomizeOptions, getItemInCart } from '../../redux/features/cart';
import { updateCheckedOptions, updateItemOptionsHelper } from '../helper/CartHelper';
import { AppDispatch } from '../../redux/store';
import { filterDeletedAttributes } from '../helper/ItemHelper';

export function useCustomizeItem(item: any, render: number) {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const CartItemIds = useSelector(cartItemIds);

    const customizeOptionsGet = JSON.parse(JSON.stringify(item?.variants || []));

    const [activeTab, setActiveTab] = useState(1);
    const [textWidths, setTextWidths] = useState<any>({});
    const [customizeTabs, setCustomizeTabs] = useState<any[]>([]);

    const switchTab = useCallback((tab: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(tab);
    }, [setActiveTab]);

    const handleTextLayout = useCallback(
        (event: LayoutChangeEvent, index: number) => {
            const { width } = event.nativeEvent.layout;
            setTextWidths((prevWidths: any) => ({
                ...prevWidths,
                [index]: width,
            }));
        },
        [setTextWidths] // Dependency array
    );

    const clickOptionHandler = useCallback(
        (optionIndex: number) => {
            setCustomizeTabs((prevTabs: any[]) =>
                prevTabs.map((tab, i) => {
                    if (i !== activeTab - 1) return tab;
                    const updatedOptions = tab.variantAttributes.map((option: { checked: any; }, index: number) => ({
                        ...option,
                        checked: index === optionIndex ? !option.checked : tab.isMultiple ? option.checked : false,
                    }));

                    return { ...tab, variantAttributes: updatedOptions };
                })
            );
        },
        [activeTab, setCustomizeTabs]
    );

    useEffect(() => {
        if (item?.id && render > 0) {
            const cartCustomizeOptions = getCartCustomizeOptions(item?.id, CartItemList);

            updateCheckedOptions(customizeOptionsGet, cartCustomizeOptions);
            setCustomizeTabs(filterDeletedAttributes(customizeOptionsGet));
        }
    }, [item?.id, render])

    useEffect(() => {
        if (render > 0) {
            const status = getItemInCart(item?.id, CartItemIds);

            if (status) {
                updateItemOptionsHelper(item?.id, customizeTabs, dispatch);
            }
        }
    }, [item?.id, customizeTabs, render]);

    return { activeTab, textWidths, customizeTabs, switchTab, handleTextLayout, clickOptionHandler };
}