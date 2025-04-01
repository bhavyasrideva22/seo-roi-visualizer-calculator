
import React from "react";
import { Calculator, ChartBar, LineChart, TrendingUp, IndianRupee } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InfoSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">Understanding SEO ROI: Maximize Your Organic Traffic Potential</h2>
          <p className="text-lg text-gray-600">Make data-driven decisions with our comprehensive SEO ROI Calculator</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-semibold text-primary mb-4">Why SEO ROI Matters for Your Business</h3>
          
          <p className="mb-4">
            Search Engine Optimization (SEO) is a powerful digital marketing strategy that can deliver 
            substantial returns when executed correctly. Understanding the potential Return on Investment (ROI) 
            from your SEO efforts is crucial for making informed business decisions and allocating resources effectively.
          </p>
          
          <p className="mb-4">
            Our SEO ROI Calculator helps you visualize the potential impact of organic traffic growth on your business's 
            bottom line, allowing you to forecast traffic increases, conversion improvements, and revenue generation 
            over time.
          </p>

          <div className="my-8 p-6 bg-secondary/10 rounded-xl border border-secondary/30">
            <h4 className="flex items-center gap-2 text-xl font-semibold mb-3">
              <ChartBar className="text-primary" />
              Key Benefits of SEO as a Marketing Channel
            </h4>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Long-term Value:</span> Unlike paid advertising, SEO continues to deliver results long after the initial investment.</li>
              <li><span className="font-medium">High-intent Traffic:</span> Organic search visitors often have higher conversion rates as they actively search for your products or services.</li>
              <li><span className="font-medium">Credibility and Trust:</span> Higher organic rankings enhance brand perception and establish industry authority.</li>
              <li><span className="font-medium">Cost Efficiency:</span> SEO typically provides a better ROI compared to traditional advertising and PPC campaigns in the long run.</li>
              <li><span className="font-medium">Sustainable Growth:</span> Strategic SEO creates a foundation for consistent, sustainable business growth.</li>
            </ul>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h3 className="text-2xl font-semibold text-primary mb-4">How to Use the SEO ROI Calculator</h3>
          
          <p className="mb-6">
            Our calculator provides a data-driven approach to estimating the potential value of your SEO investment. 
            Follow these steps to get the most accurate projections:
          </p>

          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <span className="font-medium text-primary">Enter your monthly search volume</span> - This is the total number of searches for the keywords you're targeting. Use tools like Google Keyword Planner, Semrush, or Ahrefs to get accurate data.
            </li>
            <li>
              <span className="font-medium text-primary">Input your expected click-through rate (CTR)</span> - The percentage of searchers who will click on your website in search results. Average organic CTR is typically between 3-5% depending on your position and industry.
            </li>
            <li>
              <span className="font-medium text-primary">Set your conversion rate</span> - The percentage of website visitors who complete a desired action (purchase, signup, etc.). Industry benchmarks vary, but 1-3% is common for many businesses.
            </li>
            <li>
              <span className="font-medium text-primary">Define your average order value</span> - The average amount customers spend per transaction on your website.
            </li>
            <li>
              <span className="font-medium text-primary">Adjust advanced parameters</span> - For more precise calculations, set your monthly growth rate expectations, SEO investment costs, and projection timeframe.
            </li>
          </ol>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h4 className="flex items-center gap-2 text-xl font-semibold mb-4">
              <IndianRupee className="text-primary" />
              Understanding the Results
            </h4>
            <p className="mb-3">
              The calculator provides several key metrics to help you evaluate the potential success of your SEO campaign:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Monthly Organic Traffic:</span> Estimated visitors coming to your site through organic search results.</li>
              <li><span className="font-medium">Monthly Revenue:</span> Projected income generated from your organic traffic each month.</li>
              <li><span className="font-medium">Total Revenue:</span> Cumulative revenue over your selected timeframe (default: 12 months).</li>
              <li><span className="font-medium">ROI Percentage:</span> Return on investment calculated as (Total Revenue - SEO Investment) / SEO Investment × 100.</li>
            </ul>
          </div>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Frequently Asked Questions</AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">How long does it take to see results from SEO?</h4>
                <p className="text-gray-700">
                  SEO is a long-term strategy that typically shows meaningful results in 4-6 months. Initial improvements may be visible within 2-3 months, but significant traffic and revenue growth generally take 6-12 months depending on your industry competition, website authority, and SEO strategy.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">What's a realistic monthly growth rate for organic traffic?</h4>
                <p className="text-gray-700">
                  Monthly growth rates vary significantly by industry, website size, and starting point. New websites with proper SEO implementation might see 10-30% monthly growth in the beginning. Established sites typically experience more modest growth of 5-15% monthly. Our calculator defaults to 10%, which represents a reasonable average.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">How much should I invest in SEO?</h4>
                <p className="text-gray-700">
                  SEO investment depends on your business size, competition level, and growth goals. Small businesses typically invest ₹25,000-₹75,000 monthly, while larger enterprises may allocate ₹1,00,000-₹5,00,000+ monthly. The key is to compare your projected ROI against these costs to determine appropriate budget levels.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Are the calculator results guaranteed?</h4>
                <p className="text-gray-700">
                  The calculator provides projections based on your inputs and industry averages. Actual results may vary based on numerous factors including algorithm updates, competitive landscape changes, website quality, content strategy, and implementation effectiveness. Use these projections as planning tools rather than guaranteed outcomes.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">Advanced SEO ROI Considerations</AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Beyond Direct Revenue: Additional SEO Value</h4>
                <p className="text-gray-700">
                  Our calculator focuses on direct revenue attribution, but SEO delivers additional value not captured in these calculations:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Brand awareness and recognition benefits</li>
                  <li>Assisted conversions through multiple touchpoints</li>
                  <li>Increased customer lifetime value from organic visitors</li>
                  <li>Reduced dependency on paid advertising channels</li>
                  <li>Improved user experience and website usability</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Industry-Specific ROI Factors</h4>
                <p className="text-gray-700">
                  Different industries experience varying levels of SEO success based on:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Search competition intensity</li>
                  <li>Customer purchase cycle length</li>
                  <li>Seasonality factors</li>
                  <li>Local vs. global search considerations</li>
                  <li>Industry-specific algorithm factors</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  Consider consulting with an SEO professional to create customized projections for your specific industry and market position.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-primary mb-3">Ready to Transform Your Organic Traffic Potential?</h3>
          <p className="text-lg mb-6">Use our calculator above to visualize your SEO ROI and make data-driven marketing decisions.</p>
          <div className="flex items-center justify-center">
            <a href="#calculator" className="btn-accent font-medium py-3 px-8 rounded-lg inline-flex items-center gap-2">
              <Calculator size={20} />
              Try the Calculator Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
