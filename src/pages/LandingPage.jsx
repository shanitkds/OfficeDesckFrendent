import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Roles from '../components/Roles'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        <HowItWorks/>
        <Roles/>
    </div>
  )
}

export default LandingPage