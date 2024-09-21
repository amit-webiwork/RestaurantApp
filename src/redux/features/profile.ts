import { createSlice } from '@reduxjs/toolkit'

const profileDefault = {
    details: {
        fname: "",
        lname: ""
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: profileDefault,
    reducers: {
        setProflieDetails: (state, action) => {
            state.details = action?.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const { setProflieDetails } = profileSlice.actions

export const proflieDetails = (state: { profile: { details: any } }) => state.profile.details;

export default profileSlice.reducer