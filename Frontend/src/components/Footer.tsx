
import { Shield, Github, Twitter, MessageCircle, Mail, Globe, Heart } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';

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
                CrediTrust
              </h3>
            </div>
            <p className="text-slate-400 text-sm">
              Empowering individuals with self-sovereign identity through blockchain technology and decentralized storage.
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
            <h4 className="font-medium text-slate-100">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Credentials</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Trust Score</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Verification</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-100">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Tutorials</a></li>
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
            <span>© 2025 CrediTrust. Built with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for Web3</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400 mt-4 md:mt-0">
            <Globe className="h-4 w-4" />
            <span>Devnet Environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
