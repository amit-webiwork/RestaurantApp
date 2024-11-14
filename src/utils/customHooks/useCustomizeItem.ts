import { useCallback, useEffect, useState } from 'react';
import { LayoutAnimation, LayoutChangeEvent } from 'react-native';
import { customizeOptions } from '../MockData';
import { cartItemIds, cartItemList, getCartCustomizeOptions, getItemInCart } from '../../redux/features/cart';
import { useDispatch, useSelector } from 'react-redux';
import { updateCheckedOptions, updateItemOptionsHelper } from '../helper/CartHelper';
import { AppDispatch } from '../../redux/store';

export function useCustomizeItem(itemId: number, render: number) {
    const dispatch: AppDispatch = useDispatch();

    const CartItemList = useSelector(cartItemList);
    const CartItemIds = useSelector(cartItemIds);

    const customizeOptionsGet = JSON.parse(JSON.stringify(customizeOptions));

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

                    const updatedOptions = tab.options.map((option: { checked: any; }, index: number) => ({
                        ...option,
                        checked: index === optionIndex ? !option.checked : tab.multiple ? option.checked : false,
                    }));

                    return { ...tab, options: updatedOptions };
                })
            );
        },
        [activeTab, setCustomizeTabs]
    );

    useEffect(() => {
        if (itemId && render > 0) {
            const cartCustomizeOptions = getCartCustomizeOptions(itemId, CartItemList);

            updateCheckedOptions(customizeOptionsGet, cartCustomizeOptions);
            setCustomizeTabs(customizeOptionsGet);
        }
    }, [itemId, render])

    useEffect(() => {
        if (render > 0) {
            const status = getItemInCart(itemId, CartItemIds);

            if (status) {
                updateItemOptionsHelper(itemId, customizeTabs, dispatch);
            }
        }
    }, [itemId, customizeTabs, render]);

    return { activeTab, textWidths, customizeTabs, switchTab, handleTextLayout, clickOptionHandler };
}