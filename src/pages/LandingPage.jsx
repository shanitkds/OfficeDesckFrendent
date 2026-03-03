import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Roles from '../components/Roles'
import ContactPage from '../components/ContactPage'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div>

      <Navbar />

      <section id="hero" className="scroll-mt-32">
        <Hero />
      </section>

      <section id="features" className="scroll-mt-32">
        <Features />
      </section>

      <section id="how-it-works" className="scroll-mt-32">
        <HowItWorks />
      </section>

      <section id="roles" className="scroll-mt-32">
        <Roles />
      </section>

      <section id="contact" className="scroll-mt-32">
        <ContactPage/>
      </section>
      <Footer/>

    </div>
  )
}

export default LandingPage