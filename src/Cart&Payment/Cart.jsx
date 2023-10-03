import React from "react";
import { CommonLayOut, GlobalStyle } from "../commonStyle";
import { styled } from "styled-components";
import SelectBox from "../components/SelectBox/SelectBox";

const MainTitle = styled.h1`
  color: #333;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  text-align: center;
`;

const SubTitle = styled.h2`
  color: #333;
  font-size: 24px;
`;

export default function Cart() {
  return (
    <>
      <GlobalStyle />
      <CommonLayOut width={1260}>
        <MainTitle>장바구니/결제</MainTitle>

        <SubTitle>쿠폰 사용</SubTitle>
        {/* <SelectBox txt={'쿠폰 선택'}/> */}
      </CommonLayOut>
    </>
  );
}
