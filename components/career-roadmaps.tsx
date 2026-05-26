"use client"

import { useState } from "react"
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  Lock,
  PlayCircle,
  Clock,
  Star,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roadmaps = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Master modern web development with React, TypeScript, and more",
    progress: 68,
    totalSkills: 45,
    completedSkills: 31,
    estimatedTime: "6 months",
    color: "primary",
    icon: "⚛️",
    skills: [
      { 
        id: 1, 
        name: "HTML & CSS Fundamentals", 
        status: "completed" as const,
        topics: ["HTML5 Semantic Elements", "CSS Flexbox", "CSS Grid", "Responsive Design"]
      },
      { 
        id: 2, 
        name: "JavaScript Core", 
        status: "completed" as const,
        topics: ["ES6+ Features", "Async/Await", "DOM Manipulation", "Event Handling"]
      },
      { 
        id: 3, 
        name: "React Fundamentals", 
        status: "completed" as const,
        topics: ["Components", "Props & State", "Hooks", "Context API"]
      },
      { 
        id: 4, 
        name: "Advanced React Patterns", 
        status: "in-progress" as const,
        topics: ["Custom Hooks", "Compound Components", "Render Props", "HOCs"]
      },
      { 
        id: 5, 
        name: "TypeScript", 
        status: "in-progress" as const,
        topics: ["Types & Interfaces", "Generics", "Utility Types", "Type Guards"]
      },
      { 
        id: 6, 
        name: "State Management", 
        status: "locked" as const,
        topics: ["Redux Toolkit", "Zustand", "Jotai", "Recoil"]
      },
      { 
        id: 7, 
        name: "Testing", 
        status: "locked" as const,
        topics: ["Jest", "React Testing Library", "Cypress", "Playwright"]
      },
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Build scalable server-side applications and APIs",
    progress: 42,
    totalSkills: 38,
    completedSkills: 16,
    estimatedTime: "8 months",
    color: "accent",
    icon: "🔧",
    skills: [
      { id: 1, name: "Node.js Basics", status: "completed" as const, topics: [] },
      { id: 2, name: "Express.js", status: "completed" as const, topics: [] },
      { id: 3, name: "Databases (SQL)", status: "in-progress" as const, topics: [] },
      { id: 4, name: "REST API Design", status: "in-progress" as const, topics: [] },
      { id: 5, name: "Authentication", status: "locked" as const, topics: [] },
      { id: 6, name: "GraphQL", status: "locked" as const, topics: [] },
    ]
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Master CI/CD, containers, and cloud infrastructure",
    progress: 25,
    totalSkills: 32,
    completedSkills: 8,
    estimatedTime: "10 months",
    color: "chart-3",
    icon: "🚀",
    skills: [
      { id: 1, name: "Linux Fundamentals", status: "completed" as const, topics: [] },
      { id: 2, name: "Docker", status: "in-progress" as const, topics: [] },
      { id: 3, name: "CI/CD Pipelines", status: "locked" as const, topics: [] },
      { id: 4, name: "Kubernetes", status: "locked" as const, topics: [] },
      { id: 5, name: "AWS Basics", status: "locked" as const, topics: [] },
    ]
  },
  {
    id: "aiml",
    title: "AI/ML Engineer",
    description: "Dive into machine learning and artificial intelligence",
    progress: 15,
    totalSkills: 40,
    completedSkills: 6,
    estimatedTime: "12 months",
    color: "chart-4",
    icon: "🤖",
    skills: [
      { id: 1, name: "Python for ML", status: "completed" as const, topics: [] },
      { id: 2, name: "NumPy & Pandas", status: "in-progress" as const, topics: [] },
      { id: 3, name: "Machine Learning Basics", status: "locked" as const, topics: [] },
      { id: 4, name: "Deep Learning", status: "locked" as const, topics: [] },
      { id: 5, name: "NLP", status: "locked" as const, topics: [] },
    ]
  },
]

