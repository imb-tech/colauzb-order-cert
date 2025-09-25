import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Download,
  Home,
  Calendar,
  User,
  Car,
  Clock
} from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useTranslation } from "react-i18next";

interface CompletionPageProps {
  driverData: { carNumber: string; fullName: string };
  onStartNew: () => void;
}

const CompletionPage = ({ driverData }: CompletionPageProps) => {
  const currentDate = new Date().toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const { t } = useTranslation()

  const divRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false)

  const [certificateId] = useState(() => `XQ-${Date.now().toString().slice(-6)}`)

  const handleDownload = async () => {
    setLoading(true)
    if (!divRef.current) return;
    const canvas = await html2canvas(divRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    // download qilish
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = certificateId + `_${new Date().getTime()}`;
    link.click();
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-safety-green rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-safety-green mb-2">
            {t('Muvaffaqiyatli!')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('Xavfsizlik instruktaji muvaffaqiyatli yakunlandi.')}
          </p>
        </div>

        {/* Certificate Card */}
        <Card className="shadow-lg border-safety-green/20 mb-8">
          <div ref={divRef}>
            <CardHeader className="bg-gradient-to-r from-safety-green/10 to-industrial-blue/10">
              <CardTitle className="text-center text-xl">
                {t('Xavfsizlik Instruktaji Sertifikati')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Certificate Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('Haydovchi')}</p>
                    <p className="font-semibold">{driverData.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('Transport vositasi')}</p>
                    <p className="font-semibold">{driverData.carNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Instruktaj sanasi")}</p>
                    <p className="font-semibold">{currentDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("Sertifikat raqami")}</p>
                    <p className="font-semibold">{certificateId}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="text-center p-4 bg-safety-green/10 rounded-lg border border-safety-green/20">
                <div className="flex items-center flex-col justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-10 h-10 text-safety-green" />
                  <span className="font-semibold text-safety-green">{t("Zavod hududiga kirish ruxsat etildi")}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("Barcha xavfsizlik qoidalari o'rganildi va elektron imzo qo'yildi")}
                </p>
              </div>
            </CardContent>
          </div>
          <CardContent className="space-y-6">
            <Button
              // variant="outline"
              className="flex items-center gap-2 flex-1 rounded-xl mx-auto w-full"
              onClick={handleDownload}
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : <Download className="w-4 h-4" />}
              {t("Sertifikatni yuklab olish")}
            </Button>


            {/* Important Notice */}
            <div className="p-4 bg-safety-orange/10 rounded-lg border border-safety-orange/20">
              <h4 className="font-semibold text-safety-orange mb-2">{t('Eslatma')}:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {t("Ushbu sertifikat faqat bugungi kun uchun amal qiladi")}</li>
                <li>• {t("Zavod hududida barcha qoidalarga rioya qiling")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex items-center gap-2 flex-1 text-xl rounded-xl"
            onClick={() => window.location.reload()}
          >
            <Home className="w-4 h-4" />
            {t("Qaytadan boshlash")}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>{t("Zavod Xavfsizlik Bo'limi")} | {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;