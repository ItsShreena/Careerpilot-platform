"use client"

import { 
  Code2,
  FolderKanban,
  Award,
  Clock,
  TrendingUp,
  Calendar,
  Target,
  Flame,
  Trophy,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"

const dsaProgress = {
  easy: { solved: 145, total: 200 },
  medium: { solved: 89, total: 300 },
  hard: { solved: 23, total: 100 },
}

const topicProgress = [
  { topic: "Arrays", solved: 45, total: 60, percentage: 75 },
  { topic: "Strings", solved: 38, total: 50, percentage: 76 },
  { topic: "Linked Lists", solved: 22, total: 30, percentage: 73 },
  { topic: "Trees", solved: 28, total: 45, percentage: 62 },
  { topic: "Graphs", solved: 15, total: 35, percentage: 43 },
  { topic: "Dynamic Programming", solved: 18, total: 50, percentage: 36 },
  { topic: "Recursion", solved: 30, total: 40, percentage: 75 },
  { topic: "Sorting", solved: 25, total: 30, percentage: 83 },
]

const weeklyStudyHours = [
  { week: "Week 1", hours: 28, problems: 35 },
  { week: "Week 2", hours: 32, problems: 42 },
  { week: "Week 3", hours: 25, problems: 30 },
  { week: "Week 4", hours: 38, problems: 48 },
  { week: "Week 5", hours: 42, problems: 55 },
  { week: "Week 6", hours: 35, problems: 45 },
]

const monthlyProgress = [
  { month: "Jul", problems: 85, projects: 1, certifications: 0 },
  { month: "Aug", problems: 120, projects: 2, certifications: 1 },
  { month: "Sep", problems: 95, projects: 1, certifications: 0 },
  { month: "Oct", problems: 150, projects: 3, certifications: 1 },
  { month: "Nov", problems: 180, projects: 2, certifications: 2 },
  { month: "Dec", problems: 145, projects: 1, certifications: 0 },
]

const skillRadarData = [
  { skill: "Frontend", value: 85 },
  { skill: "Backend", value: 70 },
  { skill: "DSA", value: 75 },
  { skill: "System Design", value: 55 },
  { skill: "DevOps", value: 45 },
  { skill: "ML/AI", value: 35 },
]

const projects = [
  { 
    id: 1, 
    name: "E-commerce Platform", 
    status: "completed" as const,
    progress: 100,
    tech: ["React", "Node.js", "PostgreSQL"],
    startDate: "Oct 2024",
    endDate: "Nov 2024"
  },
  { 
    id: 2, 
    name: "Real-time Chat App", 
    status: "in-progress" as const,
    progress: 65,
    tech: ["Next.js", "Socket.io", "Redis"],
    startDate: "Nov 2024",
    endDate: null
  },
  { 
    id: 3, 
    name: "ML Model Dashboard", 
    status: "in-progress" as const,
    progress: 30,
    tech: ["Python", "FastAPI", "React"],
    startDate: "Dec 2024",
    endDate: null
  },
  { 
    id: 4, 
    name: "Portfolio Website", 
    status: "completed" as const,
    progress: 100,
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    startDate: "Sep 2024",
    endDate: "Sep 2024"
  },
]

const certifications = [
  { 
    id: 1, 
    name: "AWS Solutions Architect", 
    issuer: "Amazon Web Services",
    date: "Nov 2024",
    status: "earned" as const
  },
  { 
    id: 2, 
    name: "Meta Frontend Developer", 
    issuer: "Meta",
    date: "Oct 2024",
    status: "earned" as const
  },
  { 
    id: 3, 
    name: "Google Cloud Professional", 
    issuer: "Google",
    date: null,
    status: "in-progress" as const,
    progress: 60
  },
  { 
    id: 4, 
    name: "Kubernetes Administrator", 
    issuer: "CNCF",
    date: null,
    status: "planned" as const
  },
]

const consistencyData = Array.from({ length: 365 }, (_, i) => ({
  day: i,
  value: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
}))

export function SkillAnalytics() {
  const totalProblems = dsaProgress.easy.solved + dsaProgress.medium.solved + dsaProgress.hard.solved

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Skill Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress across DSA, projects, and certifications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/50">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-foreground">{totalProblems}</span>
            <span className="text-sm text-muted-foreground">problems solved</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dsa" className="space-y-6">
        <TabsList className="glass border border-border/50 p-1">
          <TabsTrigger value="dsa" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Code2 className="w-4 h-4 mr-2" />
            DSA Progress
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <FolderKanban className="w-4 h-4 mr-2" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="certifications" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Award className="w-4 h-4 mr-2" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="consistency" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            <Flame className="w-4 h-4 mr-2" />
            Consistency
          </TabsTrigger>
        </TabsList>

        {/* DSA Progress Tab */}
        <TabsContent value="dsa" className="space-y-6">
          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Easy</Badge>
                  <span className="text-sm text-muted-foreground">
                    {dsaProgress.easy.solved}/{dsaProgress.easy.total}
                  </span>
                </div>
                <Progress 
                  value={(dsaProgress.easy.solved / dsaProgress.easy.total) * 100} 
                  className="h-3"
                />
                <p className="text-2xl font-bold text-foreground mt-3">
                  {Math.round((dsaProgress.easy.solved / dsaProgress.easy.total) * 100)}%
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medium</Badge>
                  <span className="text-sm text-muted-foreground">
                    {dsaProgress.medium.solved}/{dsaProgress.medium.total}
                  </span>
                </div>
                <Progress 
                  value={(dsaProgress.medium.solved / dsaProgress.medium.total) * 100} 
                  className="h-3"
                />
                <p className="text-2xl font-bold text-foreground mt-3">
                  {Math.round((dsaProgress.medium.solved / dsaProgress.medium.total) * 100)}%
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Hard</Badge>
                  <span className="text-sm text-muted-foreground">
                    {dsaProgress.hard.solved}/{dsaProgress.hard.total}
                  </span>
                </div>
                <Progress 
                  value={(dsaProgress.hard.solved / dsaProgress.hard.total) * 100} 
                  className="h-3"
                />
                <p className="text-2xl font-bold text-foreground mt-3">
                  {Math.round((dsaProgress.hard.solved / dsaProgress.hard.total) * 100)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Topic Progress & Study Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Topic Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topicProgress.map((topic) => (
                  <div key={topic.topic} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{topic.topic}</span>
                      <span className="text-muted-foreground">{topic.solved}/{topic.total}</span>
                    </div>
                    <Progress value={topic.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Weekly Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={weeklyStudyHours}>
                    <defs>
                      <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.6 0.25 170)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="oklch(0.6 0.25 170)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(20,20,35,0.9)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="oklch(0.6 0.25 170)" 
                      fillOpacity={1} 
                      fill="url(#colorStudy)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skill Radar */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-chart-3" />
                Skill Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillRadarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]}
                      tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                    />
                    <Radar 
                      name="Skills" 
                      dataKey="value" 
                      stroke="oklch(0.7 0.2 280)" 
                      fill="oklch(0.7 0.2 280)" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="glass-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.startDate} - {project.endDate || "Present"}
                      </p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        project.status === "completed" 
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {project.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs bg-secondary/50">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <Progress value={project.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">{project.progress}% complete</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Monthly Progress Chart */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20,20,35,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="problems" fill="oklch(0.7 0.2 280)" radius={[4, 4, 0, 0]} name="Problems" />
                  <Bar dataKey="projects" fill="oklch(0.6 0.25 170)" radius={[4, 4, 0, 0]} name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="glass-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={
                            cert.status === "earned" 
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : cert.status === "in-progress"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-secondary text-muted-foreground border-border"
                          }
                        >
                          {cert.status === "earned" && "Earned"}
                          {cert.status === "in-progress" && "In Progress"}
                          {cert.status === "planned" && "Planned"}
                        </Badge>
                      </div>
                      
                      {cert.date && (
                        <p className="text-sm text-accent mt-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {cert.date}
                        </p>
                      )}
                      
                      {cert.progress && (
                        <div className="mt-3">
                          <Progress value={cert.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">{cert.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Consistency Tab */}
        <TabsContent value="consistency" className="space-y-6">
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Coding Activity
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  {consistencyData.filter(d => d.value > 0).length} active days this year
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {consistencyData.map((day, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-sm heatmap-cell"
                    style={{
                      backgroundColor: day.value === 0 
                        ? 'rgba(255,255,255,0.05)' 
                        : `oklch(0.6 ${0.1 + day.value * 0.05} 170 / ${0.3 + day.value * 0.2})`
                    }}
                    title={`${day.value} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: level === 0 
                            ? 'rgba(255,255,255,0.05)' 
                            : `oklch(0.6 ${0.1 + level * 0.05} 170 / ${0.3 + level * 0.2})`
                        }}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Current Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">28</p>
                    <p className="text-xs text-muted-foreground">Longest Streak</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Hours Chart */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Study Hours Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyStudyHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20,20,35,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="oklch(0.7 0.2 280)" 
                    strokeWidth={3}
                    dot={{ fill: 'oklch(0.7 0.2 280)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'oklch(0.7 0.2 280)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="problems" 
                    stroke="oklch(0.6 0.25 170)" 
                    strokeWidth={3}
                    dot={{ fill: 'oklch(0.6 0.25 170)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'oklch(0.6 0.25 170)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
