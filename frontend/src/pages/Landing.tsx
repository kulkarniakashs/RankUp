import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/sections/HeroSection'
import ValuePropositionSection from '../components/sections/ValuePropositionSection'
import MetricsSection from '../components/sections/MetricsSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import TeacherRedirectSection from '../components/sections/TeacherRedirectSection'

function Landing() {
  return (
    <div className="w-full overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-green-50">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ValuePropositionSection />
        <MetricsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <TeacherRedirectSection />
      </main>
      <Footer />
    </div>
  )
}

export default Landing