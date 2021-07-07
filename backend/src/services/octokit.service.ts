import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';

@Injectable()
export class GitHubService {
  public readonly kit: Octokit;

  public get defaultHeaders() {
    return {
      accept: 'application/vnd.github.v3+json',
    };
  }

  constructor() {
    this.kit = new Octokit({
      //auth: process.env.GITHUB_TOKEN,
      auth: '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',
    });
  }
}
