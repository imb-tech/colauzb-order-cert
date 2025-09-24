import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, CheckCircle2 } from "lucide-react";

interface AdminDashboardProps {
  driversData: any[];
}

const AdminDashboard = ({ driversData }: AdminDashboardProps) => {
  const todayCount = driversData.filter(driver => 
    driver.completedAt.startsWith(new Date().toISOString().split('T')[0])
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Umumiy Ma'lumot</h2>
        <p className="text-muted-foreground">Yo'riqnomani tugallagan barcha haydovchilar ro'yxati</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Oy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCount}</div>
            <p className="text-xs text-muted-foreground">haydovchi yo'riqnomani tugalladi</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami Haydovchilar</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{driversData.length}</div>
            <p className="text-xs text-muted-foreground">barcha vaqt davomida</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">O'rtacha Qoidalar</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/8</div>
            <p className="text-xs text-muted-foreground">tugallangan qoidalar</p>
          </CardContent>
        </Card>
      </div>

      {/* Latest Drivers */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle>So'nggi Haydovchilar</CardTitle>
          <p className="text-sm text-muted-foreground">
            Eng so'nggi yo'riqnomani tugallagan haydovchilar
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {driversData.slice(0, 3).map((driver) => (
              <div key={driver.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div>
                  <h4 className="font-medium">{driver.fullName}</h4>
                  <p className="text-sm text-muted-foreground">{driver.carNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{new Date(driver.completedAt).toLocaleDateString('uz-UZ')}</p>
                  <Badge variant="secondary" className="bg-safety-green/10 text-safety-green border-safety-green/20">
                    Tasdiqlangan
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;