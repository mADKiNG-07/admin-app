import "./postcard.scss";
import btc from "./../../imgs/btc.png";
import usd from "./../../imgs/usd.png";
import euro from "./../../imgs/euro.png";
import gbp from "./../../imgs/gbp.png";
import xau from "./../../imgs/xau.png";
import nzd from "./../../imgs/nzd.png";
import aud from "./../../imgs/aud.png";
import non1 from "./../../imgs/non1.png";
import non2 from "./../../imgs/non2.png";
import { NavLink } from "react-router-dom";

function PostCard(props) {
  let image;
  switch (props.cryptoPair) {
    case "BTCUSD":
      image = {
        img1: btc,
        img2: usd,
      };
      break;
    case "XAUUSD":
      image = {
        img1: xau,
        img2: usd,
      };
      break;
    case "EURUSD":
      image = {
        img1: euro,
        img2: usd,
      };
      break;
    case "NZDUSD":
      image = {
        img1: nzd,
        img2: usd,
      };
      break;
    case "GBPUSD":
      image = {
        img1: gbp,
        img2: usd,
      };
      break;
    case "AUDUSD":
      image = {
        img1: aud,
        img2: usd,
      };
      break;
    default:
      image = {
        img1: non1,
        img2: non2,
      };
      break;
  }
  return (
    <div className="postcard">
      <div className="top">
        <div className="cryptoPair">
          <img className="img1" src={image.img1} alt="" width="20px" />
          <img className="img2" src={image.img2} alt="" width="20px" />
          <p>{props.cryptoPair}</p>
        </div>
        <img className="image" src={props.imgUrl} alt="" width="500" />
      </div>
      <div className="bottom">
        <p className="title">DESCRIPTION</p>
        <p className="text">{props.desc}</p>

        <p className="title2">OUTLOOK</p>
        <p className="text">{props.outlook}</p>

        <NavLink className="navlink" to={`/post/${props.id}`}>
          <button>
            <ion-icon name="information-circle-outline"></ion-icon>
            <p>View More Info...</p>
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default PostCard;
