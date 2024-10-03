import { setItems } from "../../redux/features/cart"
import { AppDispatch } from "../../redux/store"

export const addToCart = (dispatch: AppDispatch) => {
    dispatch(setItems({ id: 1 }))
}