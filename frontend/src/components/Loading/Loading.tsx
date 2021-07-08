import img from "../../giphy.webp";
import "./Loading.css";

export function Loading() {
  return (
    <div className="loading-container fade-out">
      <img className="loading-img" src={img} alt="loading" />
    </div>
  );
}
