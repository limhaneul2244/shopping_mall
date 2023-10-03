import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAdditionalFee, setOptionName } from "../../modules/productOptions";

export default function SelectBoxChildren({ option }) {
  const dispatch = useDispatch();
  //클릭을 통해 옵션이름 변경됨
  const handleOptionBtn = useCallback(() => {
    dispatch(setOptionName(option.optionName));
    dispatch(setAdditionalFee(option.additionalFee));
    console.log( setOptionName(option.optionName))
  }, [dispatch, option.optionName, option.additionalFee]);
  return (
    <>
      <li>
        <button type="button" className="btnSelect" onClick={handleOptionBtn}>
          <span>{option.optionName}</span>
          <span>
            {option.additionalFee ? ` (+${option.additionalFee}원)` : null}
          </span>
        </button>
      </li>
    </>
  );
}
