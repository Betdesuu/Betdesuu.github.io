let totalScore=0;
let questionScore=25;

startgame();
function startgame(){
 fetch('./src/eu.json')
 .then(Response => Response.json())
 .then(data =>{
    let index = Math.floor(Math.random()* data.length);
    let randomCountry= data[index];
    console.log(randomCountry);
    dom(randomCountry.id);
    hint(randomCountry);
    checkAnswer(randomCountry);

 })
 .catch(error => console.error("Error fetching JSON!", error));
}

function dom(id){
  const path = document.getElementById(id);
  // Fill özelliğini ekle (veya değiştir)
  path.setAttribute("fill", "#ffcc00"); // örnek olarak sarı renk
}

function hint(randomCountry) {
  const flag = document.getElementById("flagicon");
  const currency = document.getElementById("currency");
  const capital = document.getElementById("capital");


  flag.addEventListener("click", () => {
    if(questionScore>10){
      questionScore-=10;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      let newflag = randomCountry.flag;
      flag.src = newflag;
    }
    else{
       Swal.fire("Upsie! You need more than 10 points to unlock this hint!");
    }
  });

  capital.addEventListener("click", () => {
    if(questionScore>5){
      questionScore-=5;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      Swal.fire("Capital: " + randomCountry.capital);
      
    }
    else{
     Swal.fire("Upsie! You need more than 5 points to unlock this hint!");
    }
  })

  currency.addEventListener("click", () => {
    if(questionScore>5){
      questionScore-=5;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      Swal.fire("Currency: " + randomCountry.currency);
    }
    else{
      Swal.fire("Upsie! You need more than 5 points to unlock this hint!");
    }
  })

}

function checkAnswer(randomCountry){

}


