import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
          variants={itemVariants}
        >
          Learn from the{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Best Teachers.
          </span>{' '}
          <br />
          <span className="text-4xl md:text-6xl">Anytime, Anywhere.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Discover top courses from expert instructors and start learning new skills today. Flexible, affordable, and designed for you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            Explore Courses
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>

          <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Learning Today
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-600"
          variants={itemVariants}
        >
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-900">10,000+</p>
            <p className="text-sm">Active Students</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-900">500+</p>
            <p className="text-sm">Expert Teachers</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <p className="font-semibold text-lg text-gray-900">4.8★</p>
            <p className="text-sm">Average Rating</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
