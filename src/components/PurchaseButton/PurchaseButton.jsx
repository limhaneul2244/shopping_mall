import React, { useCallback } from "react";
import { styled } from "styled-components";
import { MediaQuery } from "../../commonStyle";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setData } from "../../common";

const Purchase = styled.button`
  display: flex;
  flex-shrink: 0;
  color: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  ${(props) =>
    props.stockCount ? `background: #BDBDBD` : `background: #6327fe`};
  padding: 19px 118px;
  font-size: 18px;
  font-family: "SpoqaHanSansNeo-R";

  ${MediaQuery.wideDetailed} {
    padding: 19px 60px;
  }
`;

/**
 *
 * @returns 공통버튼
 */
export default function PurchaseButton({detailDataOption}) {
  const {id} = useParams();
  console.log('공통버튼 id', id)
  const stockCount = useSelector((state) => state.option.stockCount);
  const selectOption = useSelector((state) => state.option.optionName);
  const navigate = useNavigate();
  const handleGoToCart = useCallback(() => {
    if (stockCount === 0) { //상품 품절
      alert("해당 상품은 구매할 수 없어요");
      return;
    }
    if (detailDataOption.length === 0) { //옵션 없는 상품
      alert("구매수량이 맞는지 확인해주세요.");
      navigate("/Cart");
      return;
    }
    if(!selectOption) { //옵션 있는데 선택 안했을 경우
      alert("옵션을 선택해주세요!!");
      return;
    }
    setData("Cart", id);
    navigate(`/Cart/${id}`);
  }, [stockCount, selectOption, detailDataOption, id]);
  return (
    <Purchase onClick={handleGoToCart}>
      {stockCount === 0 ? "품절상품입니다." : `바로 구매`}
    </Purchase>
  );
}
