import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'

const TestimonialCard = ({ name, role, text, rating, image, index }: any) => {
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
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-300 to-purple-300 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span>{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const testimonials = [
    {
      name: 'Emily S.',
      role: 'Student',
      text: 'This platform helped me master new skills so easily! The courses are well-structured and the instructors are incredibly knowledgeable.',
      rating: 5,
      image : '/images.jpg'
    },
    {
      name: 'James T.',
      role: 'Career Changer',
      text: 'Great courses and amazing instructors! I was able to transition into a new career path with confidence thanks to these comprehensive programs.',
      rating: 5,
      image : '/images (1).jpg'
    },
    {
      name: 'Sarah M.',
      role: 'Professional',
      text: 'Flexible learning that fits my busy schedule. The lifetime access means I can come back and refresh my knowledge anytime I need to.',
      rating: 5,
      image : '/images (2).jpg'
    },
  ]

  return (
    <section ref={ref} className="py-20 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What Students Love
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real experiences from learners like you
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} index={index} />
        ))}
      </div>
    </section>
  )
}
