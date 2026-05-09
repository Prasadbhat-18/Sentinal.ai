export const calculateRiskLevel = (domain, category) => {
  const highRiskDomains = ['facebook.com', 'tiktok.com', 'doubleclick.net', 'google-analytics.com'];
  
  if (highRiskDomains.some((d) => domain.includes(d))) {
    return 'High';
  }
  
  if (category === 'social' || category === 'shopping') {
    return 'Medium';
  }
  
  return 'Low';
};

export const calculateOverallRisk = (logs) => {
  if (!logs || logs.length === 0) return 0;
  
  let score = 0;
  const totalVisits = logs.length;
  
  // 1. Social Media ratio
  const socialVisits = logs.filter(l => l.category === 'social').length;
  if ((socialVisits / totalVisits) > 0.4) score += 25;
  
  // 2. Nocturnal Browsing (midnight - 5am)
  const nocturnalVisits = logs.filter(l => {
    const hour = new Date(l.visitedAt).getHours();
    return hour >= 0 && hour < 5;
  }).length;
  if ((nocturnalVisits / totalVisits) > 0.3) score += 20;
  
  // 3. Known Tracker Heavy Sites
  const highRiskVisits = logs.filter(l => l.riskLevel === 'High').length;
  if (highRiskVisits > 0) score += 20;
  
  // 4. Privacy Conscious (simplified check)
  const privacyVisits = logs.filter(l => l.domain.includes('duckduckgo') || l.domain.includes('proton')).length;
  if (privacyVisits === 0) score += 15;
  
  // 5. Shopping patterns
  const shoppingVisits = logs.filter(l => l.category === 'shopping').length;
  if ((shoppingVisits / totalVisits) > 0.2) score += 20;
  
  return Math.min(score, 100);
};
