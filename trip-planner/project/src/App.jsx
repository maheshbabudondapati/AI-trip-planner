import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { BlogPage } from './pages/BlogPage';
import { GuidesPage } from './pages/GuidesPage';
import { TipsPage } from './pages/TipsPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { PlanTripPage } from './pages/PlanTripPage';
import { ItineraryPage } from './pages/ItineraryPage';

// Home page components
import { Hero } from './components/Hero';
import { Wonders } from './components/Wonders';
import { Features } from './components/Features';
import { UsaDestinations } from './components/UsaDestinations';
import { TravelBlogs } from './components/TravelBlogs';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Wonders />
              <Features />
              <UsaDestinations />
              <TravelBlogs />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/plan-trip" element={<PlanTripPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;