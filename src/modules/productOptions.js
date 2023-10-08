import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalNumber: 1, //상품 수량 체크
  optionName: '', //상품옵션이름
  additionalFee: 0, //추가요금
  stockCount: 0, //재고수량
};

//상품 옵션
export const productOptionsSlice = createSlice({
  name: 'productOptions', //슬라이스 이름
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    setTotalNumber: (state, action) => {
      state.totalNumber = action.payload;
    },
    setOptionName: (state, action) => {
      state.optionName = action.payload;
    },
    setAdditionalFee: (state, action) => {
      state.additionalFee = action.payload;
    },
    setStockCount: (state, action) => {
      state.stockCount = action.payload;
    },
  },
})

export const { setOptionName, setAdditionalFee, init, setStockCount, setTotalNumber } = productOptionsSlice.actions;
export default productOptionsSlice.reducer;