import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileNav } from "@/components/navigation/MobileNav";
import { Dashboard } from "@/screens/Dashboard";
import { SmsCheck } from "@/screens/SmsCheck";
import { UrlCheck } from "@/screens/UrlCheck";
import { Quiz } from "@/screens/Quiz";
import { Monitor } from "@/screens/Monitor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sms-check" element={<SmsCheck />} />
            <Route path="/url-check" element={<UrlCheck />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
