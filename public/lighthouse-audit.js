// Lighthouse Audit Script
// This script can be run in the browser console or as a bookmarklet
// to perform a basic performance audit

(function() {
  'use strict';

  // Performance metrics collection
  const collectMetrics = () => {
    const metrics = {};
    
    // Navigation Timing API
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      metrics.DOMContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      metrics.loadComplete = timing.loadEventEnd - timing.navigationStart;
      metrics.firstPaint = timing.responseStart - timing.navigationStart;
    }

    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          metrics.firstContentfulPaint = entries[0].startTime;
        }
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          metrics.largestContentfulPaint = entries[entries.length - 1].startTime;
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.processingStart && entry.startTime) {
            metrics.firstInputDelay = entry.processingStart - entry.startTime;
          }
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        metrics.cumulativeLayoutShift = clsValue;
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }

    return metrics;
  };

  // Resource loading analysis
  const analyzeResources = () => {
    const resources = [];
    
    if (window.performance && window.performance.getEntriesByType) {
      const resourceEntries = window.performance.getEntriesByType('resource');
      
      resourceEntries.forEach(entry => {
        resources.push({
          name: entry.name,
          duration: entry.duration,
          size: entry.transferSize || 0,
          type: entry.initiatorType
        });
      });
    }

    return resources;
  };

  // Generate performance score
  const calculateScore = (metrics) => {
    let score = 100;
    
    // Penalize based on FCP
    if (metrics.firstContentfulPaint > 2000) {
      score -= 20;
    } else if (metrics.firstContentfulPaint > 1500) {
      score -= 10;
    }
    
    // Penalize based on LCP
    if (metrics.largestContentfulPaint > 4000) {
      score -= 25;
    } else if (metrics.largestContentfulPaint > 2500) {
      score -= 15;
    }
    
    // Penalize based on FID
    if (metrics.firstInputDelay > 300) {
      score -= 25;
    } else if (metrics.firstInputDelay > 100) {
      score -= 10;
    }
    
    // Penalize based on CLS
    if (metrics.cumulativeLayoutShift > 0.25) {
      score -= 25;
    } else if (metrics.cumulativeLayoutShift > 0.1) {
      score -= 10;
    }
    
    return Math.max(0, score);
  };

  // Display results
  const displayResults = (metrics, resources, score) => {
    const results = `
🚀 LIGHTHOUSE PERFORMANCE AUDIT RESULTS 🚀

📊 OVERALL SCORE: ${score}/100

⏱️ CORE WEB VITALS:
• First Contentful Paint: ${metrics.firstContentfulPaint ? (metrics.firstContentfulPaint / 1000).toFixed(2) + 's' : 'N/A'}
• Largest Contentful Paint: ${metrics.largestContentfulPaint ? (metrics.largestContentfulPaint / 1000).toFixed(2) + 's' : 'N/A'}
• First Input Delay: ${metrics.firstInputDelay ? metrics.firstInputDelay.toFixed(0) + 'ms' : 'N/A'}
• Cumulative Layout Shift: ${metrics.cumulativeLayoutShift ? metrics.cumulativeLayoutShift.toFixed(3) : 'N/A'}

📈 ADDITIONAL METRICS:
• DOM Content Loaded: ${metrics.DOMContentLoaded ? (metrics.DOMContentLoaded / 1000).toFixed(2) + 's' : 'N/A'}
• Page Load Complete: ${metrics.loadComplete ? (metrics.loadComplete / 1000).toFixed(2) + 's' : 'N/A'}

📦 RESOURCE ANALYSIS:
• Total Resources: ${resources.length}
• Total Transfer Size: ${(resources.reduce((sum, r) => sum + r.size, 0) / 1024).toFixed(2)} KB

🔧 RECOMMENDATIONS:
${score >= 90 ? '✅ Excellent performance! Keep up the good work.' : ''}
${score >= 70 && score < 90 ? '⚠️ Good performance with room for improvement.' : ''}
${score < 70 ? '❌ Performance needs optimization. Consider:' : ''}
${score < 70 ? '  • Optimizing images and assets' : ''}
${score < 70 ? '  • Reducing JavaScript bundle size' : ''}
${score < 70 ? '  • Implementing lazy loading' : ''}
${score < 70 ? '  • Using a CDN for static assets' : ''}

📅 Generated: ${new Date().toLocaleString()}
🌐 URL: ${window.location.href}
    `;

    console.log(results);
    
    // Create a visual overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid #3b82f6;
      border-radius: 12px;
      padding: 20px;
      max-width: 400px;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 10000;
      font-family: monospace;
      font-size: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;
    
    overlay.innerHTML = results.replace(/\n/g, '<br>').replace(/•/g, '• ');
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);
    
    document.body.appendChild(overlay);
  };

  // Main execution
  const runAudit = () => {
    console.log('🔍 Starting Lighthouse Performance Audit...');
    
    // Wait a bit for metrics to be collected
    setTimeout(() => {
      const metrics = collectMetrics();
      const resources = analyzeResources();
      const score = calculateScore(metrics);
      
      displayResults(metrics, resources, score);
    }, 1000);
  };

  // Run the audit
  runAudit();
})();
