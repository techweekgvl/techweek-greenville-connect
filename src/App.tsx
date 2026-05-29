import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import posthog from "posthog-js";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Tickets from "./pages/Tickets.tsx";
import ThankYou from "./pages/ThankYou.tsx";

const queryClient = new QueryClient();

function PostHogPageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    posthog.capture("$pageview");
  }, [location]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogPageviewTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
