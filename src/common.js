//공통함수 모아두는 곳

//로컬스토리지에 담기
export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

//로컬스토리지값 가져오기
export const getData = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
}