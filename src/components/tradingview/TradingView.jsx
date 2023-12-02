import React, { useState, useEffect } from "react";
import "./tradingview.scss";

function TradingView() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        width: "100%",
        height: 350,
        symbol: "COINBASE:BTCUSD",
        interval: "H",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_adad2",
      });
    };

    // document.getElementById("tradingview_adad2").appendChild(script);
    document.head.appendChild(script);

    return () => {
      // Cleanup the script to avoid memory leaks
      // document.getElementById("tradingview_adad2").removeChild(script);
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <div class="tradingview-widget-container">
        <div id="tradingview_adad2"></div>
        <div className="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/symbols/BTCUSD/"
            rel="noopener"
            target="_blank"
          ></a>{" "}
        </div>
      </div>
    </div>
  );
}

export default TradingView;
