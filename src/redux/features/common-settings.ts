import { createSlice, createSelector } from '@reduxjs/toolkit'
import { getCategoryList, getCommonSettingList, getCuisineList, getDietaryList, getItemList, getPriceRange, getTopicList } from '../../utils/ApiCall';
import { AppDispatch } from '../store';
import { saveStorage } from '../../utils/Storage';

interface InitialState {
    settings: any[],
    settingLoaded: boolean;
}

const initialState: InitialState = {
    settings: [],
    settingLoaded: false
}

export const commonSettingsSlice = createSlice({
    name: 'commonsettings',
    initialState: initialState,
    reducers: {
        setCommonSettingData: (state, action) => {
            state.settings = action?.payload
            state.settingLoaded = true
        }
    },
})

export const fetchCommonSettingData = () => async (dispatch: AppDispatch) => {
    try {
        const data = await getCommonSettingList();
        dispatch(setCommonSettingData(data?.data || []));
    } catch (err) {
        console.log(err);
    }
};

export const commonSettingData = (state: { commonsettings: InitialState }) => state.commonsettings.settings;
export const commonSettingLoaded = (state: { commonsettings: InitialState }) => state.commonsettings.settingLoaded;

export const {
    setCommonSettingData
} = commonSettingsSlice.actions

export default commonSettingsSlice.reducer;