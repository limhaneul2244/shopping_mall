import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  console.log(id);
  // const location = useLocation();
  // const productInfo = {...location.state};
  // console.log(productInfo)

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

  return (
    <>
      <div>{detailData.productName}</div>
      <img src={`https://test.api.weniv.co.kr/${detailData.thumbnailImg}`} alt="" />
    
    </>
  )
}
