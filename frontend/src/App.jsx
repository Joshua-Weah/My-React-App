import { useState, useEffect } from 'react'

function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('updated')

  useEffect(() => {
    fetch('/api/repos')
      .then(res => res.json())
      .then(data => { setRepos(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const languages = ['All', ...new Set(repos.map(r => r.language).filter(Boolean))]

  const filtered = repos
    .filter(r => filter === 'All' || r.language === filter)
    .sort((a, b) => sort === 'stars'
      ? b.stars - a.stars
      : new Date(b.updatedAt) - new Date(a.updatedAt))

  if (loading) return <div className="status">Loading repos...</div>
  if (error) return <div className="status">Error: {error}</div>

  return (
    <div className="app">
      <header>
        <h1>Joshua Weah</h1>
        <p>GitHub Portfolio</p>
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