import { useState, useEffect, CSSProperties } from "react";

// --- TYPE DEFINITIONS ---
interface InfoPillProps {
  icon: React.ReactNode;
  text: string;
}

interface TippingGuideProps {
  currency: string;
  onClose: () => void;
  darkMode: boolean;
}

interface ConversionResult {
  amount: number;
  base: string;
  date: string;
}

interface CurrencyList {
  [key: string]: string;
}


// --- HELPER & CHILD COMPONENTS ---
const InfoPill: React.FC<InfoPillProps> = ({ icon, text }) => {
  const pillStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "0.375rem 0.75rem",
    borderRadius: "9999px",
  };
  const iconStyle: CSSProperties = { marginRight: "0.5rem" };
  return (
    <div style={pillStyle}>
      <span style={iconStyle}>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

// TippingGuide component with dark mode support
const TippingGuide: React.FC<TippingGuideProps> = ({ currency, onClose, darkMode }) => {
  const tippingData: { [key: string]: { percentage: string; custom: string; country: string; restaurant: string; taxi: string; hotel: string } } = {
    USD: { 
      percentage: "15-20%", 
      custom: "Tip 18-20% at restaurants, $1-2 per drink at bars",
      country: "United States",
      restaurant: "15-20% is standard, 20%+ for excellent service",
      taxi: "10-15% of fare, round up to nearest dollar",
      hotel: "$1-2 per bag for bellhop, $2-5 per day for housekeeping"
    },
    EUR: { 
      percentage: "5-10%", 
      custom: "Round up or 5-10% at restaurants, not mandatory",
      country: "Eurozone",
      restaurant: "5-10% if satisfied, rounding up is common",
      taxi: "Round up to nearest euro or 5-10%",
      hotel: "€1-2 per bag, €1-2 per day for housekeeping"
    },
    GBP: { 
      percentage: "10-15%", 
      custom: "10-15% at restaurants if service charge not included",
      country: "United Kingdom",
      restaurant: "10-15% if no service charge, check your bill",
      taxi: "10-15% or round up to nearest pound",
      hotel: "£1-2 per bag, £2-3 per day for housekeeping"
    },
    JPY: { 
      percentage: "0%", 
      custom: "Tipping not customary and may be considered rude",
      country: "Japan",
      restaurant: "No tipping - excellent service is expected",
      taxi: "No tipping expected",
      hotel: "No tipping - may cause confusion or offense"
    },
    CAD: { 
      percentage: "15-20%", 
      custom: "Similar to US - 15-20% at restaurants",
      country: "Canada",
      restaurant: "15-20% is standard",
      taxi: "10-15% of fare",
      hotel: "$2-3 per bag, $3-5 per day for housekeeping"
    },
    AUD: { 
      percentage: "10%", 
      custom: "10% at restaurants, not mandatory but appreciated",
      country: "Australia",
      restaurant: "10% for good service, not obligatory",
      taxi: "Round up or 10% for longer trips",
      hotel: "$2-5 per bag, $5-10 per day for housekeeping"
    },
    default: {
      percentage: "Varies", 
      custom: "Check local customs",
      country: "Various",
      restaurant: "Varies by country - research local customs",
      taxi: "Varies by country - research local customs", 
      hotel: "Varies by country - research local customs"
    }
  };

  const guide = tippingData[currency] || tippingData["default"];

  const styles: Record<string, CSSProperties> = {
    backdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 20,
      transition: "background-color 0.3s ease",
    },
    modal: {
      backgroundColor: darkMode ? "#1e293b" : "white",
      padding: "2rem",
      borderRadius: "1rem",
      width: "90%",
      maxWidth: "32rem",
      boxShadow: darkMode 
        ? "0 25px 50px -12px rgba(0, 0, 0, 0.6)" 
        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: darkMode ? "1px solid #334155" : "none",
      transition: "background-color 0.3s ease, border-color 0.3s ease",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `1px solid ${darkMode ? "#475569" : "#e5e7eb"}`,
      paddingBottom: "1rem",
      transition: "border-color 0.3s ease",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: darkMode ? "#f1f5f9" : "#1f2937",
      transition: "color 0.3s ease",
    },
    closeButton: {
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
      color: darkMode ? "#94a3b8" : "#9ca3af",
      transition: "color 0.3s ease",
      borderRadius: "50%",
      width: "2rem",
      height: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      marginTop: "1rem",
      color: darkMode ? "#cbd5e1" : "#374151",
      transition: "color 0.3s ease",
    },
    listItem: {
      marginBottom: "0.75rem",
      lineHeight: "1.5",
    },
    strong: {
      fontWeight: "600",
      color: darkMode ? "#f1f5f9" : "#111827",
      transition: "color 0.3s ease",
    },
    disclaimer: {
      marginTop: "1rem",
      fontSize: "0.875rem",
      color: darkMode ? "#94a3b8" : "#6b7280",
      fontStyle: "italic",
      transition: "color 0.3s ease",
    },
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            Tipping Guide for {guide.country} ({currency})
          </h2>
          <button 
            onClick={onClose} 
            style={styles.closeButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode ? "#475569" : "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ×
          </button>
        </div>
        <div style={styles.content}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Restaurants:</strong>{" "}
              {guide.restaurant}
            </li>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Taxis:</strong> {guide.taxi}
            </li>
            <li style={styles.listItem}>
              <strong style={styles.strong}>Hotels:</strong> {guide.hotel}
            </li>
          </ul>
          <p style={styles.disclaimer}>
            *This is a general guide. Tipping customs can vary by location and
            establishment.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION COMPONENT ---
const Currency: React.FC = () => {
  // State management for the application
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);

  const [currencies, setCurrencies] = useState<CurrencyList>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [baseInfo, setBaseInfo] = useState<ConversionResult | null>(null);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [showTippingGuide, setShowTippingGuide] = useState<boolean>(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // useEffect hook to fetch the list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        if (!response.ok) throw new Error("Failed to fetch currency list.");
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError("Could not load currency list. Please try again later.");
        console.error(err);
      }
    };
    fetchCurrencies();
  }, []);

  // Dark mode observer
  useEffect(() => {
    const checkDark = () =>
      setDarkMode(document.body.classList.contains("dark-mode"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Function to handle the currency conversion logic
  const handleConvert = async () => {
    setIsLoading(true);
    setError(null);
    setIsResultVisible(false);

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      setIsLoading(false);
      return;
    }
    if (fromCurrency === toCurrency) {
      setError('"From" and "To" currencies cannot be the same.');
      setIsLoading(false);
      return;
    }

    const effectiveDate = new Date(date) > new Date() ? "latest" : date;

    try {
      const response = await fetch(
        `https://api.frankfurter.app/${effectiveDate}?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred.");
      }
      const data = await response.json();
      setConvertedAmount(data.rates[toCurrency]);
      setBaseInfo({
        amount: data.amount,
        base: data.base,
        date: data.date,
      });
      setIsResultVisible(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to swap the from and to currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // --- STYLES WITH DARK MODE SUPPORT ---
  const styles: Record<string, CSSProperties> = {
    mainContainer: {
      fontFamily: "sans-serif",
      backgroundColor: darkMode ? "#0f172a" : "#f9fafb",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      overflow: "hidden",
      position: "relative",
      transition: "background-color 0.3s ease",
    },
    card: {
      width: "100%",
      maxWidth: "28rem",
      backgroundColor: darkMode ? "#1e293b" : "white",
      borderRadius: "1rem",
      boxShadow: darkMode 
        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      padding: "2rem",
      zIndex: 10,
      border: darkMode ? "1px solid #334155" : "none",
      transition: "background-color 0.3s ease, border-color 0.3s ease",
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
      position: "relative",
    },
    darkModeToggle: {
      position: "absolute",
      top: "-0.5rem",
      right: "-0.5rem",
      background: darkMode ? "#475569" : "#e5e7eb",
      border: "none",
      borderRadius: "50%",
      width: "2.5rem",
      height: "2.5rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      color: darkMode ? "#f1f5f9" : "#374151",
    },
    h1: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: darkMode ? "#f1f5f9" : "#1f2937",
      transition: "color 0.3s ease",
    },
    p: {
      color: darkMode ? "#94a3b8" : "#6b7280",
      marginTop: "0.5rem",
      transition: "color 0.3s ease",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: 500,
      color: darkMode ? "#cbd5e1" : "#374151",
      marginBottom: "0.25rem",
      transition: "color 0.3s ease",
    },
    inputGroup: {
      position: "relative",
    },
    dollarSign: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: "0.75rem",
      color: darkMode ? "#94a3b8" : "#6b7280",
      pointerEvents: "none",
      transition: "color 0.3s ease",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      paddingLeft: "1.75rem",
      backgroundColor: darkMode ? "#334155" : "#f9fafb",
      border: `1px solid ${darkMode ? "#475569" : "#d1d5db"}`,
      borderRadius: "0.5rem",
      color: darkMode ? "#f1f5f9" : "#111827",
      transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.3s ease, color 0.3s ease",
      boxSizing: "border-box",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: darkMode ? "#334155" : "#f9fafb",
      border: `1px solid ${darkMode ? "#475569" : "#d1d5db"}`,
      borderRadius: "0.5rem",
      color: darkMode ? "#f1f5f9" : "#111827",
      boxSizing: "border-box",
      transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    currencyRow: {
      display: "flex",
      alignItems: "flex-end",
      gap: "0.5rem",
    },
    swapButton: {
      padding: "0.75rem",
      borderRadius: "9999px",
      backgroundColor: darkMode ? "#475569" : "#e5e7eb",
      color: darkMode ? "#f1f5f9" : "#4b5563",
      border: "none",
      cursor: "pointer",
      marginBottom: "0.25rem",
      transition: "background-color 0.3s ease, transform 0.3s, color 0.3s ease",
    },
    submitButton: {
      width: "100%",
      padding: "0.875rem 1rem",
      backgroundColor: isLoading 
        ? (darkMode ? "#1e40af" : "#93c5fd")
        : (darkMode ? "#1d4ed8" : "#2563eb"),
      color: "white",
      fontWeight: "600",
      borderRadius: "0.5rem",
      border: "none",
      cursor: isLoading ? "not-allowed" : "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      transition: "background-color 0.3s ease, transform 0.2s",
    },
    resultsContainer: {
      marginTop: "1.5rem",
      textAlign: "center",
      minHeight: "9rem",
    },
    errorBox: {
      backgroundColor: darkMode ? "#450a0a" : "#fee2e2",
      border: `1px solid ${darkMode ? "#7f1d1d" : "#fca5a5"}`,
      color: darkMode ? "#fca5a5" : "#b91c1c",
      padding: "0.75rem",
      borderRadius: "0.5rem",
      transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
    },
    resultBox: {
      backgroundColor: darkMode ? "#064e3b" : "#dcfce7",
      border: `1px solid ${darkMode ? "#059669" : "#86efac"}`,
      color: darkMode ? "#6ee7b7" : "#166534",
      padding: "1rem",
      borderRadius: "0.5rem",
      boxShadow: darkMode
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: "opacity 0.5s, transform 0.5s, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
      opacity: isResultVisible ? 1 : 0,
      transform: isResultVisible ? "translateY(0)" : "translateY(1rem)",
    },
    resultText: {
      fontSize: "1.125rem",
      color: darkMode ? "#cbd5e1" : "#4b5563",
      transition: "color 0.3s ease",
    },
    resultAmount: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      color: darkMode ? "#f1f5f9" : "#1f2937",
      transition: "color 0.3s ease",
    },
    resultConverted: {
      fontSize: "2.25rem",
      fontWeight: "800",
      color: darkMode ? "#10b981" : "#15803d",
      transition: "color 0.3s ease",
    },
    tippingButton: {
      background: "none",
      border: "none",
      color: darkMode ? "#60a5fa" : "#2563eb",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "color 0.3s ease",
    },
  };

  // Dynamic blob colors based on dark mode
  const blobStyles = darkMode ? `
    .blob-1 { background: linear-gradient(45deg, #1e40af, #3730a3); }
    .blob-2 { background: linear-gradient(45deg, #7c3aed, #5b21b6); }
    .blob-3 { background: linear-gradient(45deg, #be185d, #831843); }
  ` : `
    .blob-1 { background: #bfdbfe; }
    .blob-2 { background: #e9d5ff; }
    .blob-3 { background: #fbcfe8; }
  `;

  return (
    <div style={styles.mainContainer}>
      <style>{`
        @keyframes blob { 
          0% { transform: translate(0px, 0px) scale(1); } 
          33% { transform: translate(30px, -50px) scale(1.1); } 
          66% { transform: translate(-20px, 20px) scale(0.9); } 
          100% { transform: translate(0px, 0px) scale(1); } 
        }
        .animate-blob { 
          animation: blob 7s infinite; 
        }
        .animation-delay-2000 { 
          animation-delay: 2s; 
        }
        .animation-delay-4000 { 
          animation-delay: 4s; 
        }
        ${blobStyles}
        
        /* Input focus styles for dark mode */
        input:focus, select:focus {
          outline: none;
          border-color: ${darkMode ? "#60a5fa" : "#3b82f6"};
          box-shadow: 0 0 0 3px ${darkMode ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.1)"};
        }
        
        /* Hover effects */
        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }
      `}</style>
      
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}>
        <div className="animate-blob blob-1 absolute -top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-blob animation-delay-2000 blob-2 absolute -bottom-40 -right-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="animate-blob animation-delay-4000 blob-3 absolute -bottom-40 left-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.h1}>Currency Converter</h1>
          <p style={styles.p}>Get real-time currency exchange rates</p>
        </div>

        <div style={styles.form}>
          <div>
            <label htmlFor="amount" style={styles.label}>
              Amount
            </label>
            <div style={styles.inputGroup}>
              <span style={styles.dollarSign}>$</span>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
                placeholder="1.00"
                step="0.01"
              />
            </div>
          </div>

          <div style={styles.currencyRow}>
            <div style={{ flex: 1 }}>
              <label htmlFor="fromCurrency" style={styles.label}>
                From
              </label>
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                style={styles.select}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleSwapCurrencies}
              style={styles.swapButton}
              title="Swap currencies"
            >
              ⇄
            </button>

            <div style={{ flex: 1 }}>
              <label htmlFor="toCurrency" style={styles.label}>
                To
              </label>
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                style={styles.select}
              >
                {Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code} - {currencies[code]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="date" style={styles.label}>
              Exchange Rate Date (optional)
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={today}
              style={{ ...styles.input, paddingLeft: "0.75rem" }}
            />
          </div>

          <button
            type="button"
            onClick={handleConvert}
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Converting..." : "Convert"}
          </button>
        </div>

        <div style={styles.resultsContainer}>
          {error && (
            <div style={styles.errorBox}>
              <p>{error}</p>
            </div>
          )}

          {baseInfo && convertedAmount !== null && !error && (
            <div style={styles.resultBox}>
              <p style={styles.resultText}>
                <span style={styles.resultAmount}>
                  {baseInfo.amount.toLocaleString()} {baseInfo.base}
                </span>{" "}
                is equal to{" "}
              </p>
              <p style={styles.resultConverted}>
                {convertedAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}{" "}
                {toCurrency}{" "}
              </p>
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InfoPill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  text={`Date: ${baseInfo.date}`}
                />
                <InfoPill
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  text="ECB Data"
                />
              </div>
              <button
                onClick={() => setShowTippingGuide(true)}
                style={styles.tippingButton}
              >
                View Tipping Guide for {toCurrency}
              </button>
            </div>
          )}
        </div>
      </div>

      {showTippingGuide && (
        <TippingGuide
          currency={toCurrency}
          onClose={() => setShowTippingGuide(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Currency;
