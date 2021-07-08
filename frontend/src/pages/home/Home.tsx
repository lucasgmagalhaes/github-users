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
    console.log(isFetchingFromScroll.current);
    if (isFetchingFromScroll.current) {
      return;
    }
    const target = e.target as Document;
    const element = target.scrollingElement;
    if (element) {
      const limitForFetch = (element.scrollHeight * 70) / 100;
      const shouldFetch = element.scrollTop >= limitForFetch;
      if (shouldFetch) {
        isFetchingFromScroll.current = true;
        if (lastId.current > 0) {
          const moreUsers = await api.users.fetch(lastId.current);
          isFetchingFromScroll.current = false;
          setUsers((u) => [...u, ...moreUsers]);
        }
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

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
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDistinctUsers() {
    return users
      .map((item) => item.id)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((id) => users.find((u) => u.id === id)!);
  }

  return (
    <div className="container">
      <span className="title">Github Users</span>
      {isLoading && <Loading />}
      <div className="itens-container">
        {getDistinctUsers().map((user, index) => (
          <UserResume
            key={user?.id}
            displayDelay={index < 50 ? 100 + 120 * index : undefined}
            id={user?.id}
            imgUrl={user?.imgUrl}
            login={user?.login}
            onPress={() => history.push("/user/" + user?.login)}
          />
        ))}
      </div>
    </div>
  );
}
