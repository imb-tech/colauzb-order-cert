import { useEffect, useState } from "react";
import DriverForm from "@/components/DriverForm";
import SafetyRules from "@/components/SafetyRules";
import DigitalSignature from "@/components/DigitalSignature";
import CompletionPage from "@/components/CompletionPage";

type Step = "form" | "rules" | "signature" | "complete";

interface DriverData {
  carNumber: string;
  fullName: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("form");
  const [driverData, setDriverData] = useState<DriverData | null>(null);
  const [lctn, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  )


  const handleFormSubmit = (data: DriverData) => {
    setDriverData(data);
    setCurrentStep("rules");
  };

  const handleRulesComplete = () => {
    setCurrentStep("signature");
  };

  const handleSignatureComplete = () => {
    setCurrentStep("complete");
  };

  const handleStartNew = () => {
    setDriverData(null);
    setCurrentStep("form");
  };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  const handleBackToRules = () => {
    setCurrentStep("rules");
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (err) => console.log(err),
        { enableHighAccuracy: true }
      )

      // cleanup → component unmount bo‘lsa kuzatuvni to‘xtatish
      return () => navigator.geolocation.clearWatch(watchId)
    } else {
      console.log("Geolocation browserda mavjud emas")
    }
  }, [])

  console.log(lctn);

  return (
    <>
      {currentStep === "form" && (
        <DriverForm onSubmit={handleFormSubmit} />
      )}

      {currentStep === "rules" && driverData && (
        <SafetyRules
          driverData={driverData}
          onComplete={handleRulesComplete}
          onBack={handleBackToForm}
        />
      )}

      {currentStep === "signature" && driverData && (
        <DigitalSignature
          driverData={driverData}
          onComplete={handleSignatureComplete}
          onBack={handleBackToRules}
          lctn={lctn}
        />
      )}

      {currentStep === "complete" && driverData && (
        <CompletionPage
          driverData={driverData}
          onStartNew={handleStartNew}
        />
      )}
    </>
  );
};

export default Index;
