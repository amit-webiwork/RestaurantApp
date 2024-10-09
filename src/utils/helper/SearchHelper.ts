import { setRecentSearchItems } from "../../redux/features/items";
import { AppDispatch } from "../../redux/store";
import { loadStorage } from "../Storage";

export const setInRecentSearchState = async (dispatch: AppDispatch) => {
    const searchItems = await loadStorage("recentSearchItems");

    if (searchItems.length && searchItems.length > 0) {
        dispatch(setRecentSearchItems(searchItems));
    }
}