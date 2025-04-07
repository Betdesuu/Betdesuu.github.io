let totalScore = 0;
let questionScore = 25;
let countries = [];
let correctCountry = null;

startgame();
function startgame() {
  fetch('./src/eu.json')
    .then(Response => Response.json())
    .then(data => {
      countries = data;
      let index = Math.floor(Math.random() * data.length);
      let randomCountry = data[index];
      correctCountry = randomCountry;
      console.log(randomCountry);
      dom(randomCountry.id);
      hint(randomCountry);
      checkAnswer(randomCountry);

    })
    .catch(error => console.error("Error fetching JSON!", error));
}

function dom(id) {
  const path = document.getElementById(id);
  // Fill özelliğini ekle (veya değiştir)
  path.setAttribute("fill", "#ffcc00"); // örnek olarak sarı renk
}

function hint(randomCountry) {
  const flag = document.getElementById("flagicon");
  const currency = document.getElementById("currency");
  const capital = document.getElementById("capital");


  flag.addEventListener("click", () => {
    if (questionScore > 10) {
      questionScore -= 10;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      let newflag = randomCountry.flag;
      flag.src = newflag;
    }
    else {
      Swal.fire("Upsie! You need more than 10 points to unlock this hint!");
    }
  });

  capital.addEventListener("click", () => {
    if (questionScore > 5) {
      questionScore -= 5;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      Swal.fire("Capital: " + randomCountry.capital);

    }
    else {
      Swal.fire("Upsie! You need more than 5 points to unlock this hint!");
    }
  })

  currency.addEventListener("click", () => {
    if (questionScore > 5) {
      questionScore -= 5;
      document.getElementById("questionscore").innerText = `${questionScore}p`;
      Swal.fire("Currency: " + randomCountry.currency);
    }
    else {
      Swal.fire("Upsie! You need more than 5 points to unlock this hint!");
    }
  })

}


const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();

  const filtered = countries.filter(country =>
    country.country.toLowerCase().includes(query)
  );

  displayResults(filtered);
});

function displayResults(list) {
  resultsDiv.innerHTML = "";
  const limitedList = list.slice(0, 3);

  if (limitedList.length === 0) {
    resultsDiv.innerHTML = "";
    return;
  }

  limitedList.forEach(country => {
    const item = document.createElement("div");
    item.innerHTML = `<strong>${country.country}</strong>`;
    item.classList.add("result-item");
    item.addEventListener("click", () => {
      checkAnswer(country, correctCountry);
    });
    resultsDiv.appendChild(item);


  });
}

function checkAnswer(selectedCountry, correctCountry) {
  if (selectedCountry.country === correctCountry.country) {
    let previousScore = totalScore;
    totalScore += 25;

    let currentDisplayScore = previousScore;
    const animationSpeed = 50; // ms
    const increment = 1;

    Swal.fire({
      title: "That's True",
      icon: "success",
      html: `Total Score: <b id="scoreCounter">${previousScore}</b> points ⭐`,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();

        const scoreEl = Swal.getPopup().querySelector("#scoreCounter");
        const interval = setInterval(() => {
          currentDisplayScore += increment;
          if (currentDisplayScore >= totalScore) {
            currentDisplayScore = totalScore;
            clearInterval(interval);
          }
          scoreEl.textContent = currentDisplayScore;
        }, animationSpeed);
      },
      willClose: () => {
        
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });

  } else {
    Swal.fire("❌ Yanlış cevap! Tekrar dene.");
  }
}

