/* Chart.js Setup for Sabrina Akter's SEO Case Studies */

document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyCharts();
});

function initCaseStudyCharts() {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#94a3b8',
          font: { family: 'Plus Jakarta Sans', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#10b981',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
      }
    }
  };

  // 1. AI SEO & LLM Copilot Citation Growth Chart
  const saasCtx = document.getElementById('saasGrowthChart');
  if (saasCtx) {
    new Chart(saasCtx, {
      type: 'line',
      data: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [{
          label: 'Daily Copilot & AI Citations',
          data: [34, 52, 88, 124, 155, 185],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#06b6d4',
          pointRadius: 5
        }]
      },
      options: commonOptions
    });
  }

  // 2. E-Commerce Monthly Revenue Growth Chart
  const ecomCtx = document.getElementById('ecomGrowthChart');
  if (ecomCtx) {
    new Chart(ecomCtx, {
      type: 'bar',
      data: {
        labels: ['Q1 (Before)', 'Q2 (On-Page SEO)', 'Q3 (Link Bldg)', 'Q4 (Peak Revenue)'],
        datasets: [{
          label: 'Monthly Organic Sales ($)',
          data: [12500, 34000, 68000, 112000],
          backgroundColor: ['rgba(59, 130, 246, 0.5)', 'rgba(6, 182, 212, 0.6)', 'rgba(16, 185, 129, 0.7)', 'rgba(16, 185, 129, 0.9)'],
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 8
        }]
      },
      options: commonOptions
    });
  }

  // 3. Local SEO Google Maps Rankings & Calls Chart
  const localCtx = document.getElementById('localGrowthChart');
  if (localCtx) {
    new Chart(localCtx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 4', 'Week 8', 'Week 12', 'Week 16', 'Week 20'],
        datasets: [{
          label: 'Google Map Pack Top 3 Keywords',
          data: [4, 14, 32, 54, 72, 85],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#10b981',
          pointRadius: 5
        }]
      },
      options: commonOptions
    });
  }
}
