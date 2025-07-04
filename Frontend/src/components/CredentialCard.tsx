import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, Building, CheckCircle, Clock } from 'lucide-react';

interface CredentialCardProps {
  title: string;
  issuer: string;
  date: string;
  verified: boolean;
  type?: string;
}

const CredentialCard = ({ title, issuer, date, verified, type }: CredentialCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl">
      <CardContent className="p-3 sm:p-5">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <Award className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400 mt-1 flex-shrink-0" />
          <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
            {verified ? (
              <>
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                  Verified
                </Badge>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                  Pending
                </Badge>
              </>
            )}
          </div>
        </div>

        <h4 className="font-semibold text-slate-100 mb-2 text-sm sm:text-base leading-tight">{title}</h4>

        <div className="space-y-1 text-xs">
          <div className="flex items-center text-slate-300">
            <Building className="h-3 w-3 mr-2 flex-shrink-0" />
            <span className="truncate">{issuer}</span>
          </div>
          <div className="flex items-center text-slate-300">
            <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
            <span>{formatDate(date)}</span>
          </div>
        </div>

        {type && (
          <Badge className="mt-2 sm:mt-3 text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
            {type}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default CredentialCard;
