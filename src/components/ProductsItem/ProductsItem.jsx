import React, { useCallback, useState } from 'react';
import {
  elip1,
  MediaQuery,
  StyledLink,
  ThumbnailImg,
} from "../../commonStyle";
import heartOff from "../../imgs/icon-heart-off.svg";
import heartOn from "../../imgs/icon-heart-on.svg";
import { styled } from 'styled-components';

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  .itemName {
    display: flex;
    justify-content: space-between;
    width: 100%;
   
  }
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

/**
 * 
 * @param item data 가공한 값
 * @returns 상품 컴포넌트
 */
export default function ProductItem({ item }) {
  const [like, setLike] = useState(false);
  const price = item.price;
  const priceResult = price.toLocaleString();
  const discountNumber = item.price * (item.discountRate / 100);
  const result = item.price - discountNumber;
  const sale = result.toLocaleString();

  const handleLike = useCallback(()=> {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [like])

  return (
    <GridItem>
      <StyledLink to={{ pathname: `/ProductDetails/${item.id}` }} key={item.id}>
        <ThumbnailImg
          width={380}
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
        <button onClick={() => handleLike(item)}>
          <img
            className="heartIcon"
            src={like ? heartOn : heartOff}
            alt="찜하기"
          />
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
}
