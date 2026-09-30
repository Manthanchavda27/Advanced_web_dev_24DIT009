import { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import ErrorMessage from "../Components/ErrorMessage";
import RepoList from "../Components/RepoList";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  function fetchRepos() {
    setLoading(true);
    setError("");
    fetch("https://api.github.com/users/INVALID_USER_XYZ/repos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch repositories");
        return res.json();
      })
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) return <Spinner />;

  if (error) return <ErrorMessage message={error} onRetry={fetchRepos} />;

  const filtered = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "15px",
          backgroundColor: "#0c0a0a",
          color: "white",
        }}
      >
        My Projects
      </h2>

      <input
        type="text"
        placeholder="Search repositories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", margin: "12px auto", padding: "8px", width: "300px" }}
      />

      <RepoList repos={filtered} />
    </div>
  );
}

export default Projects;