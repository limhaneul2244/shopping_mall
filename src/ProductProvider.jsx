import { createContext, useState } from "react";


export const ProductProvider = ({ children }) => {
  const ProductInfo = createContext({})
  const [product, setProduct] = useState({
    // 초기 상태 값들
  });

  return (
    <ProductInfo.Provider value={[product, setProduct]}>
      {children}
    </ProductInfo.Provider>
  );
};
