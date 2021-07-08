import { useEffect, useState } from "react";
import "./UserResume.css";
import { UserResumeProp } from "./UserResumeProps";

export function UserResume(props: UserResumeProp) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, props.displayDelay);
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
