import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
} from "victory";

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily&precision=10"
        );
        const data = await response.json();
        const candlestickData = data.prices.map((entry) => ({
          x: new Date(entry[0]),
          open: entry[1],
          close: entry[4],
          high: entry[2],
          low: entry[3],
        }));
        setChartData(candlestickData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Candlestick Chart</h1>
      <VictoryChart scale={{ x: "time" }} domainPadding={{ x: 25 }}>
        <VictoryAxis
          tickFormat={(date) => new Date(date).toLocaleDateString()}
        />
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{ positive: "#00ff00", negative: "#ff0000" }}
          data={chartData}
          labels={({ datum }) =>
            `Open: ${datum.open}\nClose: ${datum.close}\nHigh: ${datum.high}\nLow: ${datum.low}`
          }
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
};

export default ChartComponent;
