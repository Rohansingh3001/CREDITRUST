import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from "@/components/ui/text-reveal-card";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { ContainerScrollAnimation } from "@/components/ui/container-scroll-animation";
import { Gamepad2, Wallet, Trophy, Users, Award, Zap, Globe, ChevronRight, Star, Target, CheckCircle, Coins, Palette, FileSignature, Hash, Play, Rocket, BookOpen, Code, Shield, Database, Clock } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [triggerConnect, setTriggerConnect] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const fullText = "No tutorials, just pure hands-on experience";

  // Debug: Log connection state changes
  useEffect(() => {
    console.log('Connection state changed:', { isConnected, isConnecting });
  }, [isConnected, isConnecting]);

  // Function to trigger wallet connection and launch Petra
  const handlePlaygroundStart = async () => {
    if (!isConnected) {
      setIsConnecting(true);
      setTriggerConnect(true);
      
      try {
        // Check if Petra wallet is installed
        if (typeof window !== 'undefined' && window.aptos) {
          // Trigger wallet connection
          const response = await window.aptos.connect();
          console.log('Petra wallet connected:', response);
          
          // Small delay to ensure connection is established
          setTimeout(async () => {
            try {
              // Verify the connection was successful
              const isConnectedResult = await window.aptos.isConnected();
              if (isConnectedResult) {
                // Update connection state immediately to show dashboard
                setIsConnected(true);
                setIsConnecting(false);
                setTriggerConnect(false);
                console.log('Successfully connected to Petra wallet - switching to dashboard');
                return;
              }
            } catch (verifyError) {
              console.error('Error verifying connection:', verifyError);
              // Force connection state to true if we got a successful response
              if (response && (response.address || response.publicKey)) {
                setIsConnected(true);
                setIsConnecting(false);
                setTriggerConnect(false);
                console.log('Connection verified via response data - switching to dashboard');
                return;
              }
            }
          }, 500);
          
        } else {
          // Petra wallet not installed, redirect to install page
          console.log('Petra wallet not installed, redirecting to install page');
          window.open('https://petra.app/', '_blank');
          setIsConnecting(false);
          setTriggerConnect(false);
          return;
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        setIsConnecting(false);
        setTriggerConnect(false);
      }
      
      // Reset trigger after a delay if connection wasn't successful
      setTimeout(() => {
        setTriggerConnect(false);
        if (!isConnected) {
          setIsConnecting(false);
        }
      }, 3000);
    } else {
      // Already connected, just show dashboard
      console.log('Wallet already connected, showing dashboard');
    }
  };

  // Get button text based on connection status
  const getButtonText = () => {
    if (isConnecting) {
      return "Connecting to Petra...";
    }
    if (isConnected) {
      return "Enter Playground";
    }
    return "Connect Petra & Start";
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.aptos) {
        try {
          const isConnectedResult = await window.aptos.isConnected();
          if (isConnectedResult) {
            setIsConnected(true);
            console.log('Wallet already connected on page load');
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };
    
    checkWalletConnection();

    // Listen for wallet connection events
    const handleAccountChange = () => {
      console.log('Wallet account changed, checking connection status');
      checkWalletConnection();
    };

    // Add event listener for account changes (if available)
    if (typeof window !== 'undefined' && window.aptos) {
      window.addEventListener('aptos:accountChanged', handleAccountChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('aptos:accountChanged', handleAccountChange);
      }
    };
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

  // Auto-switch to dashboard when wallet connects and stop connecting state
  useEffect(() => {
    if (isConnected) {
      setIsConnecting(false);
      setTriggerConnect(false);
      console.log('Wallet connected - switching to dashboard view');
      // Dashboard will automatically show due to conditional rendering
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Header */}
      <header className="border-b border-slate-700/30 backdrop-blur-md bg-slate-900/40 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Web3Buddy
              </h1>
              <p className="text-xs text-slate-300 hidden sm:block">Your Web3 Learning Playground</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full mr-1 sm:mr-2 animate-pulse"></div>
              <span className="hidden sm:inline">Devnet</span>
              <span className="sm:hidden">Dev</span>
            </Badge>
            <ThemeToggle />
            <WalletConnect 
              isConnected={isConnected} 
              onConnect={(connected) => {
                setIsConnected(connected);
                if (connected) {
                  setIsConnecting(false);
                  setTriggerConnect(false);
                  console.log('Wallet connected via WalletConnect - switching to dashboard');
                }
              }}
            />
          </div>
        </div>
      </header>

      {!isConnected ? (
        <div className="pb-0 relative overflow-hidden">
          {/* Landing Page Content */}
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
              <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 mb-8 backdrop-blur-sm animate-fade-in-up hover:scale-105 transition-transform duration-300">
                <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 mr-2 animate-bounce" />
                <span className="text-purple-300 text-xs sm:text-sm font-medium">Play. Learn. Level Up.</span>
              </div>
              
              {/* Main Heading with Enhanced Animations */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in-up leading-tight" style={{animationDelay: '0.2s'}}>
                <span className="inline-block hover:scale-110 transition-transform duration-300">Your</span>{' '}
                <span className="inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent" style={{animationDelay: '0.1s'}}>Web3</span>{' '}
                <br className="hidden md:block" />
                <span className="inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" style={{animationDelay: '0.2s'}}>Playground</span>{' '}
                <span className="inline-block hover:scale-110 transition-transform duration-300" style={{animationDelay: '0.3s'}}>Awaits</span>
              </h2>

              {/* Subtitle with Typing Effect */}
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                Skip the tutorials. Dive straight into Web3. Connect your Petra wallet, sign messages, mint NFTs, and{' '}
                <span className="text-purple-400 font-semibold">earn real Soulbound achievements</span> on Aptos.{' '}
                <br className="hidden sm:block" />
                <span className="inline-block">
                  {typedText}
                  <span className="animate-pulse text-cyan-400">|</span>
                </span>. Every action teaches you something new.
              </p>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                  <Button 
                    size="lg" 
                    onClick={handlePlaygroundStart}
                    disabled={isConnecting}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group px-8 py-6 text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Play className={`mr-2 h-5 w-5 group-hover:rotate-12 transition-transform ${isConnecting ? 'animate-spin' : ''}`} />
                    {getButtonText()}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handlePlaygroundStart}
                  disabled={isConnecting}
                  className="bg-transparent border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 w-full sm:w-auto group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Rocket className={`h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300 ${isConnecting ? 'animate-spin' : ''}`} />
                  {isConnecting ? "Connecting to Petra..." : (isConnected ? "Enter Playground" : "Connect & Explore")}
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-slate-400 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                <div className="flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer">
                  <Target className="h-4 w-4" />
                  <span>Real Web3 Actions</span>
                </div>
                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
                  <Trophy className="h-4 w-4" />
                  <span>Earn SBT Achievements</span>
                </div>
                <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                  <CheckCircle className="h-4 w-4" />
                  <span>Learn by Doing</span>
                </div>
              </div>
            </div>

            {/* Dashboard Preview with Scroll Animation */}
            <ContainerScrollAnimation
              titleComponent={
                <div className="text-center animate-fade-in-up" style={{animationDelay: '1s'}}>
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-4 sm:px-6 py-2 mb-6 backdrop-blur-sm">
                    <Gamepad2 className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-purple-300 text-sm font-medium">Playground Preview</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                    Your Web3 Learning{' '}
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Adventure Dashboard
                    </span>
                  </h3>
                  <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                    Track your progress, collect achievements, and level up your Web3 skills through hands-on actions
                  </p>
                </div>
              }
              className="mb-16 sm:mb-24"
            >
              {/* Dashboard Content */}
              <div className="h-full bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-cyan-950/95 backdrop-blur-xl border border-purple-700/40 rounded-xl shadow-2xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-purple-600/40 bg-gradient-to-r from-purple-800/80 via-slate-700/60 to-cyan-800/80 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                      <Gamepad2 className="h-5 w-5 text-white drop-shadow-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">Web3 Playground</h4>
                      <p className="text-slate-100 text-xs sm:text-sm font-medium drop-shadow-sm">Level 3 Explorer • 12 Actions Complete</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-cyan-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-purple-500/30">
                      <Trophy className="w-3 h-3 text-white drop-shadow-sm" />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-semibold drop-shadow-sm">1,250 XP</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1">
                  {/* Quick Actions Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { label: "Actions Done", value: "12", icon: Target, color: "purple", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/30" },
                      { label: "XP Earned", value: "1.2K", icon: Star, color: "cyan", gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
                      { label: "SBT Earned", value: "7", icon: Trophy, color: "amber", gradient: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30" },
                      { label: "Level", value: "3", icon: Rocket, color: "emerald", gradient: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/30" }
                    ].map((stat, idx) => (
                      <div key={idx} className={`bg-gradient-to-br ${stat.gradient} rounded-lg p-3 sm:p-4 text-center border ${stat.border} backdrop-blur-sm stat-card hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-${stat.color}-500/25`}>
                        <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${stat.color}-400 mx-auto mb-1 sm:mb-2 hover:scale-110 transition-transform duration-300 drop-shadow-lg`} />
                        <div className={`text-lg sm:text-xl font-bold text-white mb-1 drop-shadow-md`} style={{animation: 'stat-bounce 2s ease-in-out infinite', animationDelay: `${idx * 0.2}s`}}>{stat.value}</div>
                        <div className="text-xs text-slate-100 font-semibold drop-shadow-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions and Achievements Preview */}
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Available Actions */}
                    <div className="bg-gradient-to-br from-slate-800/60 via-purple-900/20 to-slate-800/60 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Play className="h-4 w-4 text-purple-400 drop-shadow-lg" />
                        <h5 className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">Next Actions</h5>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: "Connect Wallet", xp: "+100 XP", ready: true, icon: Wallet },
                          { title: "Sign Message", xp: "+150 XP", ready: false, icon: FileSignature },
                          { title: "Mint Your First NFT", xp: "+250 XP", ready: false, icon: Palette }
                        ].map((action, idx) => (
                          <div key={idx} className={`flex items-center justify-between p-2 sm:p-3 bg-slate-800/50 hover:bg-slate-700/60 rounded-lg playground-item transition-all duration-300 border border-slate-600/20 hover:border-purple-500/30 ${action.ready ? 'hover:border-green-500/40' : 'opacity-70'}`}>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${action.ready ? 'from-purple-400/30 to-cyan-500/30' : 'from-gray-500/30 to-gray-600/30'} rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border ${action.ready ? 'border-purple-500/40' : 'border-gray-500/40'}`}>
                                <action.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${action.ready ? 'text-purple-300' : 'text-gray-400'} drop-shadow-sm`} />
                              </div>
                              <div>
                                <p className={`text-xs sm:text-sm font-semibold ${action.ready ? 'text-white drop-shadow-sm' : 'text-slate-400'}`}>{action.title}</p>
                                <p className={`text-xs font-medium ${action.ready ? 'text-slate-200 drop-shadow-sm' : 'text-slate-500'}`}>{action.xp}</p>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${action.ready ? 'bg-green-400 shadow-green-400/50 activity-dot success' : 'bg-gray-500 shadow-gray-500/50'} shadow-lg`}></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Achievements */}
                    <div className="bg-gradient-to-br from-slate-800/60 via-cyan-900/20 to-slate-800/60 rounded-lg p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-cyan-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-4 w-4 text-cyan-400 drop-shadow-lg" />
                        <h5 className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">Achievements</h5>
                      </div>
                      <div className="space-y-3">
                        {[
                          { title: "First Message Signed", reward: "Digital Signature SBT", type: "success" },
                          { title: "Wallet Connected", reward: "Web3 Explorer SBT", type: "success" },
                          { title: "First Transaction", reward: "Pending", type: "pending" }
                        ].map((achievement, idx) => (
                          <div key={idx} className={`flex items-center justify-between p-2 sm:p-3 bg-slate-800/50 hover:bg-slate-700/60 rounded-lg playground-stat transition-all duration-300 border border-slate-600/20 hover:border-cyan-500/30`}>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br ${achievement.type === 'success' ? 'from-cyan-400/30 to-blue-500/30' : 'from-amber-400/30 to-orange-500/30'} rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 border ${achievement.type === 'success' ? 'border-cyan-500/40' : 'border-amber-500/40'}`}>
                                <Trophy className={`h-3 w-3 sm:h-4 sm:w-4 ${achievement.type === 'success' ? 'text-cyan-300' : 'text-amber-300'} drop-shadow-sm`} />
                              </div>
                              <div>
                                <p className="text-white text-xs sm:text-sm font-semibold drop-shadow-sm">{achievement.title}</p>
                                <p className={`text-xs font-medium drop-shadow-sm ${achievement.type === 'success' ? 'text-emerald-200' : 'text-amber-200'}`}>{achievement.reward}</p>
                              </div>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${achievement.type === 'success' ? 'bg-emerald-400 shadow-emerald-400/50 activity-dot success' : 'bg-amber-400 shadow-amber-400/50 activity-dot pending'} shadow-lg`}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ContainerScrollAnimation>
          </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
              {[
                {
                  icon: Wallet,
                  title: "Connect & Play",
                  description: "Connect your Petra wallet and start your Web3 journey immediately. No setup, no barriers — just connect and dive in.",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  iconColor: "text-purple-400",
                  glowColor: "shadow-purple-500/20",
                  borderColor: "hover:border-purple-500/40",
                  delay: "0s",
                },
                {
                  icon: Gamepad2,
                  title: "Hands-on Learning",
                  description: "Experience Web3 actions firsthand. Sign messages, mint NFTs, and interact with smart contracts — learn by actually doing.",
                  gradient: "from-cyan-500/20 to-blue-500/20",
                  iconColor: "text-cyan-400",
                  glowColor: "shadow-cyan-500/20",
                  borderColor: "hover:border-cyan-500/40",
                  delay: "0.2s",
                },
                {
                  icon: Trophy,
                  title: "Earn Achievements",
                  description: "Every action earns you Soulbound tokens on Aptos. Build your Web3 reputation while mastering the technology.",
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
                { label: "Active Players", value: "5.2K", icon: Users, color: "emerald", delay: "0s" },
                { label: "Actions Completed", value: "89.4K", icon: Target, color: "purple", delay: "0.1s" },
                { label: "SBTs Earned", value: "34.7K", icon: Trophy, color: "amber", delay: "0.2s" },
                { label: "XP Distributed", value: "2.1M", icon: Star, color: "cyan", delay: "0.3s" }
              ].map((stat, index) => (
                <div key={index} className={`text-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/40 rounded-xl border border-slate-600/30 hover:border-${stat.color}-500/40 transition-all duration-500 backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-${stat.color}-500/20 animate-fade-in-up group cursor-pointer`} style={{animationDelay: stat.delay}}>
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${stat.color}-400 mx-auto mb-2 sm:mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-${stat.color}-400 transition-colors duration-300 counter-animation`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium group-hover:text-slate-100 transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Text Reveal Card Section */}
            <div className="mb-16 sm:mb-20 w-full relative">
              {/* Background glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-emerald-500/5 rounded-xl blur-3xl"></div>
              
              <TextRevealCard
                text="Confused by Web3 tutorials?"
                revealText="Skip them, just start playing!"
                className="relative border-slate-600/40 hover:border-purple-500/40 transition-all duration-500 w-full max-w-none min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] rounded-xl shadow-2xl hover:shadow-purple-500/10 bg-gradient-to-br from-slate-900/80 via-purple-950/20 to-slate-900/80 backdrop-blur-md"
              >
                <div className="p-8 sm:p-10 lg:p-12 text-center h-full flex flex-col justify-center relative overflow-hidden">
                  {/* Enhanced background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>

                  {/* Enhanced Title with animation */}
                  <TextRevealCardTitle className="flex items-center justify-center gap-3 mb-6 text-xl sm:text-2xl lg:text-3xl relative z-10 group">
                    <div className="relative">
                      <Gamepad2 className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-lg" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent font-bold">
                      Learning Through Action
                    </span>
                  </TextRevealCardTitle>

                  {/* Enhanced Description */}
                  <TextRevealCardDescription className="max-w-none text-slate-200 leading-relaxed text-base sm:text-lg lg:text-xl mb-8 relative z-10 font-medium">
                    Experience real Web3 interactions and earn{' '}
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                      Soulbound achievements
                    </span>{' '}
                    on Aptos. Every action teaches you something new,{' '}
                    <br className="hidden sm:block" />
                    building your skills naturally without overwhelming theory.{' '}
                    <span className="text-emerald-400 font-semibold">Learn by doing, level up through playing.</span>
                  </TextRevealCardDescription>

                  {/* Enhanced Feature Pills */}
                  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 relative z-10">
                    {[
                      { icon: Play, text: "Hands-on Experience", color: "purple", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/40" },
                      { icon: Trophy, text: "Earn SBT Rewards", color: "amber", gradient: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/40" },
                      { icon: Target, text: "Real Web3 Actions", color: "emerald", gradient: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/40" }
                    ].map((feature, idx) => (
                      <div 
                        key={idx}
                        className={`
                          flex items-center gap-2 px-4 py-3 rounded-full 
                          bg-gradient-to-r ${feature.gradient} 
                          border ${feature.border} 
                          backdrop-blur-sm transition-all duration-300 
                          hover:scale-105 hover:shadow-lg hover:shadow-${feature.color}-500/25
                          text-sm sm:text-base font-medium group cursor-pointer
                        `}
                        style={{animationDelay: `${idx * 0.2}s`}}
                      >
                        <feature.icon className={`h-4 w-4 sm:h-5 sm:w-5 text-${feature.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-sm`} />
                        <span className={`text-${feature.color}-300 group-hover:text-${feature.color}-200 transition-colors duration-300 drop-shadow-sm`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Additional interactive stats */}
                  <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-8 relative z-10">
                    {[
                      { label: "Active Learners", value: "5.2K+", icon: Users },
                      { label: "SBTs Minted", value: "34.7K+", icon: Award },
                      { label: "Actions Completed", value: "89.4K+", icon: CheckCircle }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center group cursor-pointer hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <stat.icon className="h-4 w-4 text-slate-400 group-hover:text-purple-400 transition-colors duration-300" />
                          <span className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                            {stat.value}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TextRevealCard>
            </div>
          </div>
      ) : (
        /* Web3 Playground Dashboard */
        <Dashboard onBackToHome={() => setIsConnected(false)} />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
