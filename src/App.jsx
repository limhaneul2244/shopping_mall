import { CommonLayOut, GlobalStyle, MediaQuery } from "./commonStyle";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import ProductItem from "./components/ProductsItem/ProductsItem";
import QuickButton from "./components/QuickButton/QuickButton";

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
          {data.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </GridContainer>
      </CommonLayOut>
      <QuickButton/>
    </>
  );
}
export default App;
