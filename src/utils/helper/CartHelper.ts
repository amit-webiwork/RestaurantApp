import { recoverCart, setCartLoading, setItems, updateItemOptions, updateItemPrice, updateItemSize } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"
import { loadStorage } from "../Storage";
import { getItemPriceComponents } from "./ItemHelper";

export const addToCart = (item: ItemDetails, qty: number, dispatch: AppDispatch, actionType = 'update', notify = true, customizeOptions: null | any[] = null, sizeOption: null | any[] = null) => {

    // code for customizeOptions
    let options: any[] = customizeOptions && Array.isArray(customizeOptions) ? customizeOptions : [];

    options = options?.map(variant => {
        const checkedOptions = variant.variantAttributes.filter((option: { checked: any; }) => option.checked);
        return checkedOptions.length > 0 ? { ...variant, variantAttributes: checkedOptions } : null;
    }).filter(Boolean);

    // code for size options
    let size: any[] = sizeOption && Array.isArray(sizeOption) ? sizeOption : [];

    size = size?.filter(item => item.checked);

    // common code

    const { name, imgUrl, id, price, finalPrice, discountPrice, itemPrice, discountPercent } = item;

    const finalPriceMain = size.length > 0 ? size[0]?.finalPrice || 0 : finalPrice;
    const discountPriceMain = size.length > 0 ? size[0]?.discountPrice || 0 : discountPrice;
    const itemPriceMain = size.length > 0 ? size[0]?.itemPrice || 0 : itemPrice;

    const itemDetails = { data: { name, imgUrl, itemId: id, price, qty, finalPrice: finalPriceMain, discountPrice: discountPriceMain, itemPrice: itemPriceMain, discountPercent, options, size }, actionType: actionType, notify };

    dispatch(setCartLoading(true));

    if (itemDetails.data?.itemId) {
        dispatch(setItems(itemDetails));
    }

    setTimeout(() => {
        dispatch(setCartLoading(false));
    }, 500);
}

export const updateItemOptionsHelper = (itemId: number, customizeOptions: any[], dispatch: AppDispatch) => {

    let options: any[] = customizeOptions && Array.isArray(customizeOptions) ? customizeOptions : [];

    options = options?.map(variant => {
        const checkedOptions = variant.variantAttributes.filter((option: { checked: any; }) => option.checked);
        return checkedOptions.length > 0 ? { ...variant, variantAttributes: checkedOptions } : null;
    }).filter(Boolean);

    const optionSet = { data: options, itemId };
    dispatch(updateItemOptions(optionSet));
}

export const updateItemSizeHelper = (item: ItemDetails, sizeOption: any[], dispatch: AppDispatch) => {
    const itemData = getItemPriceComponents(item);
    const itemId = itemData?.id;

    let options: any[] = sizeOption && Array.isArray(sizeOption) ? sizeOption : [];

    options = options?.filter(item => item.checked);

    const optionSet = { data: options, itemId };
    dispatch(updateItemSize(optionSet));

    if (options.length > 0) {
        const priceSet = {
            data: {
                discountPrice: options[0]?.discountPrice || 0,
                finalPrice: options[0]?.finalPrice || 0,
                itemPrice: options[0]?.itemPrice || 0
            },
            itemId
        };

        dispatch(updateItemPrice(priceSet));
    } else {
        const priceSet = {
            data: {
                discountPrice: itemData?.discountPrice || 0,
                finalPrice: itemData?.finalPrice || 0,
                itemPrice: itemData?.itemPrice || 0,
            },
            itemId
        };

        dispatch(updateItemPrice(priceSet));
    }
}

export const setInCartState = async (dispatch: AppDispatch) => {
    const cartItems = await loadStorage("cartItems");

    if (cartItems.length && cartItems.length > 0) {
        dispatch(recoverCart(cartItems));
    } else {
        dispatch(recoverCart([]));
    }
}

// Function to update checked options in main array
export function updateCheckedOptions(mainOptions: any[], newCheckedOptions: any[]) {
    newCheckedOptions.forEach(newVariant => {
        const mainVariant = mainOptions.find(v => v.customize_option_id === newVariant.customize_option_id);
        if (mainVariant) {
            newVariant.variantAttributes.forEach((newOption: { customize_attribute_id: number; checked: any; }) => {
                const mainOption = mainVariant.variantAttributes.find((opt: { customize_attribute_id: number; }) => opt.customize_attribute_id === newOption.customize_attribute_id);
                if (mainOption) {
                    mainOption.checked = newOption.checked;
                }
            });
        }
    });
}

// Function to update checked size in main array
export function updateCheckedSize(mainOptions: any[], newCheckedOptions: any[]) {
    newCheckedOptions.forEach(newItem => {
        const mainItem = mainOptions.find(v => v.id === newItem.id);
        if (mainItem) {
            mainItem.checked = newItem.checked;
        }
    });
}