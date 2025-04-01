
// Currency formatter for Indian Rupee
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Convert monthly values to yearly
export const monthlyToYearly = (monthly: number): number => {
  return monthly * 12;
};

// Calculate monthly organic traffic based on monthly search volume and CTR
export const calculateMonthlyTraffic = (
  monthlySearchVolume: number,
  clickThroughRate: number
): number => {
  return monthlySearchVolume * (clickThroughRate / 100);
};

// Calculate monthly organic revenue based on traffic, conversion rate and average order value
export const calculateMonthlyRevenue = (
  monthlyTraffic: number,
  conversionRate: number,
  averageOrderValue: number
): number => {
  return monthlyTraffic * (conversionRate / 100) * averageOrderValue;
};

// Calculate ROI based on total revenue and investment cost
export const calculateROI = (totalRevenue: number, investmentCost: number): number => {
  if (investmentCost === 0) return 0;
  return ((totalRevenue - investmentCost) / investmentCost) * 100;
};

// Generate monthly projections for 12 months
export const generateMonthlyProjections = (
  initialTraffic: number,
  monthlyGrowthRate: number,
  conversionRate: number,
  averageOrderValue: number
): { month: number; traffic: number; revenue: number }[] => {
  const projections = [];
  let currentTraffic = initialTraffic;

  for (let i = 1; i <= 12; i++) {
    // Calculate this month's traffic with growth
    currentTraffic = i === 1 ? initialTraffic : currentTraffic * (1 + monthlyGrowthRate / 100);
    
    // Calculate revenue based on traffic, conversion rate, and average order value
    const monthlyRevenue = calculateMonthlyRevenue(
      currentTraffic,
      conversionRate,
      averageOrderValue
    );

    projections.push({
      month: i,
      traffic: Math.round(currentTraffic),
      revenue: monthlyRevenue
    });
  }

  return projections;
};

// Calculate total revenue over a period (months)
export const calculateTotalRevenue = (
  initialTraffic: number,
  monthlyGrowthRate: number,
  conversionRate: number,
  averageOrderValue: number,
  months: number
): number => {
  const projections = generateMonthlyProjections(
    initialTraffic,
    monthlyGrowthRate,
    conversionRate,
    averageOrderValue
  );
  
  return projections
    .slice(0, months)
    .reduce((total, month) => total + month.revenue, 0);
};

// Calculate potential organic traffic growth over time
export const calculateTrafficGrowth = (
  initialTraffic: number,
  monthlyGrowthRate: number,
  months: number
): number[] => {
  const trafficByMonth = [];
  let currentTraffic = initialTraffic;
  
  for (let i = 0; i < months; i++) {
    trafficByMonth.push(Math.round(currentTraffic));
    currentTraffic *= (1 + monthlyGrowthRate / 100);
  }
  
  return trafficByMonth;
};
