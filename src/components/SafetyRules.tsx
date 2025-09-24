import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ChevronRight,
  Pencil,
  ChevronLeft
} from "lucide-react";
import { RulesContext } from "@/context/rules-context";

interface SafetyRulesProps {
  driverData: { carNumber: string; fullName: string };
  onComplete: () => void;
  onBack: () => void;
}

const SafetyRules = ({ driverData, onComplete, onBack }: SafetyRulesProps) => {
  const [currentRule, setCurrentRule] = useState(0);
  const [acknowledgedRules, setAcknowledgedRules] = useState<Set<number>>(new Set());
  const { rules } = useContext(RulesContext)

  const progress = ((currentRule + 1) / rules.length) * 100;
  const rule = rules[currentRule];

  const handleAcknowledge = () => {
    setAcknowledgedRules(prev => new Set([...prev, rule.id]));

    if (currentRule < rules.length - 1) {
      setCurrentRule(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentRule == 0) {
      window.location.reload()
    }
    if (currentRule > 0) {
      setAcknowledgedRules(prev => {
        prev.delete(currentRule)
        return new Set(prev)
      });
      setCurrentRule(prev => prev - 1);
    }
  };

  const isCurrentRuleAcknowledged = acknowledgedRules.has(rule.id);
  const allRulesAcknowledged = acknowledgedRules.size === rules.length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 flex flex-col">
      <div className="max-w-4xl mx-auto flex-1 h-full flex flex-col">
        {/* Progress */}
        <div className="mb-3">
          {progress < 100 && <Progress value={progress} className="h-2" />}
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl mb-2">Xavfsizlik Qoidalari</h1>
          <p className="text-[#6c757d] text-xs">
            Haydovchi: {driverData.fullName} |
            Mashina: {driverData.carNumber}
          </p>
        </div>

        {/* Rule Card */}
        <div className="flex-1 flex items-center">
          <Card className="mb-8 shadow-md border-none rounded-2xl bg-[#ffffff] max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center pb-4">
                <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 py-1 px-3 rounded-full flex items-center gap-1">
                  <span>Qoida</span>
                  <span>{currentRule + 1}/{rules.length}</span>
                </span>
              </div>
              <img src={rule.image} alt="" className="rounded-md" />
              <CardTitle className="text-2xl mb-2 text-[#212529]">
                {rule.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-[#6c757d] mb-8 leading-relaxed">
                {rule.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 justify-between py-3">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 text-[#6c757d]"
          >
            <ChevronLeft size={22} />
            <span className="text-sm">Oldingi</span>
          </button>

          {!isCurrentRuleAcknowledged ? (
            <Button
              onClick={handleAcknowledge}
              className="flex items-center gap-2 px-8 bg-[#007bff] rounded-3xl text-sm"
            >
              Tanishdim
              <ChevronRight />
            </Button>
          ) : (
            <Button
              onClick={onComplete}
              className="flex items-center gap-2 bg-safety-green hover:bg-safety-green/90 justify-center py-3 px-4 rounded-full"
            >
              Imzo qo'yishga o'tish
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div >
    </div >
  );
};

export default SafetyRules;