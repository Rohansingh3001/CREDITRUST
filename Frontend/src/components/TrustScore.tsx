import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Shield } from 'lucide-react';

interface TrustScoreProps {
  score: number;
}

const TrustScore = ({ score }: TrustScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 900) return "text-emerald-400";
    if (score >= 700) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 900) return "Excellent";
    if (score >= 700) return "Good";
    return "Fair";
  };

  const getBadgeColor = (score: number) => {
    if (score >= 900) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 700) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-2xl w-full sm:w-auto">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400" />
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-200">Trust Score</p>
              <div className="flex items-center space-x-2">
                <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                <Badge className={getBadgeColor(score)}>
                  {getScoreLabel(score)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <div className="flex items-center text-emerald-400 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15
            </div>
            <p className="text-xs text-slate-400">This week</p>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(score / 1000) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-200 mt-2">Based on verified credentials and network trust</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustScore;
