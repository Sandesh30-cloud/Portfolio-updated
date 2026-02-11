import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orb from "@/components/Orb";
import TargetCursor from "@/components/TargetCursor";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MotionConfig reducedMotion="always">
        <div className="relative min-h-screen bg-black">
          <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(34,211,238,0.08),transparent_60%)]" />
          <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
            <Orb hoverIntensity={2} rotateOnHover hue={0} forceHoverState={false} backgroundColor="#000000" />
          </div>
          <div className="relative z-10">
            <TargetCursor hoverDuration={0.2} />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </MotionConfig>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
