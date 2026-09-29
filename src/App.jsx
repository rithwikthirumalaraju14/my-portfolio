import About from './components/About';
import Cta from './components/Cta';
import Experience from './components/Experience';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Experience />
        <About />
        <Testimonials />
        <Cta />
      </main>
    </>
  );
}
