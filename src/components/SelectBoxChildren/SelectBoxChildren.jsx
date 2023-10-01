import React, { useCallback, useState } from "react";

export default function SelectBoxChildren({ optionList }) {
  const [optionName, setOptionName] = useState('');
  console.log('optionList', optionList.id)
  
  const handleOptionBtn = useCallback(() => {
    console.log("버튼 클릭");
  }, []);
  return (
    <>
      <li>
        <button type="button" className="btnSelect" onClick={handleOptionBtn}>
          <span>{optionList.optionName}</span>
          <span>
            {optionList.additionalFee
              ? ` (+${optionList.additionalFee}원)`
              : null}
          </span>
        </button>
      </li>
    </>
  );
}
