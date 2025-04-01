
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Calculator from "@/components/Calculator";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Set the page title for SEO
    document.title = "SEO ROI Calculator | Maximize Your Organic Traffic Potential";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-creamWhite">
      <Header />
      
      <main className="flex-grow">
        <section className="py-12 px-4 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              SEO ROI Calculator
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Visualize the potential return on investment from your SEO efforts and make data-driven decisions for your business growth.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-md inline-block">
              <span className="text-sm bg-secondary/20 text-primary px-3 py-1 rounded-full font-medium">
                Trusted by 10,000+ marketers and business owners
              </span>
            </div>
          </div>
        </section>
        
        <div id="calculator">
          <Calculator />
        </div>
        
        <InfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
