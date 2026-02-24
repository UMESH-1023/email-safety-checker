import { Link } from "react-router";
import { Shield, Search, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect phishing attempts and scams instantly.",
    },
    {
      icon: Search,
      title: "Deep Analysis",
      description: "Comprehensive scanning of email content, links, and sender information.",
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Clear risk scores and actionable insights to keep you safe.",
    },
    {
      icon: CheckCircle,
      title: "Instant Results",
      description: "Get security analysis in seconds, not minutes.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Shield className="w-4 h-4" />
                <span className="text-sm">AI-Powered Email Security</span>
              </div>
              
              <h1 className="text-5xl mb-6 text-foreground">
                Email Safety Checker
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Analyze emails and detect scams instantly using AI
              </p>
              
              <p className="text-base text-muted-foreground mb-8">
                Protect yourself from phishing attacks, fraudulent emails, and online scams. 
                Our advanced AI analyzes email content to identify suspicious patterns and keep you safe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/analyze"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
                >
                  Check Email
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 bg-card text-foreground px-6 py-3 rounded-lg hover:bg-accent transition-all border border-border"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
                <div>
                  <div className="text-3xl text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl text-secondary mb-1">1M+</div>
                  <div className="text-sm text-muted-foreground">Emails Scanned</div>
                </div>
                <div>
                  <div className="text-3xl text-accent-foreground mb-1">&lt;5s</div>
                  <div className="text-sm text-muted-foreground">Avg. Time</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1654588831193-0285dab84d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZW1haWwlMjBwcm90ZWN0aW9uJTIwc2hpZWxkfGVufDF8fHx8MTc3MTkyODc4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Email Security Illustration"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="text-foreground">Protected</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-foreground">
              Advanced Email Protection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system provides comprehensive security analysis to protect you from email threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl mb-6 text-foreground">
              Ready to Protect Your Inbox?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start analyzing your emails for free. No registration required.
            </p>
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
