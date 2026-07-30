import { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import ErrorMessage from "../Components/ErrorMessage";
import RepoList from "../Components/RepoList";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/Manthanchavda27/repos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch repositories");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "15px",
          backgroundColor: "#0c0a0a",
          color: "white",
        }}
      >
        My Projects
      </h1>

      <RepoList repos={repos} />
    </div>
  );
}

export default Projects;