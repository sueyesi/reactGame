//import logo from './logo.svg';
import { useState } from 'react';
//component
import './App.css';
import GameBox from "./component/gameBox"


// Image
import ScissorsImg from './Img/Scissors.png'
import RockImg from './Img/Rock.png'
import PaperImg from './Img/Paper.png'

//1.박스영역 (박스2개,타이틀,이미지,결과출력)
//2. 가위 바위 보 버튼
//2-1 사진을 저장할 수 있는 객체 저장
//2-2 무엇을 선택했는지 매개변수을 넣어준다.
//3.버튼을 클릭하면 클락한 값이 user박스에 보임(state를 만듬)
//4.컴퓨터는 값을 랜덤하게 노출
//5. 3~4 결과를 가지고 승패를 정한다 
//6. 승패결과에 따라 디자인 변경 (졌을경우 박스를 어둡게 처리한다.)

//사진을 저장할 수 있는 객체 저장
const choice ={
  scissors:{
    name:"Scissors",
    img: ScissorsImg,
  },
  rock:{
    name:"Rock",
    img: RockImg,
  },
  paper:{
    name:"Paper",
    img: PaperImg,
  }
}
function App() {
  const[userSelect,setUserSelect] = useState(null);
  const[computerSelet,setComputerSelect] = useState(null);
  const[result,setResult] = useState("")// 비어있는 스트링 타입  
  const[userScore, setUserScore] = useState(0);
  const[computerScore, setComputerScore] = useState(0);  

  const play=(userChoice)=>{
    //console.log("선택!!",userChoice)
    setUserSelect(choice[userChoice])
    //user가 아이템을 선택할때 컴퓨터 랜덤 값을 준다.
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    //setResult(judgement(choice[userChoice],computerChoice));//유저가 선택한 값과 컴퓨터가 선택한 값을 넣어준다.  
    // 유저와 컴퓨터의 선택을 비교하여 결과를 설정
    const gameResult = judgement(choice[userChoice], computerChoice);
    setResult(gameResult);  
    

    // 점수 업데이트
    if (gameResult === "win") {
        setUserScore(userScore => userScore + 1); 
    } else if (gameResult === "lose") {
        setComputerScore(computerScore => computerScore + 1); 
    } 
  }
  //점수초기화
  const resetScores = () => {
    setUserScore(0);
    setComputerScore(0);
    setResult('');
    setUserSelect(null);
    setComputerSelect(null);
};
  
  const judgement=(user,computer)=>{
    //console.log("user",user,computer)
    // user == computer  - tie
    // user == "rock", computer == "scissors"  - user win
    // user == "rock", computer == "paper"  - user lose
    // user == "scissors", computer == "paper"  - user win
    // user == "scissors", computer == "rock"  - user lose
    // user == "paper", computer == "rock"  - user win
    // user == "paper", computer == "scissors"  - user lose

    if(user.name === computer.name) return "tie";
    else if(user.name=="Rock") return computer.name=="Scissors" ? "win" : "lose"; //computer 값이 scissors일때 win 그렇지 않을때 lose ==삼항연산자
    else if(user.name=="Scissors") return computer.name=="Paper" ? "win" : "lose";
    else if(user.name=="Paper") return computer.name=="Rock" ? "win" : "lose";
  };

  const randomChoice=()=>{
    //객체를 배열화 시킨다.
    let itemArray = Object.keys(choice);//Object.keys()는 객체에 키값만 뽑아 array로 만들어준다.
    //console.log("itemArray",itemArray);    
    let randomItem = Math.floor(Math.random() * itemArray.length); //Math.random을 사용하여 0~1 사이에 랜덤한 값을 반환한다
    //console.log("randomItem",randomItem)
    let final = itemArray[randomItem]
    //console.log("final",final)
    return choice[final]
  }
  
  return (
    <div className='wrap'>
      <div className='container'>
        <div className='game__score'> 
          <div className='score'>{userScore} : {computerScore}</div> 
          <button onClick={resetScores}>점수 초기화</button>
        </div>
        <div className='game__content flex'>
          <GameBox title="user" item={userSelect} result={result}/>
          <GameBox title="computer" item={computerSelet} result={result}/>
        </div>
        <div className='game__btn flex'>
          <button onClick={() => play("scissors")}>가위</button>
          <button onClick={() => play("rock")}>바위</button>
          <button onClick={() => play("paper")}>보</button>
          
        </div>
      </div>  
      <footer>publisher724@gmail.com</footer>    
    </div>
    
  );
}

export default App;