export function CareerRoadmaps() {
  const [expandedRoadmap, setExpandedRoadmap] = useState<string | null>("frontend")
  const [expandedSkill, setExpandedSkill] = useState<number | null>(4)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Career Roadmaps</h1>
          <p className="text-muted-foreground mt-1">
            Follow structured learning paths to achieve your career goals
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 glow-primary">
          <Star className="w-4 h-4 mr-2" />
          Create Custom Roadmap
        </Button>
      </div>

      {/* Roadmaps Grid */}
      <div className="space-y-4">
        {roadmaps.map((roadmap) => {
          const isExpanded = expandedRoadmap === roadmap.id
          
          return (
            <Card 
              key={roadmap.id} 
              className={cn(
                "glass-card border-border/50 transition-all duration-300",
                isExpanded && "border-primary/30 glow-primary"
              )}
            >
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setExpandedRoadmap(isExpanded ? null : roadmap.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{roadmap.icon}</div>
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {roadmap.title}
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-secondary/50"
                        >
                          {roadmap.progress}% Complete
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {roadmap.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          {roadmap.completedSkills}/{roadmap.totalSkills} skills
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{roadmap.estimatedTime}</span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <Progress 
                  value={roadmap.progress} 
                  className="h-2 mt-4 bg-secondary"
                />
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="relative pl-8 space-y-2">
                    {/* Timeline line */}
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border/50" />
                    
                    {roadmap.skills.map((skill, index) => {
                      const isSkillExpanded = expandedSkill === skill.id && expandedRoadmap === roadmap.id
                      
                      return (
                        <div key={skill.id} className="relative">
                          {/* Timeline dot */}
                          <div className={cn(
                            "absolute -left-5 w-4 h-4 rounded-full border-2 flex items-center justify-center",
                            skill.status === "completed" && "bg-accent border-accent",
                            skill.status === "in-progress" && "bg-primary border-primary animate-pulse",
                            skill.status === "locked" && "bg-secondary border-border"
                          )}>
                            {skill.status === "completed" && (
                              <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                            )}
                            {skill.status === "in-progress" && (
                              <PlayCircle className="w-3 h-3 text-primary-foreground" />
                            )}
                            {skill.status === "locked" && (
                              <Lock className="w-2 h-2 text-muted-foreground" />
                            )}
                          </div>

                          <div 
                            className={cn(
                              "ml-4 p-4 rounded-lg transition-all duration-200",
                              skill.status === "locked" 
                                ? "bg-secondary/30 opacity-60" 
                                : "glass hover:bg-secondary/50 cursor-pointer",
                              isSkillExpanded && "bg-secondary/50"
                            )}
                            onClick={() => skill.status !== "locked" && setExpandedSkill(isSkillExpanded ? null : skill.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-foreground">{skill.name}</span>
                                <Badge 
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    skill.status === "completed" && "border-accent/50 text-accent",
                                    skill.status === "in-progress" && "border-primary/50 text-primary",
                                    skill.status === "locked" && "border-border text-muted-foreground"
                                  )}
                                >
                                  {skill.status === "completed" && "Completed"}
                                  {skill.status === "in-progress" && "In Progress"}
                                  {skill.status === "locked" && "Locked"}
                                </Badge>
                              </div>
                              {skill.status !== "locked" && skill.topics.length > 0 && (
                                <ChevronRight className={cn(
                                  "w-4 h-4 text-muted-foreground transition-transform",
                                  isSkillExpanded && "rotate-90"
                                )} />
                              )}
                            </div>

                            {isSkillExpanded && skill.topics.length > 0 && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {skill.topics.map((topic, i) => (
                                  <div 
                                    key={i}
                                    className="flex items-center gap-2 p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                                  >
                                    <CheckCircle2 className="w-3 h-3 text-accent" />
                                    <span className="text-sm text-foreground">{topic}</span>
                                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="outline" className="border-border/50">
                      View Full Roadmap
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90">
                      Continue Learning
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
