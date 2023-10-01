import React from "react";
import { styled } from "styled-components";
import { MediaQuery } from "../../commonStyle";

const Purchase = styled.button`
  display: flex;
  flex-shrink: 0;
  color: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: #6327fe;
  padding: 19px 118px;
  font-size: 18px;
  font-family: "SpoqaHanSansNeo-R";

  ${MediaQuery.wideDetailed} {
    padding: 19px 60px;
  }
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
