import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CommonLayOut,
  GlobalStyle,
  MediaQuery,
  ThumbnailImg,
  elip1,
} from "./commonStyle";
import styled from "styled-components";
import Loading from "./components/Loading/Loading";
import shoppingCart from "./imgs/icon-shopping-cart.svg";
import heart from "./imgs/icon-heart-off.svg";
import closeBtn from "./imgs/icon-close.svg";
import PurchaseButton from "./components/PurchaseButton/PurchaseButton";
import BaseButton from "./components/BaseButton/BaseButton";
import SelectBox from "./components/SelectBox/SelectBox";
import ProductCountButton from "./components/ProductCountButton/ProductCountButton";
import { useDispatch, useSelector } from "react-redux";
import { init, setOptionName, setStockCount } from "./modules/productOptions";

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 60px 0;

  ${MediaQuery.tablet} {
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
  }
`;

const ProductDetail = styled.div`
  margin-left: 20px;
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
  ${MediaQuery.wide} {
    margin-left: 0;
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
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  > span {
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
      content: "";
      display: inline-flex;
      width: 1px;
      height: 23px;
      background-color: #c4c4c4;
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

const ProductAction = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ProductInformation = styled.div`
  .productInforWrap {
    display: flex;
    align-items: center;
    border-top: 2px solid #e0e0e0;
    border-bottom: 2px solid #e0e0e0;
    height: 44px;

    .inforItem {
      display: flex;
      align-items: center;
      padding-left: 12px;
      max-width: 150px;
      height: 100%;
      background-color: #f2f2f2;
    }
    span {
      padding-left: 12px;
      width: 100%;
    }
  }
`;

const OptionSelectedWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
  background: #f3f0fb;
  color: #333;
  padding: 14px;
  box-sizing: border-box;
  margin: 16px 0;
  .closeBtn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
  .optionValue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .finalPrice {
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;

/**
 *
 * @returns 아이템의 세부 정보
 */
export default function ProductDetails() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [totalNumber, setTotlaNumber] = useState(1);
  const [finalPrice, setFinalPrice] = useState("");

  const dispatch = useDispatch();
  const selectOption = useSelector((state) => state.option.optionName);
  const fee = useSelector((state) => state.option.additionalFee);
  // console.log("selectOption", selectOption, fee);

  useEffect(() => {
    dispatch(init()); //모든reducer 초기화시켜주기
    productDetailData();
  }, []);
  
  //totalNumber값이 바뀔경우
  useEffect(() => {
    if (detailData) {
      // console.log('detailData', detailData);
      let price = detailData.price * totalNumber;
      if(selectOption) { //추가요금이 있는 경우
        price = price + (fee * totalNumber);
      }
      dispatch(setStockCount(detailData.stockCount));
      setFinalPrice(price.toLocaleString());
    }

  }, [totalNumber, selectOption, detailData, fee]);

  const productDetailData = async () => {
    try {
      const res = await fetch(`http://35.76.53.28:8080/mall/${id}`);
      if (!res.ok) {
        throw new Error("네트워크 문제가 발생했어요.");
      }
      const detailData = await res.json();
      // console.log(detailData);
      setDetailData(detailData);
      return detailData;
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했어요", error);
    }
  };
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

  const handleClose = useCallback(()=> {
    dispatch(setOptionName(null));
  }, [dispatch]);

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
              <span className="price">{detailData.price.toLocaleString()}</span>
              원
            </h2>
            {detailData.stockCount === 0 ? null : (
              <>
                <ProductCount>
                  <div className="delivery">택배배송 / 무료배송</div>
                  <div className="countWrapper">
                    {detailData.option.length > 0 ? (
                      <>
                        <SelectBox detailDataOption={detailData.option} txt={'옵션을 선택하세요.'} />
                        {selectOption && (
                          <OptionSelectedWrapper>
                            <div>{selectOption}</div>
                            <button className="closeBtn" onClick={handleClose}>
                              <img src={closeBtn} alt="닫기" />
                            </button>
                            <div className="optionValue">
                              <div>
                                <ProductCountButton
                                  totalNumber={totalNumber}
                                  handleCountUp={handleCountUp}
                                  handleCountDown={handleCountDown}
                                />
                              </div>
                              <span className="finalPrice">
                                <span>{finalPrice}</span>원
                              </span>
                            </div>
                          </OptionSelectedWrapper>
                        )}
                      </>
                    ) : (
                      <ProductCountButton
                        totalNumber={totalNumber}
                        handleCountUp={handleCountUp}
                        handleCountDown={handleCountDown}
                      />
                    )}
                  </div>
                </ProductCount>

                <PriceInfo>
                  <span>총 상품 금액</span>
                  <span>
                    총 수량 <span className="highlight">{totalNumber}</span>개
                  </span>
                  <span>
                    <span className="highlight">{finalPrice}</span>원
                  </span>
                </PriceInfo>
              </>
            )}

            <ProductAction>
              <PurchaseButton detailDataOption={detailData.option}/>
              <BaseButton icon={shoppingCart} alt={"cart"} />
              <BaseButton icon={heart} alt={"like"} />
            </ProductAction>
          </ProductDetail>
        </ProductInfo>

        <ProductInformation>
          <p>상품 정보</p>
          <div className="productInforWrap">
            <span className="inforItem">게시일</span>
            <span>{detailData.pubDate}</span>
            <span className="inforItem">재고 수량</span>
            <span>
              {detailData.stockCount && detailData.stockCount - totalNumber}개
            </span>
          </div>
        </ProductInformation>

        <div>
          {detailData.detailInfoImage.map((img, index) => {
            return (
              <img
                key={index}
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
