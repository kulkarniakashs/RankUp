import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RankUp
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">
            Courses
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition">
            Support
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 text-gray-900 font-medium hover:text-blue-600 transition">
            Sign Up
          </button>
          <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Log In
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Courses
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
              Support
            </a>
            <button className="w-full px-6 py-2 text-gray-900 font-medium border border-gray-300 rounded-lg hover:border-blue-600">
              Sign Up
            </button>
            <button className="w-full px-6 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg">
              Log In
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
