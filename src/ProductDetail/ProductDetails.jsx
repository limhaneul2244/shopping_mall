import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommonLayOut, GlobalStyle, ThumbnailImg } from "../commonStyle";
import styled from "styled-components";
// import minusIcon from './imgs/icon-minus.svg';

const ProductInfo = styled.div`
  display: flex;
`;

const ProductDetail = styled.div`
  margin-left: 30px;
  h1 {
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

export default function ProductDetails() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
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

  const detailInfoImageArray = detailData.detailInfoImage;
  console.log("detailInfoImageArray", detailInfoImageArray);

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

            <div>
              <span>총 상품 금액</span>
              <span>총 수량 1개</span>
              <span>13500원</span>
            </div>

            <div>
              <button>바로 구매</button>
              <button></button>
              <button></button>
            </div>
          </ProductDetail>
        </ProductInfo>

        <table>
          <tbody>
            <tr>
              <td>상품 번호</td>
              <td>20220302</td>
            </tr>
            <tr>
              <td>재고 수량</td>
              <td>230개</td>
            </tr>
          </tbody>
        </table>

        <div>
          {detailInfoImageArray.map((img) => {
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
