
import { Shield, Github, Twitter, MessageCircle, Mail, Globe, Heart } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-md relative overflow-hidden">
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <SparklesCore
          id="footer-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={30}
          className="w-full h-full"
          particleColor="#0891B2"
          speed={0.5}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-indigo-400" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Web3 Buddy
              </h3>
            </div>
            <p className="text-slate-400 text-sm">
              Your friendly companion for learning Web3 technologies through interactive challenges and hands-on experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Learning</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Playground</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Challenges</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Achievements</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Progress</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>© 2025 Web3 Buddy. Built with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for Web3 Learning</span>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Globe className="h-4 w-4" />
              <span>Devnet Environment</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
