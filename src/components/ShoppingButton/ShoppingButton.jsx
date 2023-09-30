import React from "react";
import shoppingCart from "../../imgs/icon-shopping-cart.svg";
import { styled } from 'styled-components';

const cart = styled.button`
  
`


/**
 *
 * @returns 장바구니 담기 버튼
 */
export default function ShoppingButton() {
  return (
    <>
      <cart>
        <img src={shoppingCart} alt="" />
      </cart>
    </>
  );
}
