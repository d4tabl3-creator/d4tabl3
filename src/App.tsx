import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardAutomations from "./pages/dashboard/DashboardAutomations";
import DashboardMetrics from "./pages/dashboard/DashboardMetrics";
import DashboardProcesses from "./pages/dashboard/DashboardProcesses";
import DashboardBilling from "./pages/dashboard/DashboardBilling";
import DashboardSupport from "./pages/dashboard/DashboardSupport";
import DashboardAddOns from "./pages/dashboard/DashboardAddOns";
import DashboardSales from "./pages/dashboard/DashboardSales";
import DashboardReferrals from "./pages/dashboard/DashboardReferrals";
import DashboardAdminAgents from "./pages/dashboard/DashboardAdminAgents";
import DashboardTestCodes from "./pages/dashboard/DashboardTestCodes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="automations" element={<DashboardAutomations />} />
              <Route path="metrics" element={<DashboardMetrics />} />
              <Route path="processes" element={<DashboardProcesses />} />
              <Route path="billing" element={<DashboardBilling />} />
              <Route path="support" element={<DashboardSupport />} />
              <Route path="add-ons" element={<DashboardAddOns />} />
              <Route path="sales" element={<DashboardSales />} />
              <Route path="referrals" element={<DashboardReferrals />} />
              <Route path="admin-agents" element={<DashboardAdminAgents />} />
              <Route path="test-codes" element={<DashboardTestCodes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
