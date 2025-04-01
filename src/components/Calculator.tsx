
import React, { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator as CalcIcon, TrendingUp, IndianRupee, Users, LineChart } from "lucide-react";
import { 
  formatCurrency,
  calculateMonthlyTraffic,
  calculateMonthlyRevenue, 
  calculateTotalRevenue,
  calculateROI,
  generateMonthlyProjections 
} from "@/utils/calculatorUtils";
import ROIChart from "./ROIChart";
import DownloadPDF from "./DownloadPDF";
import EmailResults from "./EmailResults";

interface CalculatorFormData {
  monthlySearchVolume: number;
  avgClickThroughRate: number;
  conversionRate: number;
  averageOrderValue: number;
  monthlyGrowthRate: number;
  monthlySEOCost: number;
  timeframe: number;
}

const initialFormData: CalculatorFormData = {
  monthlySearchVolume: 10000,
  avgClickThroughRate: 3.5,
  conversionRate: 2.0,
  averageOrderValue: 2500,
  monthlyGrowthRate: 10,
  monthlySEOCost: 25000,
  timeframe: 12,
};

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState<CalculatorFormData>(initialFormData);
  const [results, setResults] = useState<{
    monthlyTraffic: number;
    monthlyRevenue: number;
    annualRevenue: number;
    roi: number;
    projections: { month: number; traffic: number; revenue: number }[];
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CalculatorFormData
  ) => {
    const value = parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  const handleSliderChange = (
    value: number[],
    field: keyof CalculatorFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value[0],
    }));
  };

  useEffect(() => {
    calculateResults();
  }, [formData]);

  const calculateResults = () => {
    const monthlyTraffic = calculateMonthlyTraffic(
      formData.monthlySearchVolume,
      formData.avgClickThroughRate
    );

    const monthlyRevenue = calculateMonthlyRevenue(
      monthlyTraffic,
      formData.conversionRate,
      formData.averageOrderValue
    );

    const totalRevenue = calculateTotalRevenue(
      monthlyTraffic,
      formData.monthlyGrowthRate,
      formData.conversionRate,
      formData.averageOrderValue,
      formData.timeframe
    );

    const totalCost = formData.monthlySEOCost * formData.timeframe;
    const roi = calculateROI(totalRevenue, totalCost);

    const projections = generateMonthlyProjections(
      monthlyTraffic,
      formData.monthlyGrowthRate,
      formData.conversionRate,
      formData.averageOrderValue
    );

    setResults({
      monthlyTraffic,
      monthlyRevenue,
      annualRevenue: totalRevenue,
      roi,
      projections,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="gradient-card animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <CalcIcon className="mr-2 text-primary" size={24} />
                Input Parameters
              </CardTitle>
              <CardDescription>
                Adjust the values to calculate your potential SEO ROI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="monthlySearchVolume">Monthly Search Volume</Label>
                        <Badge variant="outline">{formData.monthlySearchVolume.toLocaleString()}</Badge>
                      </div>
                      <Input
                        id="monthlySearchVolume"
                        type="number"
                        value={formData.monthlySearchVolume}
                        onChange={(e) => handleInputChange(e, "monthlySearchVolume")}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="avgClickThroughRate">Avg. Click-Through Rate (%)</Label>
                        <Badge variant="outline">{formData.avgClickThroughRate}%</Badge>
                      </div>
                      <Slider
                        id="avgClickThroughRate"
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={[formData.avgClickThroughRate]}
                        onValueChange={(value) => handleSliderChange(value, "avgClickThroughRate")}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                        <Badge variant="outline">{formData.conversionRate}%</Badge>
                      </div>
                      <Slider
                        id="conversionRate"
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={[formData.conversionRate]}
                        onValueChange={(value) => handleSliderChange(value, "conversionRate")}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="averageOrderValue">
                          <span className="flex items-center">
                            Average Order Value <IndianRupee size={14} className="ml-1" />
                          </span>
                        </Label>
                        <Badge variant="outline">{formatCurrency(formData.averageOrderValue)}</Badge>
                      </div>
                      <Input
                        id="averageOrderValue"
                        type="number"
                        value={formData.averageOrderValue}
                        onChange={(e) => handleInputChange(e, "averageOrderValue")}
                        className="input-field"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="monthlyGrowthRate">Monthly Traffic Growth Rate (%)</Label>
                        <Badge variant="outline">{formData.monthlyGrowthRate}%</Badge>
                      </div>
                      <Slider
                        id="monthlyGrowthRate"
                        min={0}
                        max={30}
                        step={1}
                        value={[formData.monthlyGrowthRate]}
                        onValueChange={(value) => handleSliderChange(value, "monthlyGrowthRate")}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="monthlySEOCost">
                          <span className="flex items-center">
                            Monthly SEO Investment <IndianRupee size={14} className="ml-1" />
                          </span>
                        </Label>
                        <Badge variant="outline">{formatCurrency(formData.monthlySEOCost)}</Badge>
                      </div>
                      <Input
                        id="monthlySEOCost"
                        type="number"
                        value={formData.monthlySEOCost}
                        onChange={(e) => handleInputChange(e, "monthlySEOCost")}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <Label htmlFor="timeframe">Timeframe (months)</Label>
                        <Badge variant="outline">{formData.timeframe}</Badge>
                      </div>
                      <Slider
                        id="timeframe"
                        min={1}
                        max={24}
                        step={1}
                        value={[formData.timeframe]}
                        onValueChange={(value) => handleSliderChange(value, "timeframe")}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {results && (
            <div className="space-y-6">
              <Card className="gradient-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <TrendingUp className="mr-2 text-primary" size={24} />
                    Key Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Your SEO campaign performance over {formData.timeframe} months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                      <Users size={28} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-gray-500 mb-1">Monthly Organic Traffic</p>
                      <p className="text-2xl font-bold">{Math.round(results.monthlyTraffic).toLocaleString()}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                      <IndianRupee size={28} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.monthlyRevenue)}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                      <IndianRupee size={28} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-gray-500 mb-1">{formData.timeframe}-Month Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.annualRevenue)}</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                      <LineChart size={28} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-gray-500 mb-1">ROI</p>
                      <p className="text-2xl font-bold">
                        {results.roi.toFixed(0)}%
                      </p>
                    </div>
                  </div>

                  <ROIChart 
                    projections={results.projections} 
                    timeframe={formData.timeframe}
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DownloadPDF 
                  formData={formData}
                  results={results}
                />
                <EmailResults 
                  formData={formData}
                  results={results}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
