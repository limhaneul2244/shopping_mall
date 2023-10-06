//공통함수 모아두는 곳

//로컬스토리지에 담기
export const setData = (key, value) => {
  const cartId = localStorage.setItem(key, JSON.stringify(value));
  console.log('id를 가져왔습니다.', cartId)
}


//로컬스토리지에서 빼기