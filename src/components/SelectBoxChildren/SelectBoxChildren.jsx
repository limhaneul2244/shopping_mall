import React, { useCallback } from "react";
// import { useDispatch } from "react-redux";
// import { setAdditionalFee, setOptionName } from "../../modules/productOptions";

export default function SelectBoxChildren({
  selectData,
  onSelect
}) {
  // const dispatch = useDispatch();
  //클릭을 통해 옵션이름 변경됨
  // const handleOptionBtn = useCallback(() => {
  //   dispatch(setOptionName(option.optionName));
  //   dispatch(setAdditionalFee(option.additionalFee));
  // }, [dispatch, option.optionName, option.additionalFee]);

  const handleOptionBtn = useCallback(() => {
    onSelect(selectData);
  }, [onSelect, selectData]);

  return (
    <>
      <li>
        <button type="button" className="btnSelect" onClick={handleOptionBtn}>
          {/* <span>{option.optionName}</span>
          <span>
            {option.additionalFee ? ` (+${option.additionalFee}원)` : null}
          </span> */}
          <span>{selectData.txt}</span>
          <span>{selectData.addTxt}</span>
        </button>
      </li>
    </>
  );
}
