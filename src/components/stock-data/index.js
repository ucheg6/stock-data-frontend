import React, { useEffect, useState }  from "react";
import "./index.css";
import getStockData from '../../services/action';

export default function StockData() {

  const [stockDataToRender, setStockDataToRender] = useState(null)
  const [stockDateInput, setStockDateInput] = useState(null)
  const [fetchData, setFetchData] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const data = await getStockData(stockDateInput);
      return data;
    };

    if(fetchData) {
     getData().then((data) => {
        setStockDataToRender(data)
      })
    }
    setFetchData(false);
  },[fetchData, stockDataToRender, stockDateInput])

  const handleDateInput = (event) => {
    const dateInput = event.target.value
    setStockDateInput(dateInput)
  }
  const handleClick = (event) => {
    event.preventDefault();
    setFetchData(true)
  }

  const renderData = stockDataToRender => {
    if (stockDataToRender) {
      if(stockDataToRender.data.length > 0) {
        return <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          <li className="py-10">Open: {stockDataToRender.data[0].open}</li>
          <li className="py-10">Close: {stockDataToRender.data[0].close}</li>
          <li className="py-10">High: {stockDataToRender.data[0].high}</li>
          <li className="py-10">Low: {stockDataToRender.data[0].low}</li>
        </ul>
      } else {
        return <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div>
      }
    } else {
      return null;
    }
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" onChange={handleDateInput} placeholder="5-January-2000" id="app-input" data-testid="app-input"/>
        <button className="" id="submit-button" onClick={handleClick} data-testid="submit-button">Search</button>
      </section>
      {renderData(stockDataToRender)}
    </div>
  );
}
