import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: 'initial notification',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }, 
        notificationRemove(state, action) {
            return ''
        }           
    },
})

export const {notificationChange, notificationRemove} = notificationSlice.actions
export const setNotification = (message, mseconds) => {
    return dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => {
            dispatch(notificationRemove())           
        }, mseconds * 1000);
    }
}
export default notificationSlice.reducer