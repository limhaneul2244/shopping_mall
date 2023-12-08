import React, { useState } from "react";
import { styled } from "styled-components";
import shoppingCart from "../../imgs/icon-shopping-cart.svg";
import iconHome from "../../imgs/icon-home.svg";
import { MediaQuery, StyledLink } from "../../commonStyle";
import { useLocation } from "react-router-dom";

const CommonButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 5%;
  right: 5vw;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background: #6327fe;

  img {
    display: block;
    width: 40px;
  }

  ${MediaQuery.wideDetaild1600} {
    img {
      width: 30px;
    }
  }

  ${MediaQuery.tablet} {
    width: 60px;
    height: 60px;
  }
  ${MediaQuery.mobile} {
    width: 40px;
    height: 40px;
  }
`;

/**
 *
 * @returns 우측 하단 바로가기 버튼
 *
 */
export default function QuickButton() {
  const location = useLocation();
  const quickButtonIcon =
    location.pathname === "/Cart" ? iconHome : shoppingCart;

  return (
    <StyledLink to={{ pathname: `/Cart` }}>
      <CommonButton>
        <img
          src={quickButtonIcon}
          alt={location.pathname === "/Cart" ? "home" : "Cart"}
        />
      </CommonButton>
    </StyledLink>
  );
}
