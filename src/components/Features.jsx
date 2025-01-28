import React from 'react'
import { BeakerIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI Storytelling',
    description: 'Advanced AI creates unique narratives based on your inputs and choices.',
    icon: BeakerIcon
  },
  {
    name: 'Interactive Choices',
    description: 'Shape your story through meaningful decisions and custom actions.',
    icon: SparklesIcon
  },
  {
    name: 'Gamified Experience',
    description: 'Earn points and badges for creative choices and unique storylines.',
    icon: TrophyIcon
  }
]

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-gray-300">Discover what makes TaleCraft unique</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm">
              <feature.icon className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
