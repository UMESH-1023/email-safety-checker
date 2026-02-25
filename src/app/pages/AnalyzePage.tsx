import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Mail, Loader2, Shield, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [emailContent, setEmailContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleAnalyze = () => {
    if (!emailContent.trim()) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Simple heuristic-based risk assessment for demo
      const suspiciousKeywords = [
        "urgent", "verify", "suspended", "click here", "confirm", 
        "prize", "winner", "congratulations", "act now", "limited time",
        "password", "security alert", "unusual activity", "refund"
      ];

      const lowerContent = emailContent.toLowerCase();
      const suspiciousCount = suspiciousKeywords.filter(keyword => 
        lowerContent.includes(keyword)
      ).length;

      let riskLevel: "safe" | "suspicious" | "high-risk";
      let riskScore: number;

      if (suspiciousCount === 0) {
        riskLevel = "safe";
        riskScore = Math.floor(Math.random() * 20) + 5; // 5-24
      } else if (suspiciousCount <= 2) {
        riskLevel = "suspicious";
        riskScore = Math.floor(Math.random() * 30) + 40; // 40-69
      } else {
        riskLevel = "high-risk";
        riskScore = Math.floor(Math.random() * 25) + 75; // 75-99
      }

      // Find suspicious phrases
      const foundKeywords = suspiciousKeywords.filter(keyword =>
        lowerContent.includes(keyword)
      );

      // Determine scam type
      let scamType = "Legitimate Email";
      if (riskLevel === "high-risk" || riskLevel === "suspicious") {
        const scamTypes: string[] = [];
        if (lowerContent.includes("password") || lowerContent.includes("verify") || lowerContent.includes("suspended")) {
          scamTypes.push("Phishing");
        }
        if (lowerContent.includes("prize") || lowerContent.includes("winner") || lowerContent.includes("congratulations")) {
          scamTypes.push("Lottery Scam");
        }
        if (lowerContent.includes("urgent") || lowerContent.includes("act now") || lowerContent.includes("limited time")) {
          scamTypes.push("Urgency Scam");
        }
        if (lowerContent.includes("refund") || lowerContent.includes("payment") || lowerContent.includes("invoice")) {
          scamTypes.push("Financial Fraud");
        }
        if (lowerContent.includes("click here") || lowerContent.includes("confirm")) {
          scamTypes.push("Link Manipulation");
        }
        
        scamType = scamTypes.length > 0 ? scamTypes.join(" / ") : "General Scam";
      }

      const result = {
        emailContent,
        riskLevel,
        riskScore,
        suspiciousKeywords: foundKeywords,
        scamType,
        timestamp: new Date().toISOString(),
      };

      // Save to history
      const history = JSON.parse(localStorage.getItem("emailHistory") || "[]");
      history.unshift(result);
      localStorage.setItem("emailHistory", JSON.stringify(history.slice(0, 20)));

      setIsAnalyzing(false);
      navigate("/results", { state: result });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setEmailContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setEmailContent(text);
      };
      reader.readAsText(file);
    }
  };

  const exampleEmails = [
    {
      title: "Suspicious Example",
      content: "URGENT: Your account has been suspended! Click here immediately to verify your information and restore access. Act now or lose your account forever!"
    },
    {
      title: "Safe Example",
      content: "Hi there, just wanted to follow up on our meeting yesterday. Let me know if you have any questions about the project timeline. Thanks!"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl mb-4 text-foreground">Analyze Email</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste your email content below or upload a text file to scan for potential threats and scams.
          </p>
        </motion.div>

        {/* Main Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-6"
        >
          {/* Text Area */}
          <div className="mb-6">
            <label htmlFor="email-content" className="block mb-3 text-foreground">
              Email Content
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the email content you want to analyze here..."
              className="w-full h-64 px-4 py-3 bg-input-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              disabled={isAnalyzing}
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block mb-3 text-foreground">Upload Email File</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isAnalyzing}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                <p className="text-sm text-foreground mb-1">
                  Drop your email file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports .txt files only
                </p>
              </label>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={!emailContent.trim() || isAnalyzing}
            className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Analyze Email
              </>
            )}
          </button>
        </motion.div>

        {/* Example Emails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-foreground">Try Example Emails</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {exampleEmails.map((example, index) => (
              <button
                key={index}
                onClick={() => setEmailContent(example.content)}
                disabled={isAnalyzing}
                className="bg-card p-4 rounded-lg border border-border hover:border-primary/50 transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-sm text-foreground mb-2">{example.title}</div>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {example.content}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-accent/50 border border-accent-foreground/20 rounded-lg p-6"
        >
          <h4 className="text-accent-foreground mb-2">How it works</h4>
          <ul className="space-y-2 text-sm text-accent-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Our AI analyzes email content, sender information, and embedded links</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>We identify suspicious patterns commonly used in phishing and scam emails</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>You receive a detailed risk assessment with actionable recommendations</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
