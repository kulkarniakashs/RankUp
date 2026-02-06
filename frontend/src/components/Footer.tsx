import { Mail, Linkedin, Twitter, Facebook } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-white">RankUp</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering students and teachers worldwide through accessible, affordable online education.
            </p>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Students</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Browse Courses</a></li>
              <li><a href="#" className="hover:text-white transition">Student Success</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Certificates</a></li>
            </ul>
          </div>

          {/* For Teachers */}
          <div>
            <h4 className="font-semibold text-white mb-4">For Teachers</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Create a Course</a></li>
              <li><a href="#" className="hover:text-white transition">Earn Money</a></li>
              <li><a href="#" className="hover:text-white transition">Teaching Resources</a></li>
              <li><a href="#" className="hover:text-white transition">Seller Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright & Links */}
          <div className="text-sm">
            <p className="mb-4 md:mb-0">
              © {currentYear} Eadn. All rights reserved. | 
              <a href="#" className="hover:text-white ml-2 transition">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-2 transition">Terms of Service</a>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
