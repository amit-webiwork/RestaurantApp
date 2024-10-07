import { setItems } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"

export const addToCart = (item: ItemDetails, qty: number, dispatch: AppDispatch, actionType = 'update') => {
    const { name, imgUrl, id, price, finalPrice, discountPrice, itemPrice, discountPercent } = item;

    const itemDetails = { data: { name, imgUrl, itemId: id, price, qty, finalPrice, discountPrice, itemPrice, discountPercent }, actionType: actionType };

    if (itemDetails.data?.itemId) {
        dispatch(setItems(itemDetails));
    }
}