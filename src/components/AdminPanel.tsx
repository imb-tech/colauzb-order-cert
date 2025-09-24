import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";
import DriversManagement from "./admin/DriversManagement";
import StatisticsView from "./admin/StatisticsView";
import InstructionsManagement from "./admin/InstructionsManagement";

// Mock data for demonstration
const mockDriverData = [
  {
    id: 1,
    fullName: "Ahmadjonov Jamshid",
    carNumber: "01A123BC",
    completedAt: "2024-01-15T14:30:00",
    certificateId: "XQ-123456",
    status: "completed"
  },
  {
    id: 2,
    fullName: "Karimov Aziz", 
    carNumber: "01B456DE",
    completedAt: "2024-01-15T13:45:00",
    certificateId: "XQ-123455",
    status: "completed"
  },
  {
    id: 3,
    fullName: "Toshmatov Bobur",
    carNumber: "01C789FG",
    completedAt: "2024-01-15T12:20:00", 
    certificateId: "XQ-123454",
    status: "completed"
  }
];

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("umumiy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-primary-foreground/80">Xavfsizlik Instruktaji Tizimi</p>
              </div>
            </div>
            <Button variant="secondary" onClick={onLogout}>
              Chiqish
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card">
            <TabsTrigger value="umumiy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Umumiy Ma'lumot
            </TabsTrigger>
            <TabsTrigger value="haydovchilar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Haydovchilar
            </TabsTrigger>
            <TabsTrigger value="statistika" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Statistika
            </TabsTrigger>
            <TabsTrigger value="qoidalar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Qoidalar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="umumiy">
            <AdminDashboard driversData={mockDriverData} />
          </TabsContent>

          <TabsContent value="haydovchilar">
            <DriversManagement driversData={mockDriverData} />
          </TabsContent>

          <TabsContent value="statistika">
            <StatisticsView driversData={mockDriverData} />
          </TabsContent>

          <TabsContent value="qoidalar">
            <InstructionsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;