import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ServerOverview from "@/pages/ServerOverview";
import Store from "@/pages/Store";
import ProductDetail from "@/pages/ProductDetail";
import Vote from "@/pages/Vote";
import Community from "@/pages/Community";
import EventDetail from "@/pages/EventDetail";
import Team from "@/pages/Team";
import Moments from "@/pages/Moments";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Rules from "@/pages/Rules";
import FAQ from "@/pages/FAQ";
import { Toaster as HotToaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/server" element={<ServerOverview />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/product/:id" element={<ProductDetail />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/events/:id" element={<EventDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/staff" element={<Navigate to="/team" replace />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <HotToaster position="bottom-right" toastOptions={{ style: { background: "#0F172A", color: "#fff", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "12px" } }} />
    </Router>
  );
}

export default App;
