import React from "react";
import { styled } from "styled-components";

const ProductCountInner = styled.div`
  border: 1px solid#BDBDBD;
  display: inline-flex;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #fff;
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

export default function ProductCountButton({ totalNumber, handleCountUp, handleCountDown }) {
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
