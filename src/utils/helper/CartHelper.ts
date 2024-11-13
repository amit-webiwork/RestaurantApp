import { recoverCart, setCartLoading, setItems, updateItemOptions } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"
import { loadStorage } from "../Storage";

export const addToCart = (item: ItemDetails, qty: number, dispatch: AppDispatch, actionType = 'update', notify = true, customizeOptions: null | any[] = null) => {

    let options: any[] = customizeOptions && Array.isArray(customizeOptions) ? customizeOptions : [];

    options = options?.map(variant => {
        const checkedOptions = variant.options.filter((option: { checked: any; }) => option.checked);
        return checkedOptions.length > 0 ? { ...variant, options: checkedOptions } : null;
    }).filter(Boolean);

    const { name, imgUrl, id, price, finalPrice, discountPrice, itemPrice, discountPercent } = item;

    const itemDetails = { data: { name, imgUrl, itemId: id, price, qty, finalPrice, discountPrice, itemPrice, discountPercent, options }, actionType: actionType, notify };

    dispatch(setCartLoading(true));

    if (itemDetails.data?.itemId) {
        dispatch(setItems(itemDetails));
    }

    setTimeout(() => {
        dispatch(setCartLoading(false));
    }, 1000);
}

export const updateItemOptionsHelper = (itemId: number, customizeOptions: any[], dispatch: AppDispatch) => {

    let options: any[] = customizeOptions && Array.isArray(customizeOptions) ? customizeOptions : [];

    options = options?.map(variant => {
        const checkedOptions = variant.options.filter((option: { checked: any; }) => option.checked);
        return checkedOptions.length > 0 ? { ...variant, options: checkedOptions } : null;
    }).filter(Boolean);

    const optionSet = { data: options, itemId };
    dispatch(updateItemOptions(optionSet));
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
        const mainVariant = mainOptions.find(v => v.variantId === newVariant.variantId);
        if (mainVariant) {
            newVariant.options.forEach((newOption: { id: any; checked: any; }) => {
                const mainOption = mainVariant.options.find((opt: { id: any; }) => opt.id === newOption.id);
                if (mainOption) {
                    mainOption.checked = newOption.checked;
                }
            });
        }
    });
}