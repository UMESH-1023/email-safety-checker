import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { History, CheckCircle, AlertTriangle, XCircle, Trash2, Search, Clock } from "lucide-react";
import { motion } from "motion/react";

interface HistoryItem {
  emailContent: string;
  riskLevel: "safe" | "suspicious" | "high-risk";
  riskScore: number;
  suspiciousKeywords: string[];
  scamType: string;
  timestamp: string;
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedHistory = localStorage.getItem("emailHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const getRiskConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return {
          icon: CheckCircle,
          color: "text-secondary",
          bgColor: "bg-secondary/10",
          borderColor: "border-secondary/30",
          label: "Safe",
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          label: "Suspicious",
        };
      case "high-risk":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
          label: "High Risk",
        };
      default:
        return {
          icon: AlertTriangle,
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          borderColor: "border-border",
          label: "Unknown",
        };
    }
  };

  const handleViewResult = (item: HistoryItem) => {
    navigate("/results", { state: item });
  };

  const handleDelete = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("emailHistory", JSON.stringify(newHistory));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      setHistory([]);
      localStorage.removeItem("emailHistory");
    }
  };

  const filteredHistory = history.filter((item) =>
    item.emailContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl mb-2 text-foreground">Scan History</h1>
              <p className="text-base text-muted-foreground">
                View and manage your previous email scans
              </p>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Search Bar */}
          {history.length > 0 && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search email content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          )}
        </motion.div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-6">
              <History className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl mb-3 text-foreground">
              {history.length === 0 ? "No Scans Yet" : "No Results Found"}
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
              {history.length === 0
                ? "Start analyzing emails to build your scan history."
                : "Try adjusting your search term."}
            </p>
            {history.length === 0 && (
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all"
              >
                Start Analyzing
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => {
              const config = getRiskConfig(item.riskLevel);
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card rounded-xl shadow-md border border-border hover:border-primary/50 transition-all p-6 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Risk Badge */}
                    <div className={`${config.bgColor} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-3 py-1 ${config.bgColor} ${config.color} rounded-full text-sm border ${config.borderColor}`}
                            >
                              {config.label}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Risk Score:</span>
                            <span className={`text-base ${config.color}`}>
                              {item.riskScore}/100
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewResult(item)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm opacity-0 group-hover:opacity-100"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Email Preview */}
                      <div className="bg-muted/50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.emailContent}
                        </p>
                      </div>

                      {/* Suspicious Keywords */}
                      {item.suspiciousKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-muted-foreground">
                            Detected keywords:
                          </span>
                          {item.suspiciousKeywords.slice(0, 5).map((keyword, kidx) => (
                            <span
                              key={kidx}
                              className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs border border-destructive/20"
                            >
                              {keyword}
                            </span>
                          ))}
                          {item.suspiciousKeywords.length > 5 && (
                            <span className="text-xs text-muted-foreground">
                              +{item.suspiciousKeywords.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-card rounded-xl shadow-md border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-foreground">Safe Emails</h3>
              </div>
              <p className="text-3xl text-secondary">
                {history.filter((h) => h.riskLevel === "safe").length}
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-md border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-500/10 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="text-foreground">Suspicious</h3>
              </div>
              <p className="text-3xl text-yellow-500">
                {history.filter((h) => h.riskLevel === "suspicious").length}
              </p>
            </div>

            <div className="bg-card rounded-xl shadow-md border border-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-destructive/10 p-2 rounded-lg">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-foreground">High Risk</h3>
              </div>
              <p className="text-3xl text-destructive">
                {history.filter((h) => h.riskLevel === "high-risk").length}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
