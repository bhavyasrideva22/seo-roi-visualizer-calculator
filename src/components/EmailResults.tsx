
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { formatCurrency } from "@/utils/calculatorUtils";
import { useToast } from "@/components/ui/use-toast";

interface EmailResultsProps {
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

const EmailResults: React.FC<EmailResultsProps> = ({ formData, results }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSendEmail = () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email Address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    // In a real implementation, you would send this to your backend
    // Simulating API call with setTimeout
    setTimeout(() => {
      toast({
        title: "Email Sent Successfully!",
        description: `Your SEO ROI report has been sent to ${email}`,
      });
      setIsSending(false);
      setEmail("");
    }, 1500);
  };

  return (
    <Card className="gradient-card animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Email Results</h3>
            <p className="text-sm text-gray-500">Send your analysis results via email</p>
          </div>
          <Mail size={24} className="text-primary" />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="yourname@example.com"
              value={email}
              onChange={handleEmailChange}
              className="input-field mt-1"
            />
          </div>

          <Button
            onClick={handleSendEmail}
            className="w-full btn-primary font-medium flex items-center justify-center gap-2"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Results"}
            <Mail size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailResults;
