import { RepositoryCardProps } from "./RepositoryCardProps";
import "./RepositoryCard.css";

export function RepositoryCard(props: RepositoryCardProps) {
  return (
    <div className="card m-20 flex column-fixed repo">
      <span className="repo-name">{props.repoInfo.name}</span>
      <span className="description">{props.repoInfo.description}</span>
    </div>
  );
}
