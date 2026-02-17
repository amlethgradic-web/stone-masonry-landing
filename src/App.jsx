import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import PriceCalculator from './components/Calculator'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <PriceCalculator />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App