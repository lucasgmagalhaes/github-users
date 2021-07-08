import { useEffect, useState } from "react";
import "./UserResume.css";
import { UserResumeProp } from "./UserResumeProps";

export function UserResume(props: UserResumeProp) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.displayDelay) {
      setTimeout(() => {
        setShow(true);
      }, props.displayDelay);
    } else {
      setShow(true);
    }
  }, [props.displayDelay]);

  return show ? (
    <div className="card slide-in-right" onClick={props.onPress}>
      <img className="photo" src={props.imgUrl} alt={`user's profile`} />
      <div className="stats">
        <span className="name">{props.login}</span>
      </div>
    </div>
  ) : (
    <></>
  );
}
