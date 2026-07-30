function RepoList({ repos }) {
  return (
    <div>
      <h2>My GitHub Repositories</h2>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <h3>{repo.name}</h3>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {repo.html_url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;