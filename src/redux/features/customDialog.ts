import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
    visible: false,
    title: "",
    message: ""
}

export const dialogSlice = createSlice({
    name: 'customDialog',
    initialState: defaultState,
    reducers: {
        hideDialog: (state) => {
            state.visible = false
            state.title = ""
            state.message = ""
        },
        setDialogContent: (state, action) => {
            state.visible = true
            state.title = action?.payload?.title
            state.message = action?.payload?.message
        }
    },
})


// Action creators are generated for each case reducer function
export const { setDialogContent, hideDialog } = dialogSlice.actions

export const dialogData = (state: { customDialog: any }) => state.customDialog;

export default dialogSlice.reducer