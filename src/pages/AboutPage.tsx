import React from 'react';
import { Book, Users, Award, Mail } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">About Herbal Wisdom</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Dedicated to preserving and sharing traditional herbal knowledge while bridging it
          with modern scientific research.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <Book className="mb-4 h-8 w-8 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              To provide accurate, well-researched information about medicinal herbs and
              empower individuals to make informed decisions about herbal remedies.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <Users className="mb-4 h-8 w-8 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Our Team</h2>
            <p className="text-gray-600">
              A diverse group of herbalists, researchers, and healthcare professionals
              committed to promoting herbal education and safety.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <Award className="mb-4 h-8 w-8 text-green-600" />
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Our Standards</h2>
            <p className="text-gray-600">
              We maintain high standards of accuracy and rely on peer-reviewed research to
              validate traditional herbal knowledge.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Commitment</h2>
        <div className="rounded-lg bg-green-50 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-green-800">
                Educational Resources
              </h3>
              <ul className="list-inside list-disc space-y-2 text-green-700">
                <li>Comprehensive herb profiles with scientific backing</li>
                <li>Detailed growing guides for medicinal plants</li>
                <li>Regular updates on herbal research</li>
                <li>Safety information and precautions</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold text-green-800">
                Quality Assurance
              </h3>
              <ul className="list-inside list-disc space-y-2 text-green-700">
                <li>Peer-reviewed content</li>
                <li>Regular fact-checking and updates</li>
                <li>Clear citations and references</li>
                <li>Expert consultation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <Mail className="mx-auto mb-4 h-12 w-12 text-green-600" />
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            Have questions or suggestions? We'd love to hear from you.
          </p>
          <a
            href="mailto:contact@herbalwisdom.com"
            className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}