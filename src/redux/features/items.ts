import { createSlice, createSelector } from '@reduxjs/toolkit'
import { getCategoryList, getCuisineList, getDietaryList, getItemList, getPriceRange, getTopicList } from '../../utils/ApiCall';
import { AppDispatch } from '../store';
import { saveStorage } from '../../utils/Storage';

interface FiltersState {
    categories: any[],
    categoryLoaded: boolean;
    items: any[],
    itemLoaded: boolean;
    topics: any[],
    topicLoaded: boolean;
    papularItems: any[],
    papularItemLoaded: boolean;
    dietaries: any[],
    dietaryLoaded: boolean;
    cuisine: any[],
    cuisineLoaded: boolean;
    filters: {
        "cuisine": number[];
        "dietaries": number[];
        "popularItems": number[];
    };
    priceRange: {
        "minValue": number;
        "maxValue": number;
    };
    priceRangeLoaded: boolean;
    priceRangeFilter: { "minValue": number, "maxValue": number };
    recentSearchItems: ItemDetails[]
}

const initialState: FiltersState = {
    categories: [],
    categoryLoaded: false,
    items: [],
    itemLoaded: false,
    topics: [],
    topicLoaded: false,
    papularItems: [],
    papularItemLoaded: false,
    dietaries: [],
    dietaryLoaded: false,
    cuisine: [],
    cuisineLoaded: false,
    filters: { "cuisine": [], "dietaries": [], "popularItems": [] },
    priceRange: { "minValue": 0, "maxValue": 0 },
    priceRangeLoaded: false,
    priceRangeFilter: { "minValue": 0, "maxValue": 0 },
    recentSearchItems: []
}

export const itemSlice = createSlice({
    name: 'items',
    initialState: initialState,
    reducers: {
        setCategoryList: (state, action) => {
            state.categories = action?.payload
            state.categoryLoaded = true
        },
        setItemList: (state, action) => {
            state.items = action?.payload?.data || []
            state.itemLoaded = true
        },
        setTopicList: (state, action) => {
            state.topics = action?.payload || []
            state.topicLoaded = true
        },
        setPapularItemList: (state, action) => {
            state.papularItems = action?.payload?.data || []
            state.papularItemLoaded = true
        },
        setDietaryList: (state, action) => {
            state.dietaries = action?.payload || []
            state.dietaryLoaded = true
        },
        setCuisineList: (state, action) => {
            state.cuisine = action?.payload || []
            state.cuisineLoaded = true
        },
        setFilters: (state, action) => {
            const { key, data }: { key: keyof FiltersState['filters'], data: number[] } = action.payload;

            state.filters = {
                ...state.filters,
                [key]: data
            };
        },
        removeFilter: (state, action) => {
            const { key, data }: { key: keyof FiltersState['filters'], data: number } = action.payload;

            state.filters = {
                ...state.filters,
                [key]: state.filters[key].filter((d) => d !== data)
            };
        },
        resetFilter: (state) => {
            state.filters = { "dietaries": [], "cuisine": [], "popularItems": [] }
            state.priceRangeFilter = { "minValue": 0, "maxValue": 0 }
        },
        setPriceRange: (state, action) => {
            state.priceRange = {
                "minValue": +action?.payload?.minValue || 0,
                "maxValue": +action?.payload?.maxValue || 0
            }
            state.priceRangeLoaded = true
        },
        setPriceRangeFilter: (state, action) => {
            state.priceRangeFilter = { "minValue": action.payload.minValue, "maxValue": action.payload.maxValue };
        },
        removeFromRangeFilter: (state) => {
            state.priceRangeFilter = { "minValue": 0, "maxValue": 0 }
        },
        setRecentSearchItems: (state, action) => {
            state.recentSearchItems = (action?.payload || []).splice(0, 5)
            saveStorage(state.recentSearchItems, "recentSearchItems");
        },
        mergeRecentSearchItems: (state, action) => {
            const existingItemIndex = state.recentSearchItems.findIndex(item => item.id === action.payload.id);

            if (existingItemIndex === -1) {
                // If the item doesn't exist, add it to the array
                state.recentSearchItems.push(action.payload);

                // Keep the most recent 5 items
                state.recentSearchItems = state.recentSearchItems.slice(-5);

                // Save the updated list to storage
                saveStorage(state.recentSearchItems, "recentSearchItems");
            }
        },
        removeRecentSearchItems: (state, action) => {
            state.recentSearchItems = state.recentSearchItems.filter(d => d.id !== action.payload)
            saveStorage(state.recentSearchItems, "recentSearchItems");
        }
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

export const fetchPopularItems = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getItemList({ popular: 1 });
        dispatch(setPapularItemList(data));
    } catch (err) {
        console.log(err);
    }
};

export const fetchTopics = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getTopicList();
        dispatch(setTopicList(data));
    } catch (err) {
        console.log(err);
    }
};

