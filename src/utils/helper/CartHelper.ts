import { recoverCart, setCartLoading, setItems } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"
import { loadStorage } from "../Storage";

export const addToCart = (item: ItemDetails, qty: number, dispatch: AppDispatch, actionType = 'update', notify = true) => {
    const { name, imgUrl, id, price, finalPrice, discountPrice, itemPrice, discountPercent } = item;

    const itemDetails = { data: { name, imgUrl, itemId: id, price, qty, finalPrice, discountPrice, itemPrice, discountPercent }, actionType: actionType, notify };

    dispatch(setCartLoading(true));

    if (itemDetails.data?.itemId) {
        dispatch(setItems(itemDetails));
    }

    setTimeout(() => {
        dispatch(setCartLoading(false));
    }, 1000);
}

export const setInCartState = async (dispatch: AppDispatch) => {
    const cartItems = await loadStorage("cartItems");

    if (cartItems.length && cartItems.length > 0) {
        dispatch(recoverCart(cartItems));
    }
}