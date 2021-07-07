import { useEffect, useState } from "react";
import api from "../api";
import { UserResumeDto } from "../models";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserResumeDto[]>([]);

  useEffect(() => {
    api.users.fetchAll().then((_users) => {
      setIsLoading(false);
      console.log(_users);
      setUsers(_users);
    });
  }, []);

  return (
    <div>
      {isLoading && <span>LOADING</span>}
      {users.map((user) => (
        <>
          <div>{user.id}</div>
          <div>{user.login}</div>
        </>
      ))}
    </div>
  );
}
