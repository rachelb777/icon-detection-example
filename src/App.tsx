import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Scanner = lazy(() => import("./pages/Scanner"));
const Inquiry = lazy(() => import("./pages/Inquiry"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Navbar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
