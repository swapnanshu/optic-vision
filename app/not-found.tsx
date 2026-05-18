'use client';

import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .notfound-container {
          box-sizing: border-box;
          min-height: 100vh;
          width: 100vw;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #FAFAF9 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
          padding: 24px !important;
          margin: 0 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          z-index: 99999 !important;
        }
        .notfound-card {
          background: #ffffff !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
          border-radius: 32px !important;
          padding: 48px 32px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02) !important;
          max-width: 420px !important;
          width: 100% !important;
          text-align: center !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
        }
        .notfound-icon-wrap {
          background: #F0FDFA !important;
          border: 1px solid #CCFBF1 !important;
          color: #0D9488 !important;
          border-radius: 9999px !important;
          width: 88px !important;
          height: 88px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-bottom: 24px !important;
        }
        .notfound-title {
          font-size: 28px !important;
          font-weight: 800 !important;
          letter-spacing: -0.8px !important;
          margin: 0 0 12px 0 !important;
          color: #0F172A !important;
          line-height: 1.2 !important;
        }
        .notfound-text {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: #64748B !important;
          line-height: 1.6 !important;
          margin: 0 0 32px 0 !important;
        }
        .notfound-btn {
          background: #0D9488 !important;
          color: #ffffff !important;
          font-weight: 800 !important;
          padding: 14px 36px !important;
          border-radius: 16px !important;
          border: none !important;
          font-size: 14px !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
          cursor: pointer !important;
          transition: all 0.2s ease-in-out !important;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2) !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          text-decoration: none !important;
        }
        .notfound-btn:hover {
          background: #0F766E !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 16px rgba(13, 148, 136, 0.3) !important;
        }
        .notfound-btn:active {
          transform: translateY(1px) !important;
        }
      ` }} />

      <div className="notfound-container">
        <div className="notfound-card">
          <div className="notfound-icon-wrap">
            <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>

          <h1 className="notfound-title">
            Raasta bhatak gaye? 🗺️🧭
          </h1>
          
          <p className="notfound-text">
            Yeh page Nagpur ke purane maps ki tarah lagta hai, jo abhi exist nahi karta! Wapas ghar chalo aur naye frames try karo.
          </p>

          <Link href="/" className="notfound-btn">
            <Home className="w-4 h-4" />
            <span>Ghar Wapas Jao</span>
          </Link>
        </div>
      </div>
    </>
  );
}
