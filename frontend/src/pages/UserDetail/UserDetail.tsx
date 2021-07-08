import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { UserDetailDto, UserRepositoryDto } from "../../models";
import "./UserDetail.css";
import github from "../../github.png";
import { RepositoryCard } from "../../components/RepositoryCard/RepositoryCard";
import { Loading } from "../../components/Loading/Loading";

export function UserDetail() {
  const param = useParams<{ username: string }>();

  const [userDetail, setUserDetail] = useState<UserDetailDto>({} as any);
  const [repos, setRepos] = useState<UserRepositoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(param);
    const detailPromise = api.users.fetchDetail(param.username);
    const reposPromise = api.users.fetchRepositories(param.username);
    Promise.all([detailPromise, reposPromise]).then(([detail, repos]) => {
      setUserDetail(detail);
      setRepos(repos);
      setIsLoading(false);
    });
  }, [param]);

  function getDateFormated(dateString: string) {
    try {
      const date = new Date(dateString);
      const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        date
      );
      const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
      const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
      return `${da}-${mo}-${ye}`;
    } catch (error) {
      return "";
    }
  }

  function render() {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        <div className="flex row color-white w-100 profile">
          <div className="flex user-info column w-100 mb-42">
            <div className="imgs">
              <img
                className="user-info-img"
                src={userDetail.avatar_url}
                alt=""
              />
              <a href={userDetail.html_url}>
                <img className="github-link" src={github} alt="" />
              </a>
            </div>
            <span className="user-id">Id: {userDetail.id}</span>
            <span className="username">{userDetail.login}</span>
            <span className="since">
              Member since: {getDateFormated(userDetail.created_at)}
            </span>
          </div>
          <div className="detail-container">
            {repos.map((repo) => (
              <RepositoryCard repoInfo={repo} key={`user_repo_${repo.id}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return render();
}
