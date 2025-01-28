import React from 'react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Writer',
    content: 'TaleCraft has revolutionized how I approach storytelling. The AI suggestions are incredibly creative!'
  },
  {
    name: 'Mike Chen',
    role: 'Educator',
    content: 'My students love using TaleCraft. It makes creative writing engaging and fun.'
  },
  {
    name: 'Emma Davis',
    role: 'Book Enthusiast',
    content: 'Every story is unique and exciting. I never know where the narrative will take me next.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm">
              <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-purple-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
