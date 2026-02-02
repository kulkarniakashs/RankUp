import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function TeacherRedirectSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section className="py-20 px-6 bg-white/50 border-t border-gray-200">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Decorative separator */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        {/* Main Question */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          variants={itemVariants}
        >
          Are you a teacher?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Share your knowledge and earn by teaching students worldwide. Build your own course, set your own price, and create passive income.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={itemVariants}
        >
          <div className="p-4">
            <p className="font-semibold text-gray-900 mb-2">💰 Earn Money</p>
            <p className="text-sm text-gray-600">Set your own course prices and earn up to 70% revenue share</p>
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-900 mb-2">📚 Full Control</p>
            <p className="text-sm text-gray-600">Create courses your way with complete creative freedom</p>
          </div>
          <div className="p-4">
            <p className="font-semibold text-gray-900 mb-2">🌍 Global Reach</p>
            <p className="text-sm text-gray-600">Teach students from across the world without borders</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="group px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Teacher
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-sm text-gray-500"
          variants={itemVariants}
        >
          Join hundreds of educators already earning on our platform
        </motion.p>
      </motion.div>
    </section>
  )
}
