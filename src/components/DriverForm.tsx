import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DriverFormProps {
  onSubmit: (data: { carNumber: string; fullName: string }) => void;
}

const DriverForm = ({ onSubmit }: DriverFormProps) => {
  const [carNumber, setCarNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carNumber.trim() && fullName.trim()) {
      onSubmit({ carNumber: carNumber.trim(), fullName: fullName.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-none rounded-3xl pb-4">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">
            {t("Xavfsizlik Instruktaji")}
          </CardTitle>
          <p className="text-muted-foreground">
            {t("Zavod hududiga kirish uchun ma'lumotlaringizni kiriting")}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="carNumber" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                {t("Mashina raqami")}
              </Label>
              <Input
                id="carNumber"
                value={carNumber}
                onChange={(e) => setCarNumber(formatCarNumber(e.target.value))}
                placeholder="01 A 123 BC"
                className="text-lg px-4 py-2 rounded-xl outline-none"
                required
                name="truck_id"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("Ism va familiya")}
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("Ahmadjonov Jamshid")}
                className="text-plg x-4 py-2 rounded-xl outline-none"
                name="full_name"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg plg x-4 rounded-xl outline-none"
              disabled={!carNumber.trim() || !fullName.trim()}
            >
              {t("Boshlash")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverForm;

export const formatCarNumber = (value?: string) => {
  if (!value) return ""
  const alphanumericOnly = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
  const firstTwo = alphanumericOnly.slice(0, 2)
  const remaining = alphanumericOnly.slice(2)
  const formattedRemaining = remaining.replace(
    /([A-Za-z])(?=\d)|(\d)(?=[A-Za-z])/g,
    "$1$2 ",
  )
  const result = `${firstTwo} ${formattedRemaining}`.trim()
  return result.slice(0, 11).trim()
}
