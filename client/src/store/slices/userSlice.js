import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'


export const fetchUser = createAsyncThunk(
    'user/auth',
    async () => {
        const response = await fetch('/user')
        return await response.json()
    }
)

const initialState = {
    
    email: "",
    isAdmin: false,
    isLogged: false
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                email: action.payload.user.email,
                isAdmin: action.payload.user.isAdmin,
                isLogged: true
            }
        },
        deleteUser: (state, action) => {
            return{
                ...initialState
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return {
                ...state
            }
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            return {
                ...state,
                error: {message: "an error occured", status: 500}
            }
        })
    },
})


export const {addUser, deleteUser} = userSlice.actions

export default userSlice.reducer