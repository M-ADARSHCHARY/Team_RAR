const baseUrl = 'https://api.stockdata.org/v1/data/quote';
const apiToken = '7LJtKDp7cgsYJgT6dRMTna1G7ybpXWP73Tud2dHd';  
const filterEntities = true; 
const language = 'en';
//https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,MSFT&api_token=7LJtKDp7cgsYJgT6dRMTna1G7ybpXWP73Tud2dHd
// Function to fetch stock market news
async function getStockMarketPrice(symbols) {
  try {
    const response = await fetch(`${baseUrl}?symbols=${symbols}&filter_entities=${filterEntities}&language=${language}&api_token=${apiToken}`) 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock market news:', error);
    // Display an error message to the user
    return null;
  }
}


// Access Stock News Based on StockSYMBOL
const stockSymbol = document.querySelector(".stockSymbol")
const getNewsBtn = document.querySelector(".getNews")
const sNews = document.querySelector(".stockNews")


getNewsBtn.addEventListener('click', async () => {
  sNews.innerHTML = '';// clear initially

  const symbols = stockSymbol.value.trim(); // Get user Ticker input
  const data = await getStockMarketPrice(symbols); // Fetch data for the symbol
  const price = document.createElement('h6')
  const company_Name = document.createElement('h6')
  const dayHigh = document.createElement('h6')
  const dayLow = document.createElement('h6')
  const dayOpen = document.createElement('h6')
  const pcp = document.createElement('h6')
  const vol = document.createElement('h6')
  const dayChange = document.createElement('h6')
  const weekHigh52 = document.createElement('h6')
  const weekLow52 = document.createElement('h6')

  const elementsArray = [company_Name,price,dayHigh, dayLow, dayOpen,dayChange,weekHigh52,weekLow52,pcp,vol];
  if (!symbols) {
    price.innerText = 'Please enter a stock symbol.';
    return;
  }
  if (data && data.data && data.data.length > 0) {
    price.innerText = `Price: ${data.data[0].price}`; // Display the stock price
  } else {
    price.innerText = 'No data available for the entered symbol.';
  }
  dayChange.innerText = `${"DayChange :"} ${data.data[0].day_change}`
  pcp.innerText = `${"Previous Close Price:"} ${data.data[0].previous_close_price}`
  vol.innerText = `${"Volume: "} ${data.data[0].volume}`;
  company_Name.innerText = `${"Company Name:"} ${data.data[0].name}`
  dayHigh.innerText = `${"Day_High:"} ${data.data[0].day_high}`
  dayLow.innerText = ` ${"Day_Low:"} ${data.data[0].day_low}`
  dayOpen.innerText = `${"Day_Open:"} ${data.data[0].day_open}`
  weekHigh52.innerText = `${"weekHigh_52: "} ${data.data[0]["52_week_high"]}`;
  weekLow52.innerText = `${"WeekLow_52: "}  ${data.data[0]["52_week_low"]}`;
  // append elements to browser to display
  for(var i = elementsArray.length-1;i >= 0;i--){
      sNews.prepend(elementsArray[i]);
  }
  console.log(data);
});

