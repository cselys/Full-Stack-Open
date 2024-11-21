import { createSlice } from '@reduxjs/toolkit'
import users from '../services/users'

const userblogSlice = createSlice ({
    name: 'userblog',
    initialState:  {
        data: [], 
        loading: false,
        error: null,
      },
    reducers: {
        filluserblog(state, action) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading(state) {
            state.loading = true;
            state.error = null; 
          },
          setError(state, action) {
            state.loading = false;
            state.error = action.payload;
          }          
    },
})

export const { filluserblog, setLoading, setError} = userblogSlice.actions

export const getUserblog = () => {
    return async (dispatch)  => {
        dispatch(setLoading());
        try{
            const userblogs = await users.getUsers()
            dispatch(filluserblog( userblogs ))
        }catch (error) {
            dispatch(setError(error.message || 'Failed to load user blogs'))
          }
    }
}

export default userblogSlice.reducer