export const fetchDietaries = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getDietaryList();
        dispatch(setDietaryList(data?.data || []));
    } catch (err) {
        console.log(err);
    }
};

export const fetchCuisine = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getCuisineList();
        dispatch(setCuisineList(data?.data || []));
    } catch (err) {
        console.log(err);
    }
};

export const fetchPriceRange = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getPriceRange();
        dispatch(setPriceRange(data));
    } catch (err) {
        console.log(err);
    }
};

export const getAppliedFilterArray = createSelector(
    [
        (state: { items: FiltersState }) => state.items.filters,
        (state: { items: FiltersState }) => state.items.cuisine,
        (state: { items: FiltersState }) => state.items.dietaries,
        (state: { items: FiltersState }) => state.items.papularItems
    ],
    (filters, cuisine, dietaries, papularItems) => {

        const out: any[] = [];

        Object.keys(filters).forEach(function (key, index) {
            if (key === 'cuisine') {
                out.push(filters[key].map((d) => { return { id: d, type: "cuisine", name: cuisine.find((k) => k.id === d)?.name || "" } }))
            } else if (key === 'dietaries') {
                out.push(filters[key].map((d) => { return { id: d, type: "dietaries", name: dietaries.find((k) => k.id === d)?.name || "" } }))
            } else if (key === 'popularItems') {
                out.push(filters[key].map((d) => { return { id: d, type: "popularItems", name: papularItems.find((k) => k.id === d)?.name || "" } }))
            }
        })
        return out.flat();
    }
)

export const { setCategoryList, setItemList, setTopicList, setPapularItemList, setDietaryList, setFilters, setCuisineList, removeFilter, resetFilter, setPriceRange, setPriceRangeFilter, removeFromRangeFilter, setRecentSearchItems, mergeRecentSearchItems, removeRecentSearchItems } = itemSlice.actions

export const categoryList = (state: { items: FiltersState }) => state.items.categories;
export const categoryLoaded = (state: { items: FiltersState }) => state.items.categoryLoaded;

export const itemList = (state: { items: FiltersState }) => state.items.items;
export const itemLoaded = (state: { items: FiltersState }) => state.items.itemLoaded;

export const papularItems = (state: { items: FiltersState }) => state.items.papularItems;
export const papularItemLoaded = (state: { items: FiltersState }) => state.items.papularItemLoaded;

export const topicList = (state: { items: FiltersState }) => state.items.topics;
export const topicLoaded = (state: { items: FiltersState }) => state.items.topicLoaded;

export const getFeaturedCategory = (state: { items: FiltersState }) => state.items.categories.find((d: { isFeatured: boolean; }) => d?.isFeatured === true);

export const dietaryList = (state: { items: FiltersState }) => state.items.dietaries;
export const dietaryLoaded = (state: { items: FiltersState }) => state.items.dietaryLoaded;

export const cuisineList = (state: { items: FiltersState }) => state.items.cuisine;
export const cuisineLoaded = (state: { items: FiltersState }) => state.items.cuisineLoaded;

export const getFilters = (state: { items: FiltersState }) => state.items.filters;

export const priceRange = (state: { items: FiltersState }) => state.items.priceRange;
export const priceRangeLoaded = (state: { items: FiltersState }) => state.items.priceRangeLoaded;

export const priceRangeFilter = (state: { items: FiltersState }) => state.items.priceRangeFilter;

export const getRecentSearchItems = (state: { items: FiltersState }) => state.items.recentSearchItems;

export default itemSlice.reducer;