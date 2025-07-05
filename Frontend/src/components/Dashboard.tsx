import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gamepad2, Trophy, Target, ChevronRight, Play, Star, Clock,
  Wallet, FileSignature, Palette, Coins, Code, Users, Shield,
  BookOpen, Award, CheckCircle, TrendingUp
} from 'lucide-react';
import ActivityFeed from './ActivityFeed';
import { 
  getUserProfile, 
  getUserAchievements, 
  calculateTrustScore,
  getLearningModules,
  createUserProfile,
  completeAction,
  mintAchievementSBT
} from '@/config/aptos';

interface DashboardProps {
  onBackToHome: () => void;
}

const Dashboard = ({ onBackToHome }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [trustScore, setTrustScore] = useState(500);
  const [learningModules, setLearningModules] = useState<any[]>([]);
  const [userAddress, setUserAddress] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      
      // Get user's wallet address
      if (window.aptos) {
        const account = await window.aptos.account();
        setUserAddress(account.address);
        
        // Fetch user data from smart contract
        const profile = await getUserProfile(account.address);
        const userAchievements = await getUserAchievements(account.address);
        const score = await calculateTrustScore(account.address);
        const modules = await getLearningModules();
        
        setUserProfile(profile);
        setAchievements(userAchievements || []);
        setTrustScore(score);
        setLearningModules(modules || []);
        
        // If no profile exists, create one
        if (!profile) {
          await handleCreateProfile();
        }
      }
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      
      // Fallback to mock data if contract interaction fails
      setUserProfile({
        level: 3,
        xp: 1250,
        completed_actions: 8,
        username: 'Explorer'
      });
      setTrustScore(750);
      setLearningModules(getMockLearningModules());
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async () => {
    try {
      if (userAddress) {
        await createUserProfile(userAddress);
        // Refresh profile data
        const profile = await getUserProfile(userAddress);
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleCompleteAction = async (actionType: string) => {
    try {
      await completeAction(actionType);
      // Refresh user data
      await initializeDashboard();
    } catch (error) {
      console.error('Error completing action:', error);
    }
  };

  const handleMintAchievement = async (name: string, description: string) => {
    try {
      await mintAchievementSBT(name, description);
      // Refresh achievements
      const userAchievements = await getUserAchievements(userAddress);
      setAchievements(userAchievements || []);
    } catch (error) {
      console.error('Error minting achievement:', error);
    }
  };

  const getMockLearningModules = () => [
    {
      id: 1,
      title: "Wallet Basics",
      description: "Learn how to set up and secure your crypto wallet",
      difficulty: "Beginner",
      xp_reward: 100,
      completed: true,
      icon: Wallet,
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Smart Contracts 101",
      description: "Understanding blockchain smart contracts",
      difficulty: "Intermediate",
      xp_reward: 200,
      completed: false,
      icon: FileSignature,
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "NFT Creation",
      description: "Create and mint your first NFT",
      difficulty: "Advanced",
      xp_reward: 300,
      completed: false,
      icon: Palette,
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 4,
      title: "DeFi Fundamentals",
      description: "Explore decentralized finance protocols",
      difficulty: "Intermediate",
      xp_reward: 250,
      completed: false,
      icon: Coins,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 5,
      title: "dApp Development",
      description: "Build your first decentralized application",
      difficulty: "Advanced",
      xp_reward: 400,
      completed: false,
      icon: Code,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 6,
      title: "DAO Governance",
      description: "Participate in decentralized governance",
      difficulty: "Intermediate",
      xp_reward: 200,
      completed: false,
      icon: Users,
      color: "from-violet-500 to-purple-600"
    }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentModules = learningModules.length > 0 ? learningModules : getMockLearningModules();
  const displayName = userProfile?.username || 'Explorer';
  const userLevel = userProfile?.level || 3;
  const userXP = userProfile?.xp || 1250;
  const completedActions = userProfile?.completed_actions || 8;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Gamepad2 className="h-8 w-8 text-purple-400" />
            Welcome to your Playground, {displayName}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">Level {userLevel} Explorer • Continue your Web3 learning journey</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-xl px-4 py-3">
            <Trophy className="h-6 w-6 text-amber-400" />
            <div>
              <p className="text-amber-300 font-semibold text-lg">{userXP.toLocaleString()} XP</p>
              <p className="text-slate-300 text-xs">Total Earned</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-xl px-4 py-3">
            <Shield className="h-6 w-6 text-emerald-400" />
            <div>
              <p className="text-emerald-300 font-semibold text-lg">{trustScore}</p>
              <p className="text-slate-300 text-xs">Trust Score</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToHome}
            className="bg-slate-800/60 border-slate-600/40 text-slate-300 hover:bg-slate-700/60 hover:border-slate-500/60 hover:text-white transition-all duration-300"
          >
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        <TabsList className="bg-slate-800/60 border-slate-600/40 backdrop-blur-sm w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-slate-300 text-xs sm:text-sm">
            <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Playground</span>
            <span className="sm:hidden">Play</span>
          </TabsTrigger>
          <TabsTrigger value="credentials" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-slate-300 text-xs sm:text-sm">
            <Trophy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Achievements</span>
            <span className="sm:hidden">SBTs</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 text-slate-300 text-xs sm:text-sm">
            <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Progress</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
        </TabsList>

        {/* Playground Tab Content */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Learning Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {currentModules.map((module) => (
              <Card key={module.id} className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
                <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <module.icon className="h-8 w-8 text-purple-400" />
                    <Badge variant={module.completed ? "default" : "secondary"} className={module.completed ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-slate-500/20 text-slate-400 border-slate-500/30"}>
                      {module.completed ? "Completed" : module.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-sm">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold">{module.xp_reward} XP</span>
                    </div>
                    {module.completed && <CheckCircle className="h-5 w-5 text-emerald-400" />}
                  </div>
                  <Button 
                    className={`w-full ${module.completed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30'}`}
                    variant="outline"
                    onClick={() => module.completed ? null : handleCompleteAction(module.title)}
                    disabled={module.completed}
                  >
                    {module.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{completedActions}</p>
                <p className="text-slate-300 text-xs">Modules Completed</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl">
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{achievements.length}</p>
                <p className="text-slate-300 text-xs">Achievements</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{userLevel}</p>
                <p className="text-slate-300 text-xs">Current Level</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{trustScore}</p>
                <p className="text-slate-300 text-xs">Trust Score</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab Content */}
        <TabsContent value="credentials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <Card key={index} className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-2xl overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-600"></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Trophy className="h-8 w-8 text-amber-400" />
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">SBT</Badge>
                    </div>
                    <CardTitle className="text-white">{achievement.name || 'Achievement'}</CardTitle>
                    <CardDescription className="text-slate-300">{achievement.description || 'Well done!'}</CardDescription>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Trophy className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No achievements yet</p>
                <p className="text-slate-500 text-sm">Complete learning modules to earn your first SBT!</p>
                <Button 
                  className="mt-4 bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                  variant="outline"
                  onClick={() => handleMintAchievement("First Steps", "Completed your first learning module")}
                >
                  Mint Sample Achievement
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Activity Tab Content */}
        <TabsContent value="activity">
          <ActivityFeed detailed={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
