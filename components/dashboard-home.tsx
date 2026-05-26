"use client"

import { 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Calendar,
  ArrowUpRight,
  Code2,
  BookOpen,
  Trophy,
  Flame
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const productivityData = [
  { day: "Mon", hours: 4.5, problems: 8 },
  { day: "Tue", hours: 6.2, problems: 12 },
  { day: "Wed", hours: 5.8, problems: 10 },
  { day: "Thu", hours: 7.1, problems: 15 },
  { day: "Fri", hours: 4.2, problems: 7 },
  { day: "Sat", hours: 8.5, problems: 18 },
  { day: "Sun", hours: 6.0, problems: 11 },
]

const weeklyGoals = [
  { id: 1, title: "Complete React Advanced Course", progress: 78, target: "10 modules", current: "7.8 modules" },
  { id: 2, title: "Solve 20 LeetCode Problems", progress: 65, target: "20 problems", current: "13 solved" },
  { id: 3, title: "Build Portfolio Project", progress: 45, target: "Full stack app", current: "Backend done" },
  { id: 4, title: "Apply to 5 Internships", progress: 100, target: "5 applications", current: "5 sent" },
]

const activityTimeline = [
  { id: 1, type: "problem", title: "Solved 'Two Sum' on LeetCode", time: "2 min ago", icon: Code2 },
  { id: 2, type: "course", title: "Completed Module 7: Hooks Deep Dive", time: "1 hour ago", icon: BookOpen },
  { id: 3, type: "achievement", title: "Earned 'Problem Solver' badge", time: "3 hours ago", icon: Trophy },
  { id: 4, type: "streak", title: "12-day coding streak!", time: "Today", icon: Flame },
]

const heatmapData = Array.from({ length: 52 }, (_, weekIndex) => 
  Array.from({ length: 7 }, (_, dayIndex) => ({
    week: weekIndex,
    day: dayIndex,
    value: Math.floor(Math.random() * 5),
  }))
).flat()

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, Shreena! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            {"You're making great progress. Keep up the momentum!"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/50">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-foreground">12</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/50">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-foreground">8</span>
            <span className="text-sm text-muted-foreground">badges</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Study Hours"
          value="42.3"
          unit="hrs"
          change="+12%"
          positive
          icon={Clock}
          color="primary"
        />
        <StatsCard
          title="Problems Solved"
          value="81"
          unit="this week"
          change="+23%"
          positive
          icon={Target}
          color="accent"
        />
        <StatsCard
          title="Course Progress"
          value="78%"
          unit="complete"
          change="+8%"
          positive
          icon={TrendingUp}
          color="chart-3"
        />
        <StatsCard
          title="Energy Score"
          value="92"
          unit="/100"
          change="+5%"
          positive
          icon={Zap}
          color="chart-4"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Chart */}
        <Card className="lg:col-span-2 glass-card border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Weekly Productivity</CardTitle>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              This Week
            </Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                <XAxis dataKey="day" stroke="rgba(0,0,0,0.5)" fontSize={12} />
                <YAxis stroke="rgba(0,0,0,0.5)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    color: '#1a1a2e'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#7c3aed" 
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              Recent Activity
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityTimeline.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals & Contribution Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              Weekly Goals
              <Badge variant="outline" className="border-accent/50 text-accent">
                3/4 On Track
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{goal.title}</span>
                  <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress 
                  value={goal.progress} 
                  className="h-2 bg-secondary"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{goal.current}</span>
                  <span>{goal.target}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contribution Heatmap */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              Coding Activity
              <span className="text-sm font-normal text-muted-foreground">247 contributions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-1 flex-wrap">
              {heatmapData.slice(0, 140).map((cell, index) => {
                const opacity = cell.value === 0 ? 0.05 : 0.2 + cell.value * 0.2
                return (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-sm heatmap-cell"
                    style={{
                      backgroundColor: cell.value === 0 
                        ? 'rgba(0,0,0,0.05)' 
                        : `rgba(16, 185, 129, ${opacity})`
                    }}
                    title={`${cell.value} contributions`}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => {
                  const opacity = level === 0 ? 0.05 : 0.2 + level * 0.2
                  return (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: level === 0 
                          ? 'rgba(0,0,0,0.05)' 
                          : `rgba(16, 185, 129, ${opacity})`
                      }}
                    />
                  )
                })}
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote */}
      <Card className="glass-card border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground italic">
                {'"The only way to do great work is to love what you do."'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">— Steve Jobs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  unit: string
  change: string
  positive: boolean
  icon: React.ElementType
  color: string
}

function StatsCard({ title, value, unit, change, positive, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="glass-card border-border/50 hover:border-primary/30 transition-colors group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-5 h-5 text-${color}`} style={{ color: `var(--${color})` }} />
          </div>
          <Badge 
            variant="secondary" 
            className={`text-xs ${positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
          >
            {change}
            <ArrowUpRight className={`w-3 h-3 ml-0.5 ${!positive && 'rotate-90'}`} />
          </Badge>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}
