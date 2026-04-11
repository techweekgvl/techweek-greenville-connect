import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhotoBanner from "@/components/PhotoBanner";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Sponsors from "@/components/Sponsors";
import Volunteer from "@/components/Volunteer";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PhotoBanner />
      <About />
      <Schedule />
      <Speakers />
      <Sponsors />
      <Volunteer />
      <Register />
      <Footer />
    </div>
  );
};

export default Index;
