"use client"

import { useState, useCallback } from "react"
import { 
  Upload, 
  FileText, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  RefreshCw,
  Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  RadialBarChart, 
  RadialBar, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { cn } from "@/lib/utils"

const analysisResult = {
  overallScore: 78,
  sections: [
    { name: "Contact Info", score: 95, status: "good" as const },
    { name: "Work Experience", score: 82, status: "good" as const },
    { name: "Skills Section", score: 65, status: "warning" as const },
    { name: "Education", score: 90, status: "good" as const },
    { name: "Projects", score: 70, status: "warning" as const },
    { name: "Keywords", score: 55, status: "poor" as const },
  ],
  missingKeywords: [
    "TypeScript", "GraphQL", "AWS", "Docker", "Kubernetes", 
    "CI/CD", "Agile", "Scrum", "REST API", "Microservices"
  ],
  presentKeywords: [
    "JavaScript", "React", "Node.js", "Python", "Git", 
    "SQL", "MongoDB", "HTML", "CSS", "Linux"
  ],
  suggestions: [
    { 
      id: 1, 
      priority: "high" as const,
      title: "Add More Technical Keywords",
      description: "Your resume is missing important keywords like TypeScript, AWS, and Docker that appear in 78% of similar job postings."
    },
    { 
      id: 2, 
      priority: "high" as const,
      title: "Quantify Your Achievements",
      description: "Add specific metrics to your work experience. Instead of 'improved performance', say 'improved performance by 40%'."
    },
    { 
      id: 3, 
      priority: "medium" as const,
      title: "Expand Projects Section",
      description: "Add 1-2 more technical projects that demonstrate your skills with cloud technologies and system design."
    },
    { 
      id: 4, 
      priority: "medium" as const,
      title: "Include Certifications",
      description: "Consider adding relevant certifications like AWS Solutions Architect or Google Cloud Professional."
    },
    { 
      id: 5, 
      priority: "low" as const,
      title: "Optimize Formatting",
      description: "Use consistent bullet point formatting and ensure adequate whitespace for better ATS readability."
    },
  ]
}

const scoreData = [
  { name: "Score", value: 78, fill: "oklch(0.7 0.2 280)" }
]

export function ResumeAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalysis, setHasAnalysis] = useState(true)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    // Simulate analysis
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalysis(true)
    }, 2000)
  }, [])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalysis(true)
    }, 2000)
  }

  const getStatusColor = (status: "good" | "warning" | "poor") => {
    switch (status) {
      case "good": return "text-green-400 bg-green-500/20"
      case "warning": return "text-yellow-400 bg-yellow-500/20"
      case "poor": return "text-red-400 bg-red-500/20"
    }
  }

  const getStatusIcon = (status: "good" | "warning" | "poor") => {
    switch (status) {
      case "good": return CheckCircle2
      case "warning": return AlertCircle
      case "poor": return XCircle
    }
  }

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            Resume Analyzer
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Get instant feedback and optimize your resume for ATS systems
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card 
        className={cn(
          "glass-card border-border/50 transition-all duration-300",
          dragActive && "border-primary/50 glow-primary"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8">
          <div className={cn(
            "flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-colors",
            dragActive ? "border-primary bg-primary/10" : "border-border/50"
          )}>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              {isAnalyzing ? (
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-primary" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isAnalyzing ? "Analyzing Resume..." : "Upload Your Resume"}
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {isAnalyzing 
                ? "Our AI is scanning your resume for keywords and formatting..."
                : "Drag and drop your PDF or DOCX file, or click to browse"
              }
            </p>
            {!isAnalyzing && (
              <div className="flex items-center gap-3">
                <Button className="bg-primary hover:bg-primary/90" onClick={handleAnalyze}>
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <span className="text-sm text-muted-foreground">or</span>
                <Button variant="outline" className="border-border/50" onClick={handleAnalyze}>
                  Use Sample Resume
                </Button>
              </div>
            )}
            {isAnalyzing && (
              <Progress value={66} className="w-64 h-2 mt-4" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {hasAnalysis && !isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Overview */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                ATS Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="60%" 
                    outerRadius="100%" 
                    data={scoreData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background={{ fill: 'rgba(255,255,255,0.1)' }}
                      dataKey="value"
                      cornerRadius={10}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center mt-16">
                  <span className="text-4xl font-bold text-foreground">{analysisResult.overallScore}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Industry Average</span>
                  <span className="text-foreground">65</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Top 10% Threshold</span>
                  <span className="text-foreground">85</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>

          {/* Section Breakdown */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                Section Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.sections.map((section) => {
                const StatusIcon = getStatusIcon(section.status)
                return (
                  <div key={section.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={cn("w-4 h-4", getStatusColor(section.status).split(" ")[0])} />
                        <span className="text-sm font-medium text-foreground">{section.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{section.score}%</span>
                    </div>
                    <Progress 
                      value={section.score} 
                      className="h-1.5"
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Keywords Analysis */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-chart-3" />
                Keyword Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.slice(0, 6).map((keyword) => (
                      <Badge 
                        key={keyword} 
                        variant="outline" 
                        className="bg-red-500/10 text-red-400 border-red-500/30 text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                    {analysisResult.missingKeywords.length > 6 && (
                      <Badge variant="outline" className="text-xs border-border/50">
                        +{analysisResult.missingKeywords.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Present Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.presentKeywords.slice(0, 6).map((keyword) => (
                      <Badge 
                        key={keyword} 
                        variant="outline" 
                        className="bg-green-500/10 text-green-400 border-green-500/30 text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                    {analysisResult.presentKeywords.length > 6 && (
                      <Badge variant="outline" className="text-xs border-border/50">
                        +{analysisResult.presentKeywords.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Improvement Suggestions */}
      {hasAnalysis && !isAnalyzing && (
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Recommendations
              </span>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {analysisResult.suggestions.length} suggestions
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResult.suggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className="flex items-start gap-4 p-4 rounded-lg glass hover:bg-secondary/50 transition-colors group"
                >
                  <Badge 
                    variant="outline" 
                    className={cn("capitalize text-xs shrink-0", getPriorityColor(suggestion.priority))}
                  >
                    {suggestion.priority}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Apply
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
