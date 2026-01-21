import Gallery from '../components/Gallery.jsx';

function Portfolio() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p>A showcase of our finest work and memorable events</p>
        </div>
      </section>

      <Gallery />
    </main>
  );
}

export default Portfolio;
