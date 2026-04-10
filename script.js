const API_KEY = "YOUR_API_KEY"; 
const symbol = "AAPL"; // 애플 주식 예시

async function fetchStockData() {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const timeSeries = data["Time Series (Daily)"];
  const labels = Object.keys(timeSeries).slice(0, 7).reverse();
  const prices = labels.map(date => parseFloat(timeSeries[date]["4. close"]));

  renderChart(labels, prices);
}

function renderChart(labels, prices) {
  const ctx = document.getElementById("stockChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "종가 (USD)",
        data: prices,
        borderColor: "blue",
        fill: false
      }]
    }
  });
}

fetchStockData();
