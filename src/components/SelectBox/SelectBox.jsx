import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import SelectBoxChildren from "../SelectBoxChildren/SelectBoxChildren";

//셀렉트 박스
const CustomSelect = styled.div`
  border: 1px solid #c4c4c4;
  width: 440px;
  height: 40px;
  background: #fff;
  text-align: left;
  padding: 0 1em;
  position: relative;
  border-radius: 10px;
  h3 {
    color: #828282;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 14px;
  }
  .list {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 1;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #bdbdbd;
    padding: 4px;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  }
  .list li {
    height: 40px;
  }

  .list button {
    width: 100%;
    height: 100%;
    text-align: left;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  .list li button:hover,
  .list li button:focus {
    background: #f8f5ff;
  }
`;

/**
 *
 * @param detailDataOption detailData.option 옵션 선택
 * @returns 셀렉트 박스
 */
export default function SelectBox({ detailDataOption, txt }) {
  console.log("detailData", detailDataOption);
  const [showSelBox, setShowSelBox] = useState(false);

  const handleOption = useCallback(() => {
    if (!showSelBox) {
      setShowSelBox(true);
      return;
    }
    setShowSelBox(false);
  }, [showSelBox]);

  return (
    <>
      <CustomSelect onClick={handleOption}>
        <h3>{txt}</h3>
        {showSelBox && (
          <ul className="list">
            {detailDataOption.map((option) => {
              return <SelectBoxChildren key={option.id} option={option} />;
            })}
          </ul>
        )}
      </CustomSelect>
    </>
  );
}
