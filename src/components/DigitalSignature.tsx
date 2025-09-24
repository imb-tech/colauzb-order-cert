import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  User,
  Car,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SignaturePadComponent, { base64ToBlob } from "./SignaturePad";
import SignatureCanvas from "react-signature-canvas";
import http from "@/services/http";

interface DigitalSignatureProps {
  driverData: { carNumber: string; fullName: string };
  onComplete: () => void;
  onBack: () => void;
}

const DigitalSignature = ({
  driverData,
  onComplete,
  onBack,
}: DigitalSignatureProps) => {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sigRef = useRef<SignatureCanvas>(null);

  const currentDate = new Date().toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sigRef.current?.isEmpty()) {
      toast({ title: "Iltimos imzo qo'ying!", variant: "destructive" });
      return;
    }

    const base64 = sigRef.current.getCanvas().toDataURL("image/png");
    const blob = base64ToBlob(base64);

    const formData = new FormData();
    formData.append("signature", blob, "signature.png");
    formData.append('full_name', driverData.fullName)
    formData.append('truck_number', driverData.carNumber?.split(' ').join(''))

    try {
      setIsSubmitting(true);

      await http.post("users/accept/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast({
        title: "Muvaffaqiyat!",
        description:
          "Xavfsizlik instruktaji muvaffaqiyatli yakunlandi. Zavod hududiga kirishingiz mumkin.",
      });

      onComplete();
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Ma'lumot yuborishda muammo yuz berdi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto w-16 h-16 bg-safety-green rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Elektron Imzo
          </h1>
          <p className="text-muted-foreground">
            Xavfsizlik qoidalariga rioya qilish majburiyati
          </p>
        </div>

        <Card className="w-full max-w-md shadow-lg border-none rounded-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-safety-green" />
              Instruktaj yakunlash
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Driver Info Summary */}
            <div className="flex flex-col gap-4 p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Haydovchi:
                </span>
                <span className="font-medium">{driverData.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Mashina:</span>
                <span className="font-medium">{driverData.carNumber}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sana:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
            </div>

            {/* Agreement Text */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agreement Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="agreement" className="text-sm leading-relaxed">
                  Yuqorida sanab o'tilgan barcha xavfsizlik qoidalariga rioya
                  qilishni va ularni buzgan taqdirda mas'uliyat olishni
                  tasdiqlayaman.
                </Label>
              </div>

              <SignaturePadComponent ref={sigRef} />

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex items-center gap-2 rounded-full border-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Boshiga
                </Button>

                <Button
                  type="submit"
                  disabled={!agreed || isSubmitting}
                  className="flex-1 bg-safety-green hover:bg-safety-green/90 rounded-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Saqlanyapti...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Yakunlash
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalSignature;
