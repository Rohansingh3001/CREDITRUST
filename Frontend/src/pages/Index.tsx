import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ContainerScrollAnimation } from "@/components/ui/container-scroll-animation";
import { Shield, Wallet, Database, Users, Award, Lock, Zap, Globe, ChevronRight, Star, TrendingUp, CheckCircle, Github, Twitter, MessageCircle, Mail } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';
import CredentialCard from '@/components/CredentialCard';
import TrustScore from '@/components/TrustScore';
import ActivityFeed from '@/components/ActivityFeed';
import Footer from '@/components/Footer';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Build trust through decentralized verification";

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isConnected) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-700/30 backdrop-blur-md bg-slate-900/40 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                CrediTrust
              </h1>
              <p className="text-xs text-slate-300 hidden sm:block">Decentralized Identity Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
              <span className="hidden sm:inline">Devnet</span>
              <span className="sm:hidden">Dev</span>
            </Badge>
            <WalletConnect isConnected={isConnected} onConnect={setIsConnected} />
          </div>
        </div>
      </header>

      {!isConnected ? (
        <div className="pb-0 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Shooting Stars Background */}
            <ShootingStars
              minSpeed={15}
              maxSpeed={35}
              minDelay={800}
              maxDelay={3000}
              starColor="#00FFFF"
              trailColor="#0891B2"
              starWidth={12}
              starHeight={2}
              className="z-0"
            />
            
            <div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            ></div>
            <div 
              className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" 
              style={{animationDelay: '2s', transform: `translateY(${scrollY * 0.2}px)`}}
            ></div>
            <div 
              className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" 
              style={{animationDelay: '4s', transform: `translateY(${scrollY * 0.4}px)`}}
            ></div>
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Hero Section */}
          <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-28 relative z-10">
            <div className="text-center mb-16 sm:mb-24">
              {/* Animated Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-4 sm:px-6 py-2 mb-8 backdrop-blur-sm animate-fade-in-up hover:scale-105 transition-transform duration-300">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400 mr-2 animate-bounce" />
                <span className="text-cyan-300 text-xs sm:text-sm font-medium">Powered by Blockchain Technology</span>
              </div>
              
              {/* Main Heading with Enhanced Animations */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent animate-fade-in-up leading-tight" style={{animationDelay: '0.2s'}}>
                <span className="inline-block hover:scale-110 transition-transform duration-300">Own,</span>{' '}
                <span className="inline-block hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.1s'}}>Control</span>{' '}
                <span className="inline-block hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.2s'}}>&</span>{' '}
                <span className="inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" style={{animationDelay: '0.3s'}}>Share</span>
                <br className="hidden md:block" />
                <span className="inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent" style={{animationDelay: '0.4s'}}>Your Digital Identity</span>
              </h2>

              {/* Subtitle with Typing Effect */}
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                CrediTrust lets you collect, verify and manage your credentials on-chain using{' '}
                <span className="text-cyan-400 font-semibold">Soulbound Tokens</span>. Your achievements are now truly yours —{' '}
                <br className="hidden sm:block" />
                <span className="inline-block">
                  {typedText}
                  <span className="animate-pulse text-cyan-400">|</span>
                </span>, immutable, and under your control.
              </p>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  <WalletConnect isConnected={false} onConnect={setIsConnected} />
                </div>
                <Button variant="outline" className="bg-transparent border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 w-full sm:w-auto group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <Globe className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Demo
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-400 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                  <Shield className="h-4 w-4" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer">
                  <Database className="h-4 w-4" />
                  <span>IPFS Powered</span>
                </div>
                <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  <Lock className="h-4 w-4" />
                  <span>Self-Sovereign</span>
                </div>
              </div>
            </div>

            {/* Dashboard Preview with Scroll Animation */}
            <ContainerScrollAnimation
              titleComponent={
                <div className="text-center animate-fade-in-up" style={{animationDelay: '1s'}}>
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 mb-6 backdrop-blur-sm">
                    <Award className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-purple-300 text-sm font-medium">Dashboard Preview</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                    Your Digital Identity{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Command Center
                    </span>
                  </h3>
                  <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                    See how your credentials, trust score, and digital identity come together in one powerful dashboard
                  </p>
                </div>
              }
              className="mb-16 sm:mb-24"
            >
              {/* Dashboard Content */}
              <div className="h-full bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-indigo-950/95 backdrop-blur-xl border border-slate-700/40 rounded-xl shadow-2xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-600/40 bg-gradient-to-r from-slate-800/80 via-slate-700/60 to-slate-800/80 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                      <Shield className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Welcome back, User</h4>
                      <p className="text-slate-300 text-xs sm:text-sm">Manage your digital identity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-emerald-500/30">
                      <div className="w-2 h-2 bg-white rounded-full drop-shadow-sm"></div>
                    </div>
                    <span className="text-emerald-300 text-xs sm:text-sm font-medium hidden sm:block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Trust Score: 947</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1">
                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { label: "Credentials", value: "12", icon: Award, color: "emerald", gradient: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/30" },
                      { label: "Verifications", value: "3", icon: CheckCircle, color: "cyan", gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
                      { label: "Trust Score", value: "947", icon: Star, color: "amber", gradient: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30" },
                      { label: "Network", value: "28", icon: Users, color: "purple", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30" }
                    ].map((stat, idx) => (
                      <div key={idx} className={`bg-gradient-to-br ${stat.gradient} rounded-lg p-3 sm:p-4 text-center border ${stat.border} backdrop-blur-sm stat-card hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-${stat.color}-500/25`}>
                        <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${stat.color}-400 mx-auto mb-1 sm:mb-2 hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                        <div className={`text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-sm`} style={{animation: 'stat-bounce 2s ease-in-out infinite', animationDelay: `${idx * 0.2}s`}}>{stat.value}</div>
                        <div className="text-xs text-slate-200 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Credentials and Activity Preview */}
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Credentials List */}
                    <div className="bg-gradient-to-br from-slate-800/60 via-cyan-900/20 to-slate-800/60 rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="h-4 w-4 text-cyan-400 drop-shadow-lg" />
                        <h5 className="text-white font-medium text-sm sm:text-base bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Recent Credentials</h5>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: "University Degree", issuer: "MIT", verified: true },
                          { title: "Professional Cert", issuer: "Google", verified: true },
                          { title: "Identity Proof", issuer: "Gov", verified: false }
                        ].map((cred, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-slate-800/50 hover:bg-slate-700/60 rounded-lg credential-item transition-all duration-300 border border-slate-600/20 hover:border-cyan-500/30">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-cyan-500/40">
                                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-300 drop-shadow-sm" />
                              </div>
                              <div>
                                <p className="text-white text-xs sm:text-sm font-medium">{cred.title}</p>
                                <p className="text-slate-300 text-xs">{cred.issuer}</p>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${cred.verified ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-amber-400 shadow-amber-400/50'} activity-dot ${cred.verified ? 'success' : 'pending'} shadow-lg`}></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity Feed Preview */}
                    <div className="bg-gradient-to-br from-slate-800/60 via-purple-900/20 to-slate-800/60 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Database className="h-4 w-4 text-purple-400 drop-shadow-lg" />
                        <h5 className="text-white font-medium text-sm sm:text-base bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Recent Activity</h5>
                      </div>
                      <div className="space-y-3">
                        {[
                          { action: "Credential verified", time: "2 hours ago", type: "success" },
                          { action: "Trust score updated", time: "1 day ago", type: "info" },
                          { action: "New verification request", time: "3 days ago", type: "pending" }
                        ].map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-800/50 hover:bg-slate-700/60 rounded-lg transition-all duration-300 border border-slate-600/20 hover:border-purple-500/30" style={{animation: 'credential-slide 0.5s ease forwards', animationDelay: `${idx * 0.1 + 0.5}s`}}>
                            <div className={`w-2 h-2 rounded-full activity-dot ${activity.type} shadow-lg ${
                              activity.type === 'success' ? 'bg-emerald-400 shadow-emerald-400/50' :
                              activity.type === 'info' ? 'bg-cyan-400 shadow-cyan-400/50' : 'bg-amber-400 shadow-amber-400/50'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-white text-xs sm:text-sm font-medium">{activity.action}</p>
                              <p className="text-slate-300 text-xs">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Footer */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-slate-800/80 via-slate-700/60 to-slate-800/80 border-t border-slate-600/40 mt-auto rounded-b-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/30"></div>
                      <span className="text-emerald-300 text-xs sm:text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">All systems operational</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-300">
                      <span>Powered by</span>
                      <span className="text-cyan-400 font-medium bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">CrediTrust</span>
                    </div>
                  </div>
                </div>

                {/* Floating Action Hint */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/40 rounded-full px-4 py-2 backdrop-blur-sm shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    <span className="text-cyan-200 text-xs sm:text-sm font-medium flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 animate-bounce text-cyan-300" />
                      <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Connect wallet to access your dashboard</span>
                    </span>
                  </div>
                </div>
              </div>
            </ContainerScrollAnimation>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
              {[
                {
                  icon: Shield,
                  title: "Soulbound Credentials",
                  description: "Issue non-transferable credentials as proof of your academic, professional, or community achievements. Immutable, verifiable, and unique to you.",
                  gradient: "from-cyan-500/20 to-blue-500/20",
                  iconColor: "text-cyan-400",
                  glowColor: "shadow-cyan-500/20",
                  borderColor: "hover:border-cyan-500/40",
                  delay: "0s",
                },
                {
                  icon: Database,
                  title: "Decentralized Storage",
                  description: "All your credentials are securely stored on IPFS — always accessible, censorship-resistant, and free from central authority.",
                  gradient: "from-purple-500/20 to-indigo-500/20",
                  iconColor: "text-purple-400",
                  glowColor: "shadow-purple-500/20",
                  borderColor: "hover:border-purple-500/40",
                  delay: "0.2s",
                },
                {
                  icon: Lock,
                  title: "Self-Sovereign Identity",
                  description: "You decide who can access your data. No centralized gatekeepers, no unnecessary exposure — just full privacy with selective disclosure.",
                  gradient: "from-emerald-500/20 to-cyan-500/20",
                  iconColor: "text-emerald-400",
                  glowColor: "shadow-emerald-500/20",
                  borderColor: "hover:border-emerald-500/40",
                  delay: "0.4s",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className={`
                    relative overflow-hidden
                    border border-slate-600/30 
                    backdrop-blur-sm 
                    bg-gradient-to-br from-slate-800/60 to-slate-900/40
                    transition-all duration-500 ease-out 
                    group cursor-pointer
                    animate-fade-in-up 
                    hover:scale-[1.04] hover:border-transparent 
                    hover:shadow-xl ${feature.glowColor}
                    ${feature.borderColor}
                  `}
                  style={{ animationDelay: feature.delay }}
                >
                  {/* Hover background overlay */}
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <CardHeader className="pb-4 relative z-10">
                    <feature.icon
                      className={`h-10 w-10 sm:h-12 sm:w-12 ${feature.iconColor} mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                    />
                    <CardTitle
                      className={`text-slate-100 text-lg sm:text-xl font-semibold transition-colors duration-300 group-hover:text-white`}
                    >
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription
                      className="text-slate-200 text-sm sm:text-base leading-relaxed transition-colors duration-300 group-hover:text-slate-100"
                    >
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Enhanced border-glow effect on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl border border-transparent group-hover:border-white/10 transition-all duration-500 z-0 pointer-events-none`}
                  ></div>
                </Card>
              ))}
            </div>


            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
              {[
                { label: "Verified Users", value: "12.4K", icon: Users, color: "emerald", delay: "0s" },
                { label: "Credentials Issued", value: "48.2K", icon: Award, color: "cyan", delay: "0.1s" },
                { label: "Trust Score Avg", value: "94.7", icon: Star, color: "amber", delay: "0.2s" },
                { label: "Network Growth", value: "+127%", icon: TrendingUp, color: "purple", delay: "0.3s" }
              ].map((stat, index) => (
                <div key={index} className={`text-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/40 rounded-xl border border-slate-600/30 hover:border-${stat.color}-500/40 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-${stat.color}-500/20 animate-fade-in-up group cursor-pointer`} style={{animationDelay: stat.delay}}>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${stat.color}-400 mx-auto mb-2 sm:mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-${stat.color}-400 transition-colors duration-300 counter-animation`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium group-hover:text-slate-100 transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Text Reveal Card Section */}
            <div className="mb-16 sm:mb-20 w-full">
              <TextRevealCard
                text="Shit!! My Credentials Got Lost"
                revealText="Ahh!! Relax We Hold It Safe"
                className="border-slate-600/40 hover:border-cyan-500/40 transition-colors duration-500 w-full max-w-none min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] rounded-xl"
              >
                <div className="p-6 sm:p-8 lg:p-10 text-center h-full flex flex-col justify-center">
                  <TextRevealCardTitle className="flex items-center justify-center gap-3 mb-4 text-lg sm:text-xl lg:text-2xl">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
                    Security & Privacy First
                  </TextRevealCardTitle>
                  <TextRevealCardDescription className="max-w-none text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
                    Built on blockchain technology with end-to-end encryption, your digital credentials 
                    are protected by cryptographic security. Only you control access to your data, 
                    ensuring complete privacy and ownership of your digital identity.
                  </TextRevealCardDescription>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                    <div className="flex items-center gap-2 text-sm sm:text-base text-emerald-400">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>End-to-End Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-cyan-400">
                      <Database className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Decentralized Storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base text-purple-400">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Immutable Records</span>
                    </div>
                  </div>
                </div>
              </TextRevealCard>
            </div>
          </div>
        </div>

      ) : (
        /* Dashboard */
        <div className="container mx-auto px-4 py-6 sm:py-8 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome back, Rohan</h2>
              <p className="text-slate-300 text-sm sm:text-base">Manage your decentralized identity and credentials</p>
            </div>
            <TrustScore score={947} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <TabsList className="bg-slate-800/60 border-slate-600/40 backdrop-blur-sm w-full sm:w-auto grid grid-cols-3 sm:flex">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300 text-xs sm:text-sm">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="credentials" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300 text-xs sm:text-sm">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Credentials</span>
                <span className="sm:hidden">Creds</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300 text-xs sm:text-sm">
                <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {[
                  { label: "Active Credentials", value: "12", change: "+2 this month", color: "text-emerald-400" },
                  { label: "Verification Requests", value: "3", change: "2 pending", color: "text-amber-400" },
                  { label: "Trust Score", value: "947", change: "+15 this week", color: "text-cyan-400" },
                  { label: "Network Connections", value: "28", change: "+5 new", color: "text-purple-400" }
                ].map((stat, index) => (
                  <Card key={index} className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm text-slate-200 font-medium mb-1 truncate">{stat.label}</p>
                          <p className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{stat.value}</p>
                          <p className={`text-xs sm:text-sm font-medium ${stat.color} truncate`}>{stat.change}</p>
                        </div>
                        <CheckCircle className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} flex-shrink-0 ml-2`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Credentials */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-slate-800/80 border-slate-600/50 backdrop-blur-sm">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-cyan-400" />
                      Recent Credentials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <CredentialCard 
                      title="University Degree" 
                      issuer="MIT" 
                      date="2024-01-15" 
                      verified={true} 
                    />
                    <CredentialCard 
                      title="Professional Certification" 
                      issuer="Google Cloud" 
                      date="2024-02-20" 
                      verified={true} 
                    />
                    <CredentialCard 
                      title="Identity Verification" 
                      issuer="ID.me" 
                      date="2024-03-01" 
                      verified={false} 
                    />
                  </CardContent>
                </Card>

                <ActivityFeed />
              </div>
            </TabsContent>

            <TabsContent value="credentials" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold text-white">Your Credentials</h3>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white w-full sm:w-auto">
                  <Award className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Request New Credential</span>
                  <span className="sm:hidden">Request New</span>
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { title: "University Degree", issuer: "MIT", type: "Education", verified: true },
                  { title: "Professional Cert", issuer: "Google", type: "Certification", verified: true },
                  { title: "Identity Proof", issuer: "Government", type: "Identity", verified: true },
                  { title: "Work Experience", issuer: "TechCorp", type: "Employment", verified: false },
                  { title: "Skill Assessment", issuer: "SkillTest", type: "Skills", verified: true },
                  { title: "Community Badge", issuer: "DevDAO", type: "Community", verified: true }
                ].map((cred, index) => (
                  <Card key={index} className="bg-slate-800/80 border-slate-600/50 hover:scale-105 transition-transform duration-200 backdrop-blur-sm hover:border-cyan-500/40">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <Award className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                        {cred.verified ? (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs">Verified</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-xs">Pending</Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-white mb-2 text-base sm:text-lg leading-tight">{cred.title}</h4>
                      <p className="text-sm text-slate-300 mb-1">Issued by {cred.issuer}</p>
                      <p className="text-xs text-slate-400">{cred.type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <ActivityFeed detailed={true} />
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
