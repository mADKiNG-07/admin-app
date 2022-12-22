import React, { useState } from "react";
import axios from "axios";

function MPost() {
  const [file, setfile] = useState([]);
  const [imgName, setImgName] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});
  const [typeOfTrade, setTypeOfTrade] = useState("");
  const [prefrence, setPrefrence] = useState("buy");
  const [cryptoPair, setCryptoPair] = useState("btcusd");
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [outlook, setOutlook] = useState("");
  const [message, setMessage] = useState("");
  const [send, setSend] = useState(false);

  const onChangeImag = (e) => {
    setfile(e.target.files[0]);
    setImgName(e.target.files[0]);
  };

  const onChangePrefrence = (e) => {
    setPrefrence(e.target.value);
  };

  const onChangeCrypto = (e) => {
    setCryptoPair(e.target.value);
  };

  const CryptoPairOptions = [
    {
      label: "BTCUSD",
      value: "btcusd",
    },
    {
      label: "XAUUSD",
      value: "xauusd",
    },
    {
      label: "ETHUSD",
      value: "ethusd",
    },
    {
      label: "LTCUSD",
      value: "ltcusd",
    },
  ];

  const tradePrefrenceOptions = [
    {
      label: "Buy",
      value: "buy",
    },
    {
      label: "Sell",
      value: "sell",
    },
    {
      label: "Neutral ",
      value: "neutral",
    },
  ];

  const onSubmiteAnalysis = async (e) => {
    e.preventDefault();
    let url = "https://itrendsanalytics.herokuapp.com/posts/add-post";
    setSend(true);

    const formData = new FormData();

    formData.append("cryptoPair", cryptoPair);
    formData.append("typeOfTrade", typeOfTrade);
    formData.append("tradingPref", prefrence);
    formData.append("desc", description);
    formData.append("rec", recommendation);
    formData.append("outlook", outlook);
    formData.append("file", file);

    try {
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);

      const { fileName, filePath } = res.data;

      setUploadedImage({ fileName, filePath });

      setMessage("Analysis Added Sucessfully");
      setSend(false);
      console.log(message);
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server ");
      } else {
        console.log(err.response.data.msg);
      }
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);

    setfile("");
    setCryptoPair("btcusd");
    setDescription("");
    setOutlook("");
    setTypeOfTrade("");
    setRecommendation("");
    setPrefrence("buy");
  };

  return (
    <div>
      <React.Fragment>
        <div className="sending" style={{ opacity: send ? 1 : 0 }}>
          <span>Sending</span>
        </div>

        <div className="analyst-post">
          <form onSubmit={onSubmiteAnalysis}>
            <div>
              <label htmlFor="image"></label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={onChangeImag}
                style={{ visibility: "hidden" }}
              />
            </div>
            <aside>
              <h4>Images:</h4>
              <span>{imgName}</span>
            </aside>

            <label htmlFor="cypto-pair">Crypto pair</label>
            <select name="cypto-pair" onChange={onChangeCrypto}>
              {CryptoPairOptions.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="type-of-trade">Type of trade</label>
            <input
              type="text"
              name="type-of-trade"
              id="type-of-trade"
              required
              value={typeOfTrade}
              onChange={(e) => setTypeOfTrade(e.target.value)}
            />

            <label htmlFor="prefrence">Trading Prefrence</label>
            <select name="prefrence" onChange={onChangePrefrence}>
              {tradePrefrenceOptions.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              ))}
            </select>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="recommendation">Recommendation (Strategy)</label>
            <textarea
              name="recommendation"
              id="recommendation"
              required
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
            ></textarea>

            <label htmlFor="outlook"> Outlook </label>
            <textarea
              name="outlook"
              id="outlook"
              required
              value={outlook}
              onChange={(e) => setOutlook(e.target.value)}
            ></textarea>

            <input type="submit" value="Post" />
          </form>
        </div>
      </React.Fragment>
    </div>
  );
}

export default MPost;
