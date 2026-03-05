import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/landing/HeroSection";
import ForWhoSection from "@/components/landing/ForWhoSection";
import PainSection from "@/components/landing/PainSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import ClosingSection from "@/components/landing/ClosingSection";
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
      {/* Floating login button */}
      <div className="fixed top-4 right-4 z-50">
        <Button asChild variant="outline" size="sm" className="backdrop-blur-sm bg-card/80 border-border/50">
          <Link to="/auth" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Iniciar sesión
          </Link>
        </Button>
      </div>
      <ConfettiBackground />
      <HeroSection />
      <ForWhoSection />
      <PainSection />
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

      <ClosingSection />
      <ContactSection />
      <ChatAssistant
        analysisResult={analysisResult}
        onChatStarted={() => setChatStarted(true)}
      />
    </main>
  );
};

export default Index;
