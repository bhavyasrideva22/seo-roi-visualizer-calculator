
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatCurrency } from "@/utils/calculatorUtils";
import jsPDF from "jspdf";
// Import jspdf-autotable correctly
import 'jspdf-autotable';

interface DownloadPDFProps {
  formData: {
    monthlySearchVolume: number;
    avgClickThroughRate: number;
    conversionRate: number;
    averageOrderValue: number;
    monthlyGrowthRate: number;
    monthlySEOCost: number;
    timeframe: number;
  };
  results: {
    monthlyTraffic: number;
    monthlyRevenue: number;
    annualRevenue: number;
    roi: number;
    projections: { month: number; traffic: number; revenue: number }[];
  };
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ formData, results }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Create a new PDF document
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Set document properties
      pdf.setProperties({
        title: 'SEO ROI Calculator Results',
        subject: 'SEO Return on Investment Analysis',
        author: 'SEO ROI Calculator',
        keywords: 'SEO, ROI, digital marketing, organic traffic',
        creator: 'SEO ROI Calculator'
      });
      
      // Header with logo and title
      pdf.setFillColor(36, 94, 79); // Primary color
      pdf.rect(0, 0, pageWidth, 80, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text('SEO ROI Analysis Report', 40, 50);
      
      // Subtitle
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Prepared on: ' + new Date().toLocaleDateString(), 40, 70);
      
      // Summary section
      pdf.setTextColor(36, 94, 79);
      pdf.setFontSize(18);
      pdf.text('Executive Summary', 40, 120);
      
      pdf.setDrawColor(36, 94, 79);
      pdf.setLineWidth(1);
      pdf.line(40, 130, 200, 130);
      
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.setFont('helvetica', 'normal');
      
      const summaryText = [
        `Based on your inputs, we forecast that your SEO campaign will generate`,
        `approximately ${Math.round(results.monthlyTraffic).toLocaleString()} monthly visitors with`,
        `potential monthly revenue of ${formatCurrency(results.monthlyRevenue)}.`,
        ``,
        `Over a ${formData.timeframe}-month period, the projected total revenue is`,
        `${formatCurrency(results.annualRevenue)} with an estimated ROI of ${results.roi.toFixed(0)}%.`
      ];
      
      let y = 150;
      summaryText.forEach(line => {
        pdf.text(line, 40, y);
        y += 20;
      });
      
      // Input parameters
      pdf.setFontSize(18);
      pdf.setTextColor(36, 94, 79);
      pdf.text('Input Parameters', 40, y + 20);
      
      pdf.setDrawColor(36, 94, 79);
      pdf.setLineWidth(1);
      pdf.line(40, y + 30, 200, y + 30);
      
      const inputData = [
        ['Parameter', 'Value'],
        ['Monthly Search Volume', formData.monthlySearchVolume.toLocaleString()],
        ['Average Click-Through Rate', `${formData.avgClickThroughRate}%`],
        ['Conversion Rate', `${formData.conversionRate}%`],
        ['Average Order Value', formatCurrency(formData.averageOrderValue)],
        ['Monthly Traffic Growth Rate', `${formData.monthlyGrowthRate}%`],
        ['Monthly SEO Investment', formatCurrency(formData.monthlySEOCost)],
        ['Timeframe', `${formData.timeframe} months`]
      ];
      
      // Use the autotable method directly from the pdf instance
      const inputTableEndY = y + 40;
      pdf.autoTable({
        startY: inputTableEndY,
        head: [inputData[0]],
        body: inputData.slice(1),
        theme: 'striped',
        headStyles: { 
          fillColor: [36, 94, 79], 
          textColor: [255, 255, 255],
          fontStyle: 'bold' 
        },
        alternateRowStyles: { fillColor: [242, 242, 242] },
        styles: { fontSize: 10 }
      });
      
      // Get the final Y position after the table is drawn
      const resultsStartY = pdf.previousAutoTable.finalY + 30;
      
      // Results section
      pdf.setFontSize(18);
      pdf.setTextColor(36, 94, 79);
      pdf.text('Projected Results', 40, resultsStartY);
      
      pdf.setDrawColor(36, 94, 79);
      pdf.setLineWidth(1);
      pdf.line(40, resultsStartY + 10, 200, resultsStartY + 10);
      
      const resultsData = [
        ['Metric', 'Value'],
        ['Monthly Organic Traffic', Math.round(results.monthlyTraffic).toLocaleString()],
        ['Monthly Revenue', formatCurrency(results.monthlyRevenue)],
        [`${formData.timeframe}-Month Revenue`, formatCurrency(results.annualRevenue)],
        ['Return on Investment', `${results.roi.toFixed(0)}%`]
      ];
      
      pdf.autoTable({
        startY: resultsStartY + 20,
        head: [resultsData[0]],
        body: resultsData.slice(1),
        theme: 'striped',
        headStyles: { 
          fillColor: [122, 201, 167], // Secondary color
          textColor: [51, 51, 51],
          fontStyle: 'bold' 
        },
        alternateRowStyles: { fillColor: [242, 242, 242] },
        styles: { fontSize: 10 }
      });
      
      // Monthly projections table
      const projectionsStartY = pdf.previousAutoTable.finalY + 30;
      
      // Check if we need a new page
      if (projectionsStartY > pageHeight - 150) {
        pdf.addPage();
        y = 40; // Reset y position on new page
      } else {
        y = projectionsStartY;
      }
      
      pdf.setFontSize(18);
      pdf.setTextColor(36, 94, 79);
      pdf.text('Monthly Projections', 40, y);
      
      pdf.setDrawColor(36, 94, 79);
      pdf.setLineWidth(1);
      pdf.line(40, y + 10, 200, y + 10);
      
      const projectionTableData = [
        ['Month', 'Organic Traffic', 'Revenue']
      ];
      
      results.projections.slice(0, formData.timeframe).forEach(proj => {
        projectionTableData.push([
          `Month ${proj.month}`,
          proj.traffic.toLocaleString(),
          formatCurrency(proj.revenue)
        ]);
      });
      
      pdf.autoTable({
        startY: y + 20,
        head: [projectionTableData[0]],
        body: projectionTableData.slice(1),
        theme: 'striped',
        headStyles: { 
          fillColor: [233, 196, 106], // Accent color
          textColor: [51, 51, 51],
          fontStyle: 'bold' 
        },
        alternateRowStyles: { fillColor: [242, 242, 242] },
        styles: { fontSize: 10 }
      });
      
      // Footer with disclaimer
      const footerText = 'This report is based on projections and estimates. Actual results may vary.';
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(footerText, pageWidth / 2, pageHeight - 20, { align: 'center' });
      
      // Add branding
      pdf.setFontSize(10);
      pdf.setTextColor(36, 94, 79);
      pdf.text('Generated with SEO ROI Calculator • seoroicalculator.com', pageWidth / 2, pageHeight - 40, { align: 'center' });
      
      // Save PDF
      pdf.save('SEO_ROI_Analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="gradient-card animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Download Report</h3>
            <p className="text-sm text-gray-500">Get a detailed PDF report of your SEO ROI analysis</p>
          </div>
          <Download size={24} className="text-primary" />
        </div>

        <Button
          onClick={handleDownload}
          className="w-full btn-accent font-medium flex items-center justify-center gap-2"
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Download PDF Report"}
          <Download size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadPDF;
