import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import api from "../../api";
import { UserResume } from "../../components";
import { Loading } from "../../components/Loading/Loading";
import { UserResumeDto } from "../../models";
import "./Home.css";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserResumeDto[]>([]);
  const isFetchingFromScroll = useRef(false);
  const lastId = useRef(0);

  const history = useHistory();

  const fetchUsersIfAlmostInBottom = useCallback(async (e: Event) => {
    if (isFetchingFromScroll.current) {
      return;
    }
    const target = e.target as Document;
    const element = target.scrollingElement;
    if (element) {
      const limitForFetch = (element.scrollHeight * 80) / 100;
      const shouldFetch = element.scrollTop >= limitForFetch;
      if (shouldFetch) {
        isFetchingFromScroll.current = true;
        if (lastId.current > 0) {
          console.log(lastId);
          const moreUsers = await api.users.fetch(lastId.current);
          isFetchingFromScroll.current = false;
          setUsers((u) => [...u, ...moreUsers]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (users.length > 1) {
      lastId.current = users[users.length - 1].id;
    }
  }, [users]);

  useEffect(() => {
    window.addEventListener("scroll", fetchUsersIfAlmostInBottom);
    api.users.fetch().then((_users) => {
      setIsLoading(false);
      setUsers((u) => [...u, ..._users]);
    });

    return () => {
      window.removeEventListener("scroll", fetchUsersIfAlmostInBottom);
      setUsers([]);
    };
  }, [fetchUsersIfAlmostInBottom]);

  return (
    <div className="container">
      <span className="title">Github Users</span>
      {isLoading && <Loading />}
      <div className="itens-container">
        {users.map((user, index) => (
          <UserResume
            displayDelay={100 + 120 * index}
            key={user.id}
            id={user.id}
            imgUrl={user.imgUrl}
            login={user.login}
            onPress={() => history.push("/user/" + user.login)}
          />
        ))}
      </div>
    </div>
  );
}
