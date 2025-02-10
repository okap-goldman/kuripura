import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, createRoutesFromElements } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginPage from "@/pages/auth/login";
import { PrivateRoute } from "@/components/PrivateRoute";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Discover from "./pages/Discover";
import { FooterNav } from "./components/FooterNav";
import EventsPage from "@/pages/events";
import { ChatPage } from "@/pages/chat/[id]";
import { MessagesPage } from "@/pages/messages";
import NotificationsPage from "@/pages/notifications";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true
    }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
              <Route path="/discover" element={<PrivateRoute><Discover /></PrivateRoute>} />
              <Route path="/events" element={<PrivateRoute><EventsPage /></PrivateRoute>} />
              <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
              <Route path="/chat/:id" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
              <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <FooterNav />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
