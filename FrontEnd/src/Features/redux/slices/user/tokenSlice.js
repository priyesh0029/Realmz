import { createSlice} from "@reduxjs/toolkit"



  const loadTokenFromLocalStorage = () => {
    try {
      const token = localStorage.getItem('token');
      return token ? token : null;
    } catch (error) {
      console.log('Error loading token from local storage:', error);
      return null;
    }
  };

  const initialState = {
    token: loadTokenFromLocalStorage(),
  };

  const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload;
        try {
          localStorage.setItem('token', action.payload);
        } catch (error) {
          console.log('Error storing token in local storage:', error);
        }
      },
      clearToken: (state) => {
        state.token = null;
        try {
          localStorage.removeItem('token');
        } catch (error) {
          console.log('Error removing token from local storage:', error);
        }
      },
    },
  });
  
  export const { setToken, clearToken } = tokenSlice.actions;
  export default tokenSlice.reducer;
  