const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function isFirstCommit() {
    try {
        const {owner, repo} = github.context.repo;

        const token = core.getInput('github-token');
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const url = `https://api.github.com/repos/${owner}/${repo}/commits`
        const commitsResponse = await axios.get(
            url,
            {
                headers: headers,
                params: {per_page: 2}
            }
        );

        const commits = commitsResponse.data;

        if (commits.length === 1) {
            core.setOutput('isFirstCommit', 'true');
        } else {
            core.setOutput('isFirstCommit', 'false');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

isFirstCommit();
