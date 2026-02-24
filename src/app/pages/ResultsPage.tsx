import { useLocation, Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { 
  Shield, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  ArrowLeft,
  AlertCircle,
  Info,
  Lightbulb
} from "lucide-react";
import { motion } from "motion/react";
import * as Progress from "@radix-ui/react-progress";

interface ResultState {
  emailContent: string;
  riskLevel: "safe" | "suspicious" | "high-risk";
  riskScore: number;
  suspiciousKeywords: string[];
  timestamp: string;
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as ResultState;

  useEffect(() => {
    if (!result) {
      navigate("/analyze");
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const getRiskConfig = () => {
    switch (result.riskLevel) {
      case "safe":
        return {
          icon: CheckCircle,
          color: "text-secondary",
          bgColor: "bg-secondary/10",
          borderColor: "border-secondary/30",
          title: "Safe",
          description: "This email appears to be legitimate with no significant red flags detected.",
          progressColor: "bg-secondary",
        };
      case "suspicious":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          title: "Suspicious",
          description: "This email contains some warning signs. Exercise caution before taking any action.",
          progressColor: "bg-yellow-500",
        };
      case "high-risk":
        return {
          icon: XCircle,
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/30",
          title: "High Risk",
          description: "This email shows strong indicators of being a scam or phishing attempt. Do not engage.",
          progressColor: "bg-destructive",
        };
    }
  };

  const config = getRiskConfig();
  const RiskIcon = config.icon;

  const getRecommendations = () => {
    switch (result.riskLevel) {
      case "safe":
        return [
          "You can proceed with this email, but always verify sender authenticity",
          "Be cautious with any links or attachments",
          "When in doubt, contact the sender through official channels",
        ];
      case "suspicious":
        return [
          "Do not click on any links or download attachments",
          "Verify the sender's email address carefully",
          "Contact the organization directly using official contact information",
          "Report this email to your IT department if received at work",
        ];
      case "high-risk":
        return [
          "DELETE this email immediately",
          "Do not respond or click any links",
          "Report this as spam/phishing to your email provider",
          "If you've already clicked links, change your passwords immediately",
          "Monitor your accounts for suspicious activity",
        ];
    }
  };

  const getAIExplanation = () => {
    const explanations = [];

    if (result.suspiciousKeywords.length > 0) {
      explanations.push(
        `Found ${result.suspiciousKeywords.length} suspicious keyword${result.suspiciousKeywords.length > 1 ? 's' : ''} commonly used in phishing emails.`
      );
    }

    if (result.riskLevel === "safe") {
      explanations.push(
        "The email content follows normal communication patterns and does not contain typical scam indicators."
      );
    } else if (result.riskLevel === "suspicious") {
      explanations.push(
        "The email contains language that creates urgency or requests sensitive actions, which are common phishing tactics."
      );
    } else {
      explanations.push(
        "This email exhibits multiple characteristics of a phishing attempt, including urgent language, requests for personal information, and suspicious calls to action."
      );
    }

    return explanations;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze Another Email
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl mb-4 text-foreground">Analysis Results</h1>
          <p className="text-base text-muted-foreground">
            Completed on {new Date(result.timestamp).toLocaleString()}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`bg-card rounded-2xl shadow-lg border-2 ${config.borderColor} p-8`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`${config.bgColor} p-3 rounded-xl`}>
                  <RiskIcon className={`w-8 h-8 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl mb-2 text-foreground">{config.title}</h2>
                  <p className="text-muted-foreground">{config.description}</p>
                </div>
              </div>

              {/* Risk Score */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-foreground">Risk Score</span>
                  <span className={`text-2xl ${config.color}`}>{result.riskScore}/100</span>
                </div>
                <Progress.Root
                  value={result.riskScore}
                  className="relative overflow-hidden bg-muted rounded-full w-full h-3"
                >
                  <Progress.Indicator
                    className={`h-full ${config.progressColor} transition-transform duration-500 ease-out`}
                    style={{ transform: `translateX(-${100 - result.riskScore}%)` }}
                  />
                </Progress.Root>
              </div>
            </motion.div>

            {/* Suspicious Phrases */}
            {result.suspiciousKeywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl shadow-lg border border-border p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <h3 className="text-foreground">Suspicious Phrases Detected</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.suspiciousKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm border border-destructive/20"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card rounded-2xl shadow-lg border border-border p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-primary" />
                <h3 className="text-foreground">AI Analysis Explanation</h3>
              </div>
              <div className="space-y-3">
                {getAIExplanation().map((explanation, index) => (
                  <p key={index} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{explanation}</span>
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Email Content Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card rounded-2xl shadow-lg border border-border p-8"
            >
              <h3 className="mb-4 text-foreground">Email Content</h3>
              <div className="bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {result.emailContent}
                </pre>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-2xl shadow-lg border border-border p-6 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h3 className="text-foreground">Recommended Actions</h3>
              </div>
              <div className="space-y-3">
                {getRecommendations().map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm text-accent-foreground">{recommendation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  to="/analyze"
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Analyze Another Email
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
