import {
  CommonLayOut,
  GlobalStyle,
  FlexStyle,
  elip1,
  MediaQuery,
  StyledLink,
  ThumbnailImg,
} from "./commonStyle";
import styled from "styled-components";
import heart from "./imgs/icon-heart.svg";
import { useCallback, useEffect, useState } from "react";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 60px;
  padding: 150px 0 150px;

  ${MediaQuery.tablet} {
    grid-template-columns: repeat(2.5, 1fr);
    gap: 30px;
    padding: 75px 0 75px;
  }
  ${MediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    padding: 38px 0 38px;
  }
`;

const GridItem = styled.div`
  ${FlexStyle}
  .itemName {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .name {
      ${elip1}
      color: #333;
      font-size: 18px;
      line-height: 22px;
    }
    .heartIcon {
      display: inline-block;
      width: 22px;
      height: 22px;
    }
  }

  .priceArea {
    span {
      margin-right: 10px;

      &:nth-of-type(1) {
        color: #333;
        font-size: 24px;
        font-weight: 700;
      }
      &:nth-of-type(2) {
        color: #828282;
        text-decoration: line-through;
      }
      &:nth-of-type(3) {
        color: #6327fe;
        font-weight: 700;
      }
    }
  }

  ${MediaQuery.tablet} {
    .itemName {
      .name {
        font-size: 16px;
      }
    }
    .priceArea {
      span {
        &:nth-of-type(1) {
          font-size: 18px;
        }
        &:nth-of-type(2) {
          font-size: 15px;
        }
        &:nth-of-type(3) {
          font-size: 13px;
        }
      }
    }
  }

  ${MediaQuery.tablet} {
    .itemName {
      .name {
        font-size: 13px;
      }
    }
    .priceArea {
      span {
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          font-size: 13px;
        }
      }
    }
  }
`;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    console.log("렌더링!!");
    try {
      const res = await fetch(`http://35.76.53.28:8080/mall`);
      if (!res.ok) {
        throw new Error("네트워크 문제가 발생했어요.");
      }
      const data = await res.json();
      console.log(data);
      setData(data);
      return data;
    } catch (error) {
      console.error("데이터를 불러오는 도중 에러가 발생했어요", error);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <CommonLayOut width={1260}>
        <GridContainer>
          {data.map((item) => {
            const price = item.price;
            const priceResult = price.toLocaleString();
            const discountNumber = item.price * (item.discountRate / 100);
            const result = item.price - discountNumber;
            const sale = result.toLocaleString();
            return (
              <GridItem key={item.id}>
                <StyledLink
                  to={{ pathname: `/ProductDetails/${item.id}` }}
                  key={item.id}
                >
                  <ThumbnailImg width={380}
                    src={`https://test.api.weniv.co.kr/${item.thumbnailImg}`}
                    alt={item.productName}
                  />
                </StyledLink>
                <div className="itemName">
                  <StyledLink
                    to={{ pathname: `/ProductDetails/${item.id}` }}
                    key={item.id}
                  >
                    <span className="name">{item.productName}</span>
                  </StyledLink>
                  <button>
                    <img className="heartIcon" src={heart} alt="찜하기" />
                  </button>
                </div>
                <div className="priceArea" name="direction">
                  <span className="sale">{sale}원</span>
                  {item.discountRate !== 0 && (
                    <>
                      <span className="costPrice">{priceResult}원</span>
                      <span className="discountRate">{item.discountRate}%</span>
                    </>
                  )}
                </div>
              </GridItem>
            );
          })}
        </GridContainer>
      </CommonLayOut>
    </>
  );
}

export default App;
