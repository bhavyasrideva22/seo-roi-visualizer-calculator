
import React from "react";
import { Calculator } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-primary py-6 text-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calculator size={32} className="text-accent" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">SEO ROI Calculator</h1>
        </div>
        <div className="text-sm md:text-base">
          <p className="font-light">Maximize Your Organic Traffic Potential</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
