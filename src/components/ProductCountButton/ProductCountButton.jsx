import React, { useCallback, useState } from "react";
import { styled } from "styled-components";

const ProductCountInner = styled.div`
  border: 1px solid#BDBDBD;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;

  .countBtn {
    text-align: center;
    font-size: 30px;
    padding: 0 20px;
    box-sizing: border-box;
    color: #bdbdbd;
  }
  .num {
    padding: 0 10px;
  }
`;

export default function ProductCountButton({ detailData }) {
  const [totalNumber, setTotlaNumber] = useState(1);
  const handleCountUp = useCallback(() => {
    if (totalNumber === detailData.stockCount) {
      alert("주문가능한 최대 수량입니다.🤔");
      setTotlaNumber(detailData.stockCount);
      return;
    }
    setTotlaNumber(totalNumber + 1);
  }, [totalNumber, detailData]);

  const handleCountDown = useCallback(() => {
    if (totalNumber <= 1) {
      alert("최소 주문 수량입니다.👋");
      setTotlaNumber(1);
      return;
    }
    setTotlaNumber(totalNumber - 1);
  }, [totalNumber]);

  return (
    <ProductCountInner>
      <button className="countBtn" type="minus" onClick={handleCountDown}>
        -
      </button>
      <div className="num">{totalNumber}</div>
      <button className="countBtn" onClick={handleCountUp}>
        +
      </button>
    </ProductCountInner>
  );
}
