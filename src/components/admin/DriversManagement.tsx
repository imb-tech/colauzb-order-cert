import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search,
  Download,
  Eye,
  CheckCircle2
} from "lucide-react";

interface DriversManagementProps {
  driversData: any[];
}

const DriversManagement = ({ driversData }: DriversManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredDrivers = driversData.filter(driver => 
    driver.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.carNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString("uz-UZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit", 
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Barcha Haydovchilar</h2>
        <p className="text-muted-foreground">Yo'riqnomani tugallagan barcha haydovchilar ro'yxati</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle>Qidiruv va Filtrlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Ism yoki mashina raqami bo'yicha qidirish</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Qidirish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="md:w-48">
              <Label htmlFor="date">Sana</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Eksport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drivers Table */}
      <Card className="bg-card border border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ism Familiya</TableHead>
                <TableHead>Mashina Raqami</TableHead>
                <TableHead>Tugallangan Sana</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Ma'lumot topilmadi
                  </TableCell>
                </TableRow>
              ) : (
                filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.fullName}</TableCell>
                    <TableCell>{driver.carNumber}</TableCell>
                    <TableCell>{formatDateTime(driver.completedAt)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-safety-green/10 text-safety-green border-safety-green/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Tasdiqlangan
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Ko'rish
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriversManagement;