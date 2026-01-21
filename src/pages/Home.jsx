import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Gallery from '../components/Gallery.jsx';
import Testimonials from '../components/Testimonals.jsx';

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery limit={4} />
      <Testimonials />
    </main>
  );
}

export default Home;
