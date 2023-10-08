import React, { useCallback, useEffect, useState } from "react";
import {
  CommonLayOut,
  GlobalStyle,
  MediaQuery,
  ThumbnailImg,
  elip1,
} from "../commonStyle";
import { styled } from "styled-components";
import SelectBox from "../components/SelectBox/SelectBox";
import { useSelector } from "react-redux";
import { getData } from "../common";

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

const ProductList = styled.table`
  width: 100%;
  tr,
  td {
    display: flex;
  }
  th,
  td {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 18px;
    &:nth-of-type(1) {
      width: 30px;
    }
    &:nth-of-type(2) {
      width: 500px;
    }
    &:nth-of-type(3) {
      width: 200px;
    }
    &:nth-of-type(4) {
      width: 300px;
    }
    &:nth-of-type(5) {
      width: 200px;
    }
  }
  thead {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    background-color: #f2f2f2;
    height: 60px;
  }

  tbody {
    .name {
      ${elip1}
      color: #828282;
    }
    .coupon {
      color: #eb5757;
      font-size: 18px;
      font-weight: 700;
    }
    .img {
      margin: 0;
    }
    .productInfor {
      text-align: start;
      margin-left: 36px;
    }
    tr {
      width: 100%;
      height: 130px;
    }
    td {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .col {
      display: flex;
      flex-direction: column;
    }
  }
`;

export default function Cart() {
  const [serviceCoupon, setServiceCoupon] = useState("");
  const totalNumber = useSelector((state) => state.option.totalNumber);
  const [cartDataList, setCartDataList] = useState([]);

  useEffect(() => {
    cartData();
  }, []);

  const cartData = useCallback(async () => {
    try {
      const res = await fetch(`http://35.76.53.28:8080/mall`);
      if (!res.ok) {
        throw new Error("네트워크 문제가 발생했어요.");
      }
      const detailProductInfo = await res.json();
      console.log("detailCouponInfo", detailProductInfo);
      // setServiceCoupon(detailProductInfo); //쿠폰리스트

      const cartDataArray = getData("Cart");
      console.log("로컬스토리지의 getCartId를 가져왔습니다.", cartDataArray);
      // detailProductInfo의 array의 id와 cartDataArray의 id와 동일한 id를 추려낸다.
      const resultCartData = detailProductInfo.filter((item, index) =>
        cartDataArray.some((cartItem) => Number(cartItem.id) === item.id)
      );
      // 이후 setCartDataList에 담는다.
      setCartDataList(resultCartData);
      console.log("resultCartData", resultCartData);
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했어요", error);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <CommonLayOut width={1260}>
        <CartContainer>
          <MainTitle>장바구니/결제</MainTitle>

          <SubTitle>쿠폰 사용</SubTitle>
          {/* <SelectBox detailDataOption={}  txt={'쿠폰 선택'}/> */}
          <SubTitle>주문 상품</SubTitle>
          <button type="button">선택 삭제하기</button>
          <ProductList>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>상품정보</th>
                <th>쿠폰할인</th>
                <th>배송비</th>
                <th>주문금액</th>
              </tr>
            </thead>
            <tbody>
              {cartDataList.map((item) => {
                return (
                  <tr>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td className="img">
                      <div>
                        <ThumbnailImg
                          width={100}
                          src={`https://test.api.weniv.co.kr/${item.thumbnailImg}`}
                          alt={serviceCoupon.productName}
                        />
                      </div>
                      <div className="productInfor">
                        <div>{item.productName}</div>
                        <div>{item.price}원</div>
                        {item.selectOption ? (
                          <div>옵션 : {item.selectOption}</div>
                        ) : (
                          ""
                        )}
                        <div>수량: {totalNumber}</div>
                      </div>
                    </td>
                    <td className="col">
                      {item.selectOption ? (
                        <>
                          <div className="name">{item.productName}</div>
                          <div className="coupon">쿠폰적용가</div>
                        </>
                      ) : (
                        <>
                          <div className="name">{"-"}</div>
                          <div className="coupon">{"-"}</div>
                        </>
                      )}
                    </td>
                    <td>{item.shippingFee}원</td>
                    <td>{item.price * totalNumber}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </ProductList>
        </CartContainer>
      </CommonLayOut>
    </>
  );
}
