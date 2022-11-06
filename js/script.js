/* 
Feedback from Erik Solhaug

# Try shortening (re-factor) the code
# Utilize forEach method to increase readability of code 

*/

const url = "https://api.coinlore.net/api/tickers/";
const coinContainer = document.querySelector(".table");

const fetchData = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;

    let trend;
    let html = "";

    data.forEach((el, index) => {
      const id = el.id;
      const name = el.name;
      const shortName = el.symbol;
      const priceUsd = el.price_usd;
      const price24h = el.percent_change_24h;

      if (index === 20) throw {};

      price24h < 0 ? (trend = "negative") : (trend = "positive");

      html += `
      <a href="details.html?id=${id}">
        <div class="tbody">
          <div class="tbody-coin">
            <p>${name}</p>
            <p>${shortName}</p>
          </div>
          <div class="tbody-info">
            <p>$${priceUsd}</p>
            <p class="${trend}">${price24h}%</p>
          </div>
        </div>
        </a>
      `;

      coinContainer.innerHTML = html;
    });
  } catch (err) {
    console.error(err);
  }
};

fetchData();

// Animation
const animationSpan = document.querySelector("#text-roll");
const animationArray = ["No gimmicks.", "Just crypto.", "Painlessly fast."];

let i = 0;
const animationInterval = setInterval(() => {
  animationSpan.innerHTML = animationArray[parseInt(i / 2, 10) % animationArray.length];
  if (i % 2 !== 0) {
    animationSpan.classList.remove("text-roll-ani");
  } else {
    animationSpan.classList.add("text-roll-ani");
  }
  i++;
}, 1500);
