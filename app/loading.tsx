'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .global-loader-container {
          box-sizing: border-box;
          min-height: 100vh;
          width: 100vw;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: rgba(250, 250, 249, 0.8) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 999999 !important;
        }
        .global-loader-card {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
        }
        .global-loader-spinner-wrap {
          position: relative !important;
          width: 72px !important;
          height: 72px !important;
          margin-bottom: 20px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .global-loader-outer-ring {
          position: absolute !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 9999px !important;
          border: 4px solid rgba(13, 148, 136, 0.1) !important;
          border-top-color: #0D9488 !important;
          border-right-color: #0D9488 !important;
          animation: spin-loader 1s linear infinite !important;
        }
        .global-loader-brand-dot {
          width: 16px !important;
          height: 16px !important;
          background: #0D9488 !important;
          border-radius: 9999px !important;
          box-shadow: 0 0 12px rgba(13, 148, 136, 0.6) !important;
          animation: pulse-dot 1.5s ease-in-out infinite !important;
        }
        .global-loader-text {
          font-size: 14px !important;
          font-weight: 800 !important;
          color: #0F172A !important;
          text-transform: uppercase !important;
          letter-spacing: 2px !important;
          margin-top: 12px !important;
          animation: pulse-text 1.5s ease-in-out infinite !important;
        }
        .global-loader-subtext {
          font-size: 11px !important;
          font-weight: 600 !important;
          color: #64748B !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          margin-top: 4px !important;
        }
        @keyframes spin-loader {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(0.85); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      ` }} />

      <div className="global-loader-container">
        <div className="global-loader-card">
          <div className="global-loader-spinner-wrap">
            <div className="global-loader-outer-ring" />
            <div className="global-loader-brand-dot" />
          </div>

          <h2 className="global-loader-text">
            Optic Vision
          </h2>
          <p className="global-loader-subtext">
            Loading...
          </p>
        </div>
      </div>
    </>
  );
}
