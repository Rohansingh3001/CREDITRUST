import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Award, Shield, Users, Database, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ActivityFeedProps {
  detailed?: boolean;
}

const ActivityFeed = ({ detailed = false }: ActivityFeedProps) => {
  const activities = [
    {
      id: 1,
      type: "credential_verified",
      title: "Professional Certification Verified",
      description: "Google Cloud certification has been verified by the issuer",
      timestamp: "2 hours ago",
      icon: CheckCircle,
      iconColor: "text-emerald-400",
      badge: "Verified"
    },
    {
      id: 2,
      type: "trust_score_update",
      title: "Trust Score Increased",
      description: "Your trust score increased by 15 points due to new verification",
      timestamp: "5 hours ago",
      icon: Shield,
      iconColor: "text-indigo-400",
      badge: "Score Update"
    },
    {
      id: 3,
      type: "credential_requested",
      title: "New Credential Request",
      description: "University of MIT has requested to issue you a degree credential",
      timestamp: "1 day ago",
      icon: Clock,
      iconColor: "text-amber-400",
      badge: "Pending"
    },
    {
      id: 4,
      type: "network_connection",
      title: "New Network Connection",
      description: "Connected with TechCorp for employment verification",
      timestamp: "2 days ago",
      icon: Users,
      iconColor: "text-purple-400",
      badge: "Network"
    },
    {
      id: 5,
      type: "data_stored",
      title: "Credential Data Stored",
      description: "Identity verification data securely stored on IPFS",
      timestamp: "3 days ago",
      icon: Database,
      iconColor: "text-blue-400",
      badge: "Storage"
    },
    {
      id: 6,
      type: "security_alert",
      title: "Security Check Completed",
      description: "Routine security audit completed successfully",
      timestamp: "1 week ago",
      icon: AlertCircle,
      iconColor: "text-orange-400",
      badge: "Security"
    }
  ];

  const displayActivities = detailed ? activities : activities.slice(0, 3);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "credential_verified": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "trust_score_update": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "credential_requested": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "network_connection": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "data_stored": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "security_alert": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-2xl">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-slate-100 flex items-center text-lg sm:text-xl">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-400" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
          >
            <activity.icon className={`h-4 w-4 sm:h-5 sm:w-5 mt-1 ${activity.iconColor} flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-100 leading-tight">{activity.title}</p>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">{activity.description}</p>
                </div>
                <Badge className={`text-xs ml-1 sm:ml-2 flex-shrink-0 ${getBadgeColor(activity.type)}`}>
                  {activity.badge}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1 sm:mt-2">{activity.timestamp}</p>
            </div>
          </div>
        ))}

        {!detailed && (
          <div className="text-center pt-2">
            <button className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
              View all activity →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
