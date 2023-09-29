import { CommonLayOut, GlobalStyle, FlexStyle, elip1 } from "./commonStyle";
import styled from 'styled-components';
import heart from './imgs/icon-heart.svg';
import { useEffect, useState } from "react";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 60px;
  max-height: 100vh;
`;

const GridItem = styled.div`
  ${FlexStyle}
  max-width: 380px;

  .thumbnailImg {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
  }
  .itemName {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .name {
      ${elip1}
      color: #333;
      font-size: 18px;
      line-height: 22px; /* 122.222% */
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
      color: #6327FE;
      font-weight: 700;
    }
  }
}
`
//http://35.76.53.28:8080/mall
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://35.76.53.28:8080/mall`);
        if (!res.ok) {
          throw new Error('네트워크 문제가 발생했어요.');
        }
        const data = await res.json();
        console.log(data)
        setData(data);
        return data;
      } catch (error) {
        console.error('데이터를 불러오는 도중 에러가 발생했어요', error)
      }
    }
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <GlobalStyle />
      <CommonLayOut width={1260}>
        <GridContainer>
          {
            data.map((item) => {
              return (
                <GridItem key={item.id}>
                  <img className="thumbnailImg" src={`https://test.api.weniv.co.kr/${item.thumbnailImg}`} alt={item.productName} />
                  <div className="itemName">
                    <span className="name">{item.productName}</span>
                    <button><img className="heartIcon" src={heart} alt="찜하기" /></button>
                  </div>
                  <div className="priceArea" name='direction'>
                    <span className="sale">29,160</span>
                    <span className="costPrice">{item.price}원</span>
                    <span className="discountRate">{item.discountRate}%</span>
                  </div>
                </GridItem>
              )
            })
          }
        </GridContainer>
      </CommonLayOut>
    </div>
  );
}

export default App;
