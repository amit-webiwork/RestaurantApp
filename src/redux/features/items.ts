import { createSlice } from '@reduxjs/toolkit'
import { getCategoryList, getItemList } from '../../utils/ApiCall';
import { AppDispatch } from '../store';

const itemDefault = {
    categories: [],
    categoryLoaded: false,
    items: [],
    itemLoaded: false,
    itemCount: 0
}

export const itemSlice = createSlice({
    name: 'items',
    initialState: itemDefault,
    reducers: {
        setCategoryList: (state, action) => {
            state.categories = action?.payload
            state.categoryLoaded = true
        },
        setItemList: (state, action) => {
            state.items = action?.payload?.data || []
            state.itemLoaded = true
            state.itemCount = +action?.payload?.count || 0
        },
    },
})

export const fetchCategories = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getCategoryList();
        dispatch(setCategoryList(data?.data || []));
    } catch (err) {
        console.log(err);
    }
};

export const fetchItems = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getItemList();
        dispatch(setItemList(data));
    } catch (err) {
        console.log(err);
    }
};

export const { setCategoryList, setItemList } = itemSlice.actions

export const categoryList = (state: { items: { categories: any[] } }) => state.items.categories;
export const categoryLoaded = (state: { items: { categoryLoaded: boolean; }; }) => state.items.categoryLoaded;

export const itemList = (state: { items: { items: any[] } }) => state.items.items;
export const itemLoaded = (state: { items: { itemLoaded: boolean; }; }) => state.items.itemLoaded;
export const itemCount = (state: { items: { itemCount: number; }; }) => state.items.itemCount;

export default itemSlice.reducer;