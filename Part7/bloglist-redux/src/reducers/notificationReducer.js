import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }, 
        notificationRemove() {
            return ''
        }           
    },
})

export const {notificationChange, notificationRemove} = notificationSlice.actions
export const setNotification = (message, miliseconds) => {
    return dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationRemove())           
        }, miliseconds*1000)
    }
}
export default notificationSlice.reducer
