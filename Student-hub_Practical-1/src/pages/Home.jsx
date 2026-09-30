import About from "../Components/About";
import Skills from "../Components/Skills";

function Home({ skillslist }) {
  return (
    <>
      <h2>Welcome to My Portfolio</h2>
      <p>This is the Home page.</p>
      <About />
      <Skills skillslist={skillslist} />
    </>
  );
}

export default Home;