//html에 네모 그리기
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//1.
//공룡 등장 좌표 및 크기
 // 등장 캐릭터의 속성을 object 자료에 정리해두면 편리하다.
const dino = {
  x : 10,
  y : 200,
  width : 50,
  height : 50,

  //그리는 함수
  draw(){
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y)
  }
}

const img2 = new Image();
img2.src = 'mov.png';


//2.
//장애물도 object 자료 만들어놓기
class Cactus {
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height); //네모 그리기
    ctx.drawImage(img1, this.x, this.y)
  }
}

const img1 = new Image();
img1.src = 'cactus.png';

let timer = 0;
let cacti = [];  //장애물 여러 개 관리하기
let jumpSwitch = false; 
let jumpTimer = 0;
let animation;

//3.
//코드를 1초에 60번 실행하면 애니메이션을 만들 수 있음
function runEveryFrame(){
  animation = requestAnimationFrame(runEveryFrame)
  timer++;

  //캔버스 비워주는 코드
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //공룡 이동
  // dino.x++;

  //  장애물은 300프레임에 한 번씩 등장(모니터에 따라 다르긴 함)
  if (timer % 300 === 0){
    let cactus = new Cactus();
    cacti.push(cactus);
  }

  
  //    array에 있는 장애물 한 번에 그려주기
  cacti.forEach((a, i, o) => {

    //장애물의 x좌표가 0미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1)
    }    

    a.x--;  //장애물 좌표 왼쪽으로 이동

    collision(dino, a);

    a.draw();

  })

  //점프 기능
  if (jumpSwitch == true) {
    dino.y-=2;
    jumpTimer++;
  }
  if (jumpSwitch == false){
    if (dino.y < 200){
      dino.y+=2;
    }
  }

  //100프레임 지나면 점프 그만
  if (jumpTimer > 100){
    jumpSwitch = false;
    jumpTimer = 0;
  }
  
  dino.draw()
}
runEveryFrame();


//충돌 확인
function collision(dino, cactus){
  const xDistance = cactus.x - (dino.x + dino.width);
  const yDistance = cactus.y - (dino.y + dino.height);

  if(xDistance < 0 && yDistance < 0){
    alert("Ouch! Game over");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}


//클릭할 때마다 점프
document.addEventListener("click", function(e){
  //"space bar" key code == 32
  // if (e.code == 32){
  //   jumpSwitch = true;
  //   console.log(e.code)
  // }

  jumpSwitch = true;
})