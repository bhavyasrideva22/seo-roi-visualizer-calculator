
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-white">SEO ROI Calculator</h3>
            <p className="text-sm text-gray-200">
              An advanced tool to help business owners and marketers visualize the 
              potential return on investment from their SEO efforts.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-bold text-white">Resources</h3>
            <ul className="space-y-2 text-gray-200">
              <li><a href="#" className="hover:text-accent transition-colors">SEO Glossary</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Digital Marketing Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Best Practices Guide</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">ROI Case Studies</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-bold text-white">Contact Us</h3>
            <p className="text-gray-200 text-sm">
              Have questions about SEO ROI or need expert guidance?
            </p>
            <a 
              href="mailto:info@seoroicalculator.com" 
              className="inline-block bg-white text-primary px-4 py-2 rounded font-medium hover:bg-accent hover:text-primary transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>© {currentYear} SEO ROI Calculator. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-accent transition-colors mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors mr-4">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Disclaimer</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
