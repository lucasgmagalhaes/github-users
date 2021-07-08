import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { UserDetailDto, UserRepositoryDto } from "../../models";
import "./UserDetail.css";

export function UserDetail() {
  const param = useParams<{ username: string }>();

  const [userDetail, setUserDetail] = useState<UserDetailDto>({} as any);
  const [repos, setRepos] = useState<UserRepositoryDto[]>([]);

  useEffect(() => {
    const detailPromise = api.users.fetchDetail(param.username);
    const reposPromise = api.users.fetchRepositories(param.username);
    Promise.all([detailPromise, reposPromise]).then(([detail, repos]) => {
      setUserDetail(detail);
      setRepos(repos);
    });
  }, [param.username]);

  return (
    <div className="container">
      <div className="detail-container">
        <img src={userDetail.avatar_url} alt="" />
        <span>{userDetail.name}</span>
        {repos.map((repo) => (
          <span>{repo.name}</span>
        ))}
      </div>
    </div>
  );
}
