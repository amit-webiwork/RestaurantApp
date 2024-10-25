import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
    visible: false,
    title: "",
    message: "",
    buttonAction: false,
    buttonText2: "",
    onAction: ""
}

export const dialogSlice = createSlice({
    name: 'customDialog',
    initialState: defaultState,
    reducers: {
        hideDialog: (state) => {
            state.visible = false
            state.title = ""
            state.message = ""
            state.buttonAction = false
            state.buttonText2 = ""
            state.onAction = ""
        },
        setDialogContent: (state, action) => {
            state.visible = true
            state.title = action?.payload?.title
            state.message = action?.payload?.message
            state.buttonAction = action?.payload?.buttonAction || false
            state.buttonText2 = action?.payload?.buttonText2 || ""
            state.onAction = action?.payload?.onAction || ""
        }
    },
})


// Action creators are generated for each case reducer function
export const { setDialogContent, hideDialog } = dialogSlice.actions

export const dialogData = (state: { customDialog: any }) => state.customDialog;

export default dialogSlice.reducer