
// Mock data service for our dashboard
const generateTimeSeriesData = (
  days = 30,
  min = 0,
  max = 100,
  variability = 10
) => {
  const now = new Date();
  const data = [];
  let lastValue = Math.floor(Math.random() * (max - min) + min);

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - i - 1));
    
    // Create some variation but with a trend
    const change = (Math.random() - 0.5) * variability;
    lastValue = Math.max(min, Math.min(max, lastValue + change));
    
    data.push({
      date: date.toISOString().split("T")[0],
      value: parseFloat(lastValue.toFixed(1)),
    });
  }

  return data;
};

const generateMultipleTimeSeriesData = (
  series: string[],
  days = 30,
  min = 0,
  max = 100
) => {
  return series.map((name) => ({
    name,
    data: generateTimeSeriesData(days, min, max),
  }));
};

const generateCategoryData = (categories: string[]) => {
  return categories.map((category) => ({
    category,
    value: Math.floor(Math.random() * 100),
  }));
};

const generate3DData = (size = 20) => {
  const x = Array.from({ length: size }, (_, i) => i);
  const y = Array.from({ length: size }, (_, i) => i);
  const z = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() * 10)
  );
  
  return { x, y, z };
};

const generateHeatmapData = (rows = 24, cols = 7) => {
  const zData = Array.from({ length: rows }, () => 
    Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
  );
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: rows }, (_, i) => `${i}:00`);
  
  return { z: zData, x: days, y: hours };
};

const generateBubbleData = (count = 20) => {
  const data = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 5,
      category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]
    });
  }
  
  return data;
};

export const ApiService = {
  // Temperature data for line chart
  fetchTemperatureData: async () => {
    return generateTimeSeriesData(30, 5, 30, 3);
  },
  
  // Humidity data for area chart
  fetchHumidityData: async () => {
    return generateTimeSeriesData(30, 40, 90, 5);
  },
  
  // Multiple metrics for multi-line chart
  fetchMultipleMetrics: async () => {
    return generateMultipleTimeSeriesData(
      ["Temperature", "Humidity", "Air Quality", "Pressure"],
      30
    );
  },
  
  // Category data for bar chart
  fetchCategoryData: async () => {
    return generateCategoryData([
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ]);
  },
  
  // Data for pie chart
  fetchPieData: async () => {
    return generateCategoryData([
      "Segment 1",
      "Segment 2",
      "Segment 3",
      "Segment 4",
      "Segment 5",
    ]);
  },
  
  // Data for 3D surface plot
  fetch3DData: async () => {
    return generate3DData();
  },
  
  // Data for heatmap
  fetchHeatmapData: async () => {
    return generateHeatmapData();
  },
  
  // Data for gauge chart
  fetchGaugeData: async () => {
    return Math.floor(Math.random() * 100);
  },
  
  // Data for bubble chart
  fetchBubbleData: async () => {
    return generateBubbleData();
  }
};
