import React from "react";
import { styled } from "styled-components";

const Purchase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: #6327fe;
  padding: 19px 118px;
  font-size: 18px;
  font-family: "SpoqaHanSansNeo-R";
`;

/**
 *
 * @returns 구매하기 버튼
 */
export default function PurchaseButton() {
  return (
    <>
      <Purchase>바로 구매</Purchase>
    </>
  );
}
