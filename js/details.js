const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://api.coinlore.net/api/ticker/?id=" + id;
const infoContainer = document.querySelector(".card-content");
const coinName = document.querySelector("#coin");
const coinShortName = document.querySelector("#symbol");
const coinDetailsNav = document.querySelector("#breadcrumbs-id");

const currencyInfo = async () => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    const data = result[0];

    coinName.innerHTML = data.name;
    coinShortName.innerHTML = data.symbol;
    coinDetailsNav.innerHTML = data.name;

    const trendHour = data.percent_change_1h;
    const trendDay = data.percent_change_24h;
    const trendWeek = data.percent_change_7d;

    let trendClassHour = "";
    trendHour < 0 ? (trendClassHour = "negative") : (trendClassHour = "positive");

    let trendClassDay = "";
    trendDay < 0 ? (trendClassDay = "negative") : (trendClassDay = "positive");

    let trendClassWeek = "";
    trendWeek < 0 ? (trendClassWeek = "negative") : (trendClassWeek = "positive");

    infoContainer.innerHTML = `
    <div class="trade-position"><span>#${data.rank}</span> Most traded</div>
                <div class="value">
                    <p>USD</p>
                    <p>${data.price_usd}$ <span>/per coin</span></p>
                </div>
                <div class="content-trend">
                    <div class="lastHour">
                        <p>Last Hour</p>
                        <p class=${trendClassHour}>${trendHour}%</p>
                    </div>
                    <div class="lastDay">
                        <p>Last 24hrs</p>
                        <p class=${trendClassDay}>${trendDay}%</p>
                    </div>
                    <div class="lastSeven">
                        <p>Last 7 days</p>
                        <p class=${trendClassWeek}>${trendWeek}%</p>
                    </div>
                </div>
    `;

    let trend = "";
    data.percent_change_24h > 0 ? (trend = "+") : (trend = "");

    document.title = `CryptoLoop - ${data.name}, ${trend}${data.percent_change_24h}`;
  } catch (error) {
    console.log(error);
  }
};

currencyInfo();
