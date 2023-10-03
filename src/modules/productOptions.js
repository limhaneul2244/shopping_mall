import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  optionName: '', //상품옵션이름
  additionalFee: 0, //추가요금
};

//상품 옵션
export const productOptionsSlice = createSlice({
  name: 'productOptions', //슬라이스 이름
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    setOptionName: (state, action) => {
      state.optionName = action.payload;
    },
    setAdditionalFee: (state, action) => {
      state.additionalFee = action.payload;
    }
  },
})

export const { setOptionName, setAdditionalFee, init } = productOptionsSlice.actions;
export default productOptionsSlice.reducer;