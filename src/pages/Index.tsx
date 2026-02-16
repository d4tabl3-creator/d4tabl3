import { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import ContactSection from "@/components/landing/ContactSection";
import ImageUpload, { type AnalysisResult } from "@/components/interactive/ImageUpload";
import AnalysisResults from "@/components/interactive/AnalysisResults";
import Dashboard from "@/components/interactive/Dashboard";
import ProposalGenerator from "@/components/interactive/ProposalGenerator";
import ChatAssistant from "@/components/interactive/ChatAssistant";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <PhilosophySection />
      <ImageUpload onAnalysisComplete={setAnalysisResult} />

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
