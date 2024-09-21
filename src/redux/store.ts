import { configureStore } from '@reduxjs/toolkit';

import profileSlice from './features/profile';
import dialogSlice from './features/customDialog'

export default configureStore({
    reducer: {
        profile: profileSlice,
        customDialog: dialogSlice,
    }
})