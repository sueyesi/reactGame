import React from 'react'
// Image
import BasicImg from '../Img/questionMark.png'


const gameBox = (props) => {
  //console.log("porps",props)
  // 결과를 저장할 변수를 선언
  let result;
  let winClass = '';

  // props.title이 "computer"인지 확인하고, 결과가 비기지 않았으며, props.result에 값이 있는지 확인
  if (props.title === "computer" && props.result !== "tie" && props.result !== "")
    // props.result가 "win"이면 result를 "lose"로 설정
    // 그렇지 않으면 result를 "win"으로 설정
    result = props.result ==="win" ? "lose" : "win";
  else
    // 위의 조건이 아니면 props.result 값을 그대로 result에 저장
    result = props.result;
   
  // winClass 설정
  if (result === "win") {
    winClass = 'win';
  } else if (result === "lose") {
    winClass = 'lose';
  }

  return (
    <div className='game__box'>
      <h1>{props.title}</h1>
      <div className='game__item'>
        <img 
          className='item__img' 
          src={props.item && props.item.img ? props.item.img : BasicImg}  
          alt={props.item ? props.item.name : '준비중'} 
        />
        </div>
      <div className={`game__result ${winClass}`}>{result}</div>
    </div>
  )
}

export default gameBox
