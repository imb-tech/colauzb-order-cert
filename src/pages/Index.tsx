import { useState } from "react";
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
