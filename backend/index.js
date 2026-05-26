require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/repos', async (req, res) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) throw new Error('GitHub API error');

    const repos = await response.json();

    const cleaned = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      language: repo.language,
      updatedAt: repo.updated_at,
      topics: repo.topics
    }));

    res.json(cleaned);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/profile', async (req, res) => {
    try {
        const profileRes = await fetch(
            `https://api.github.com/users/${process.env.GITHUB_USERNAME}`,
            {
                headers : {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json'
                }
            }
        )
        if (!profileRes.ok) throw new Error('Github API error')
            const data = await profileRes.json()
        res.json({
            name: data.name,
            bio: data.bio,
            avatar: data.avatar_url,
            followers: data.followers,
            following: data.following,
            publicRepos: data.public_repos,
            location: data.location,
            url: data.html_url
        })
    }   catch (err) {
        res.status(500).json({ error: err.message})
    }
})
app.listen(3000, () => console.log('API running on http://localhost:3000'));