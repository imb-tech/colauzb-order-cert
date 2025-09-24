import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatisticsViewProps {
  driversData: any[];
}

const StatisticsView = ({ driversData }: StatisticsViewProps) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyDrivers = driversData.filter(driver => {
    const driverDate = new Date(driver.completedAt);
    return driverDate.getMonth() === currentMonth && driverDate.getFullYear() === currentYear;
  });

  const totalDrivers = driversData.length;
  const completedRules = 8; // Total rules

  // Mock rule statistics - in real app this would come from backend
  const ruleStats = [
    { id: 1, name: "Spirtli ichimlik iste'mol qilmaslik", completed: totalDrivers, total: totalDrivers },
    { id: 2, name: "Uchi temirli oyoq kiyim kiyish", completed: totalDrivers, total: totalDrivers },
    { id: 3, name: "Nur qaytaruvchi jiletka kiyish", completed: totalDrivers, total: totalDrivers },
    { id: 4, name: "Piyodalarga yo'l berish", completed: totalDrivers, total: totalDrivers },
    { id: 5, name: "Belgilangan hududdan chiqmaslik", completed: totalDrivers, total: totalDrivers },
    { id: 6, name: "Yuklash jarayonini kuzatish", completed: totalDrivers, total: totalDrivers },
    { id: 7, name: "Oxirgi qatordagi remen tortish", completed: totalDrivers, total: totalDrivers },
    { id: 8, name: "Tez yurmaslik va keskin tormoz bermaslik", completed: totalDrivers, total: totalDrivers },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Statistika</h2>
        <p className="text-muted-foreground">Yo'riqnoma va qoidalar bo'yicha batafsil ma'lumot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Statistics */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle>Oylik Statistika</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Bu oy:</span>
                <span className="font-bold">{monthlyDrivers.length} haydovchi</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Jami:</span>
                <span className="font-bold">{totalDrivers} haydovchi</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>O'rtacha qoidalar:</span>
                <span className="font-bold">{completedRules}/{completedRules}</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Rules Statistics */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle>Qoidalar Statistikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ruleStats.map((rule) => {
                const percentage = (rule.completed / rule.total) * 100;
                return (
                  <div key={rule.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Qoida {rule.id}:</span>
                      <span className="font-bold">
                        {rule.completed}/{rule.total} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-1" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsView;