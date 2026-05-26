"use client"

import { useState } from "react"
import { 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign,
  Clock,
  ChevronRight,
  Filter,
  Plus,
  ExternalLink,
  User,
  Mail,
  Phone,
  Linkedin
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { cn } from "@/lib/utils"

const internships = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineering Intern",
    location: "Mountain View, CA",
    salary: "$9,500/mo",
    deadline: "Dec 15, 2024",
    status: "interview" as const,
    stage: 3,
    totalStages: 5,
    stages: ["Applied", "OA", "Phone Screen", "Onsite", "Offer"],
    logo: "https://logo.clearbit.com/google.com",
    recruiter: {
      name: "Sarah Chen",
      email: "sarah.chen@google.com",
      linkedin: "linkedin.com/in/sarahchen"
    },
    notes: "Completed technical phone screen. Waiting for onsite scheduling."
  },
  {
    id: 2,
    company: "Meta",
    role: "Production Engineering Intern",
    location: "Menlo Park, CA",
    salary: "$9,200/mo",
    deadline: "Dec 20, 2024",
    status: "applied" as const,
    stage: 1,
    totalStages: 4,
    stages: ["Applied", "OA", "Interview", "Offer"],
    logo: "https://logo.clearbit.com/meta.com",
    recruiter: null,
    notes: "Application submitted. Awaiting response."
  },
  {
    id: 3,
    company: "Stripe",
    role: "Backend Engineering Intern",
    location: "San Francisco, CA",
    salary: "$8,500/mo",
    deadline: "Jan 5, 2025",
    status: "offer" as const,
    stage: 4,
    totalStages: 4,
    stages: ["Applied", "Technical", "Team Fit", "Offer"],
    logo: "https://logo.clearbit.com/stripe.com",
    recruiter: {
      name: "Mike Johnson",
      email: "mike.j@stripe.com",
      linkedin: "linkedin.com/in/mikejohnson"
    },
    notes: "Offer received! Deadline to respond: Jan 10"
  },
  {
    id: 4,
    company: "Amazon",
    role: "SDE Intern",
    location: "Seattle, WA",
    salary: "$8,800/mo",
    deadline: "Nov 30, 2024",
    status: "rejected" as const,
    stage: 2,
    totalStages: 4,
    stages: ["Applied", "OA", "Interview", "Offer"],
    logo: "https://logo.clearbit.com/amazon.com",
    recruiter: null,
    notes: "Rejected after OA."
  },
  {
    id: 5,
    company: "Microsoft",
    role: "Software Engineering Intern",
    location: "Redmond, WA",
    salary: "$8,300/mo",
    deadline: "Jan 15, 2025",
    status: "applied" as const,
    stage: 0,
    totalStages: 4,
    stages: ["Applied", "Assessment", "Interview", "Offer"],
    logo: "https://logo.clearbit.com/microsoft.com",
    recruiter: null,
    notes: "Application pending review."
  },
]

const statusColors = {
  applied: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  interview: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  offer: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
}

const applicationStats = [
  { name: "Applied", value: 12, color: "oklch(0.6 0.2 250)" },
  { name: "Interview", value: 4, color: "oklch(0.7 0.2 80)" },
  { name: "Offer", value: 2, color: "oklch(0.6 0.25 170)" },
  { name: "Rejected", value: 6, color: "oklch(0.55 0.22 25)" },
]

const monthlyApplications = [
  { month: "Sep", applications: 4 },
  { month: "Oct", applications: 8 },
  { month: "Nov", applications: 6 },
  { month: "Dec", applications: 5 },
  { month: "Jan", applications: 1 },
]

export function InternshipTracker() {
  const [selectedInternship, setSelectedInternship] = useState(internships[0])
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInternships = statusFilter === "all" 
    ? internships 
    : internships.filter(i => i.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Internship Tracker</h1>
          <p className="text-muted-foreground mt-1">
            Track your applications and manage your internship hunt
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-secondary/50 border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 glow-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {applicationStats.map((stat) => (
          <Card key={stat.name} className="glass-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.name}</span>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: stat.color }}
                />
              </div>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredInternships.map((internship) => (
            <Card 
              key={internship.id}
              className={cn(
                "glass-card border-border/50 cursor-pointer transition-all duration-200",
                selectedInternship.id === internship.id && "border-primary/50 glow-primary"
              )}
              onClick={() => setSelectedInternship(internship)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 rounded-lg">
                    <AvatarImage src={internship.logo} alt={internship.company} />
                    <AvatarFallback className="rounded-lg bg-secondary">
                      {internship.company[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{internship.role}</h3>
                        <p className="text-sm text-muted-foreground">{internship.company}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn("capitalize text-xs", statusColors[internship.status])}
                      >
                        {internship.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {internship.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {internship.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {internship.deadline}
                      </span>
                    </div>

                    {/* Interview Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Stage {internship.stage + 1} of {internship.totalStages}</span>
                        <span>{internship.stages[internship.stage]}</span>
                      </div>
                      <div className="flex gap-1">
                        {internship.stages.map((stage, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "flex-1 h-1.5 rounded-full transition-colors",
                              idx <= internship.stage 
                                ? internship.status === "rejected" 
                                  ? "bg-red-500" 
                                  : internship.status === "offer"
                                    ? "bg-green-500"
                                    : "bg-primary"
                                : "bg-secondary"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {/* Application Details */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 rounded-lg">
                  <AvatarImage src={selectedInternship.logo} alt={selectedInternship.company} />
                  <AvatarFallback className="rounded-lg bg-secondary">
                    {selectedInternship.company[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground">{selectedInternship.company}</h4>
                  <p className="text-sm text-muted-foreground">{selectedInternship.role}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">{selectedInternship.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Compensation</span>
                  <span className="text-foreground">{selectedInternship.salary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="text-foreground">{selectedInternship.deadline}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge 
                    variant="outline" 
                    className={cn("capitalize text-xs", statusColors[selectedInternship.status])}
                  >
                    {selectedInternship.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-2">
                <h5 className="text-sm font-medium text-foreground mb-2">Notes</h5>
                <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                  {selectedInternship.notes}
                </p>
              </div>

              <Button className="w-full" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Job Posting
              </Button>
            </CardContent>
          </Card>

          {/* Recruiter Contact */}
          {selectedInternship.recruiter && (
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Recruiter Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedInternship.recruiter.name}`} />
                    <AvatarFallback>{selectedInternship.recruiter.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-foreground">{selectedInternship.recruiter.name}</h4>
                    <p className="text-sm text-muted-foreground">Technical Recruiter</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a 
                    href={`mailto:${selectedInternship.recruiter.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedInternship.recruiter.email}
                  </a>
                  <a 
                    href={`https://${selectedInternship.recruiter.linkedin}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Chart */}
          <Card className="glass-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Application Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={monthlyApplications}>
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
                  <Bar dataKey="applications" fill="oklch(0.7 0.2 280)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
