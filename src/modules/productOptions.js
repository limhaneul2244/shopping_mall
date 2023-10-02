import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  optionName: '',
};

//상품 옵션
export const productOptionsSlice = createSlice({
  name: 'productOptions', //슬라이스 이름
  initialState,
  reducers: {
    setOptionName: (state, action) => {
      state.optionName = action.payload;
    },
  },
})

export const { setOptionName } = productOptionsSlice.actions;
export default productOptionsSlice.reducer;