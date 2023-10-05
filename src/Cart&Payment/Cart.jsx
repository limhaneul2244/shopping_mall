import React, { useEffect, useState } from "react";
import { CommonLayOut, GlobalStyle, MediaQuery } from "../commonStyle";
import { styled } from "styled-components";
import SelectBox from "../components/SelectBox/SelectBox";
import { useParams } from "react-router-dom";

const CartContainer = styled.div`
  padding: 160px 0;

  ${MediaQuery.tablet} {
    padding: 75px 0 75px;
  }
  ${MediaQuery.mobile} {
    padding: 38px 0 38px;
  }
`;

const MainTitle = styled.h1`
  margin-bottom: 60px;
  color: #333;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  text-align: center;
  ${MediaQuery.tablet} {
    font-size: 30px;
    margin-bottom: 40px;
  }
  ${MediaQuery.mobile} {
    font-size: 17px;
    margin-bottom: 20px;
  }
`;

const SubTitle = styled.h2`
  color: #333;
  font-size: 24px;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin: 10px 0 16px 0;
    background-color: #e0e0e0;
  }
  ${MediaQuery.tablet} {
    font-size: 20px;
  }
  ${MediaQuery.mobile} {
    font-size: 14px;
  }
`;


export default function Cart() {
  const { id } = useParams();
  console.log("Cart", id);
  const [serviceCoupon, setServiceCoupon] = useState(null);
  console.log(id);
  useEffect(() => {
    couponData();
  }, [id]);
  const couponData = async () => {
    try {
      const res = await fetch(`http://35.76.53.28:8080/coupon/5`);
      if (!res.ok) {
        throw new Error("네트워크 문제가 발생했어요.");
      }
      if (res.headers.get("Content-Type").includes("application/json")) {
        const detailCouponInfo = await res.json();
        console.log("detailCouponInfo", detailCouponInfo);
        setServiceCoupon(detailCouponInfo);
      } else {
        throw new Error("응답이 JSON 형식이 아닙니다.");
      }
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했어요", error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <CommonLayOut width={1260}>
        <CartContainer>
          <MainTitle>장바구니/결제</MainTitle>

          <SubTitle>쿠폰 사용</SubTitle>
          {/* <SelectBox detailDataOption={}  txt={'쿠폰 선택'}/> */}

          <SubTitle>주문 상품</SubTitle>
        </CartContainer>
      </CommonLayOut>
    </>
  );
}
