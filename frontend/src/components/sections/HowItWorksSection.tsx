import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, CreditCard, Play } from 'lucide-react'

const StepCard = ({ number, icon: Icon, title, description, index }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Step Number and Icon */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            {number}
          </div>
          {index < 2 && (
            <div className="hidden md:block w-1 h-16 bg-gradient-to-b from-purple-400 to-transparent mt-4"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-white/80 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      icon: Search,
      title: 'Browse Courses',
      description:
        'Explore our extensive catalog of courses across various subjects. Filter by skill level, price, instructor rating, and more to find the perfect course for you.',
    },
    {
      number: '2',
      icon: CreditCard,
      title: 'Make Your Payment',
      description:
        'Proceed with a secure checkout. We support all major payment methods and ensure your transaction is encrypted and safe.',
    },
    {
      number: '3',
      icon: Play,
      title: 'Start Learning Instantly',
      description:
        'Get immediate access to all course materials. Learn at your own pace with lifetime access to videos, resources, and community support.',
    },
  ]

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Three simple steps to start your learning journey
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <StepCard key={index} {...step} index={index} />
        ))}
      </div>
    </section>
  )
}
