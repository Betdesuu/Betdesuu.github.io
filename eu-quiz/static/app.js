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
    let newflag = randomCountry.flag;
    flag.src = newflag;
  });

  capital.addEventListener("click", () => {
    Swal.fire("Capital: " + randomCountry.capital);
  })

  currency.addEventListener("click", () => {
    Swal.fire("Currency: " + randomCountry.currency);
  })

}


