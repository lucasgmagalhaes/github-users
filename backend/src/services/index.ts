import { GitHubService } from './octokit.service';
import { UserService } from './user.service';

const services = [UserService, GitHubService];
export default services;
