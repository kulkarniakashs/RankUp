import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Clock, Lock, Award } from 'lucide-react'

const ValueCard = ({ icon: Icon, title, description, index }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg hover:shadow-2xl hover:border-purple-200 transition-all duration-300 group cursor-pointer"
    >
      <div className="mb-6 inline-flex p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function ValuePropositionSection() {
  const values = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description:
        'Learn from industry professionals and experienced educators who are passionate about sharing their knowledge.',
    },
    {
      icon: Clock,
      title: 'Learn at Your Pace',
      description:
        'Access course materials anytime, anywhere. Study when it fits your schedule, not the other way around.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description:
        'Safe and encrypted transactions. Your payment information is always protected with industry-leading security.',
    },
    {
      icon: Award,
      title: 'Lifetime Access',
      description:
        'Purchase once, access forever. Get lifetime access to course materials and all future updates.',
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
          Why Choose Our Platform?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need for a transformative learning experience
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {values.map((value, index) => (
          <ValueCard key={index} {...value} index={index} />
        ))}
      </div>
    </section>
  )
}
