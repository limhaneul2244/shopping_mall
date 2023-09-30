import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommonLayOut, GlobalStyle, MediaQuery, ThumbnailImg, elip1 } from "../commonStyle";
import styled from "styled-components";
import Loading from "../components/Loading/Loading";
import shoppingCart from "../imgs/icon-shopping-cart.svg";
import heart from "../imgs/icon-heart-off.svg";

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${MediaQuery.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const ProductDetail = styled.div`
  h1 {
    ${elip1}
    margin-bottom: 10px;
    font-size: 24px;
  }
  h1,
  h2 {
    color: #333;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 100px;
  }
  h2 span {
    font-size: 24px;
    font-weight: 700;
  }
`;

const ProductCount = styled.div`
  color: #828282;
  .countWrapper {
    &::before,
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      margin: 10px 0;
      box-sizing: border-box;
      background-color: #e0e0e0;
    }
  }

  .countInner {
    border: 1px solid#BDBDBD;
    display: inline-flex;
    align-items: center;
    border-radius: 5px;
    box-sizing: border-box;
  }
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

const PriceInfo = styled.div`
display: flex;
align-items: center;
  >span {
    font-size: 18px;
    &:nth-of-type(1) {
      font-size: 18px;
      margin-right: auto;
      color: #333;
    }
    &:nth-of-type(2) {
      color: #828282;
    }
    &:nth-of-type(2)::after {
      content: '';
      display: inline-flex;
      width: 1px;
      height: 23px;
      background-color: #C4C4C4;
      margin: 10px;
    }
    &:nth-of-type(3) {
      font-size: 36px;
    }
  }
  .highlight {
    color: #eb5757;
  }
`;

export default function ProductDetails() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  console.log(id);

  useEffect(() => {
    productDetailData();
  }, []);

  const productDetailData = async () => {
    try {
      const res = await fetch(`http://35.76.53.28:8080/mall/${id}`);
      if (!res.ok) {
        throw new Error("네트워크 문제가 발생했어요.");
      }
      const detailData = await res.json();
      console.log(detailData);
      setDetailData(detailData);
      return detailData;
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했어요", error);
    }
  };

  //로딩처리
  if (!detailData) {
    return <Loading />;
  }

  return (
    <>
      <GlobalStyle />
      <CommonLayOut width={990}>
        <ProductInfo>
          <ThumbnailImg
            width={400}
            src={`https://test.api.weniv.co.kr/${detailData.thumbnailImg}`}
            alt=""
          />
          <ProductDetail>
            <h1>{detailData.productName}</h1>
            <h2>
              <span className="price">{detailData.price}</span>원
            </h2>
            <ProductCount>
              <div className="delivery">택배배송 / 무료배송</div>
              <div className="countWrapper">
                <div className="countInner">
                  <button className="countBtn" type="minus">
                    -
                  </button>
                  <div className="num">1</div>
                  <button className="countBtn">+</button>
                </div>
              </div>
            </ProductCount>

            <PriceInfo>
              <span>총 상품 금액</span>
              <span>
                총 수량 <span className="highlight">1</span>개
              </span>
              <span><span className="highlight">13500</span>원</span>
            </PriceInfo>

            <div className="">
              <button className="purchase">바로 구매</button>
              {/* <PurchaseButton/> */}
              <button className="cart">
                <img src={shoppingCart} alt="" />
              </button>
              {/* <ShoppingButton/> */}
              <button className="like">
                <img src={heart} alt="" />
              </button>
            </div>
          </ProductDetail>
        </ProductInfo>

        <table>
          <tbody>
            <tr>
              <td>게시일</td>
              <td>{detailData.pubDate}</td>
            </tr>
            <tr>
              <td>재고 수량</td>
              <td>{detailData.stockCount}개</td>
            </tr>
          </tbody>
        </table>

        <div>
          {detailData.detailInfoImage.map((img) => {
            return (
              <img
                src={`https://test.api.weniv.co.kr/${img}`}
                alt={detailData.productName}
              />
            );
          })}
        </div>
      </CommonLayOut>
    </>
  );
}
