import React from "react";
import { styled } from 'styled-components';

const BaseBtn = styled.button`
  border: 2px solid #BDBDBD;
  padding: 19px;
  border-radius: 5px;
  box-sizing: border-box;

  
  img {
    display: block;
    width: 22px;
    height: 22px;
  }
`


/**
 *
 * @returns 찜하기, 장바구니 공통
 */
export default function BaseButton({icon, alt}) {
  return (
    <>
      <BaseBtn>
        <img src={icon} alt={alt} />
      </BaseBtn>
    </>
  );
}
