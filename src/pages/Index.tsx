import { useState, useCallback } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import ContactSection from "@/components/landing/ContactSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ImageUpload, { type AnalysisResult } from "@/components/interactive/ImageUpload";
import AnalysisResults from "@/components/interactive/AnalysisResults";
import Dashboard from "@/components/interactive/Dashboard";
import ProposalGenerator from "@/components/interactive/ProposalGenerator";
import ChatAssistant from "@/components/interactive/ChatAssistant";
import ConfettiBackground from "@/components/effects/ConfettiBackground";
import { fireFireworks } from "@/components/effects/useFireworks";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [chatStarted, setChatStarted] = useState(false);

  const handleAnalysisComplete = useCallback((result: AnalysisResult) => {
    setAnalysisResult(result);
    fireFireworks();
  }, []);

  return (
    <main className="min-h-screen bg-background relative">
      <ConfettiBackground />
      <HeroSection />
      <ServicesSection />
      <PhilosophySection />
      <TestimonialsSection />
      <ImageUpload onAnalysisComplete={handleAnalysisComplete} />

      {analysisResult && (
        <>
          <AnalysisResults
            result={analysisResult}
            onUpdate={setAnalysisResult}
          />
          <Dashboard result={analysisResult} chatStarted={chatStarted} />
          <ProposalGenerator result={analysisResult} />
        </>
      )}

      <ContactSection />
      <ChatAssistant
        analysisResult={analysisResult}
      />
    </main>
  );
};

export default Index;
