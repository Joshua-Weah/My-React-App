import { useState, useEffect } from 'react'

function App() {
  const [repos, setRepos] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('updated')

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/repos`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/profile`).then(res => res.json())
    ]).then(([repoData, profileData]) => {
      setRepos(Array.isArray(repoData) ? repoData : [])
      setProfile(profileData.name ? profileData : null)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))]

  const filtered = repos
    .filter(r => filter === 'All' || r.language === filter)
    .sort((a, b) => sort === 'stars'
      ? b.stars - a.stars
      : new Date(b.updatedAt) - new Date(a.updatedAt))

  if (loading) return <div className="status">Loading...</div>
if (!profile) return <div className="status">Could not load profile — try refreshing.</div>
  return (
    <div className="app">
      <header>
        <img src={profile.avatar} alt={profile.name} className="avatar" />
        <div className="profile-info">
          <h1>{profile.name}</h1>
          {profile.bio && <p className="bio">{profile.bio}</p>}
          <div className="profile-stats">
            {profile.location && <span>📍 {profile.location}</span>}
            <span>👥 {profile.followers} followers</span>
            <span>📦 {profile.publicRepos} repos</span>
          </div>
          <div className="profile-links">
            <a href={profile.url} target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/joshuaweah" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filters">
          {languages.map(lang => (
            <button
              key={lang}
              className={filter === lang ? 'active' : ''}
              onClick={() => setFilter(lang)}
            >{lang}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="updated">Recently updated</option>
          <option value="stars">Most stars</option>
        </select>
      </div>

      <div className="grid">
        {filtered.map(repo => (
          <a key={repo.id} href={repo.url} target="_blank" rel="noreferrer" className="card">
            <div className="card-top">
              <h2>{repo.name}</h2>
              {repo.language && <span className="lang">{repo.language}</span>}
            </div>
            <p>{repo.description || 'No description'}</p>
            <div className="card-bottom">
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
              <span>{new Date(repo.updatedAt).toLocaleDateString('en-GB')}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default App