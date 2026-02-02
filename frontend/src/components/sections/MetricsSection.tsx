import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, BookMarked, TrendingUp, Star } from 'lucide-react'

const MetricCard = ({ icon: Icon, number, label, index }: any) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      className="text-center"
    >
      <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
        <Icon className="w-10 h-10 text-blue-600" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
      >
        <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {inView ? number : '0'}
        </p>
      </motion.div>
      <p className="text-gray-600 text-lg font-medium">{label}</p>
    </motion.div>
  )
}

export default function MetricsSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const metrics = [
    { icon: Users, number: '10,000+', label: 'Active Students' },
    { icon: BookMarked, number: '500+', label: 'Expert Teachers' },
    { icon: TrendingUp, number: '1,200+', label: 'Courses Available' },
    { icon: Star, number: '4.8★', label: 'Average Rating' },
  ]

  return (
    <section ref={ref} className="py-20 px-6 bg-white/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Thousands of Successful Learners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by students and educators worldwide
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
