import type { Metric } from "web-vitals";

export const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    void import("web-vitals").then((vitals) => {
      vitals.onCLS(onPerfEntry);
      // vitals.onFID(onPerfEntry);
      vitals.onINP(onPerfEntry);
      vitals.onFCP(onPerfEntry);
      vitals.onLCP(onPerfEntry);
      vitals.onTTFB(onPerfEntry);
    });
  }
};
