import { recoverCart, setCartLoading, setItems, updateItemOptions, updateItemSize } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"
import { loadStorage } from "../Storage";

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

    const itemDetails = { data: { name, imgUrl, itemId: id, price, qty, finalPrice, discountPrice, itemPrice, discountPercent, options, size }, actionType: actionType, notify };

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

export const updateItemSizeHelper = (itemId: number, sizeOption: any[], dispatch: AppDispatch) => {

    let options: any[] = sizeOption && Array.isArray(sizeOption) ? sizeOption : [];

    options = options?.filter(item => item.checked);

    const optionSet = { data: options, itemId };
    dispatch(updateItemSize(optionSet));
}

export const setInCartState = async (dispatch: AppDispatch) => {
    const cartItems = await loadStorage("cartItems");

    if (cartItems.length && cartItems.length > 0) {
        dispatch(recoverCart(cartItems));
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