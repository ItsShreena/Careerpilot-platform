"use client"

import { 
  Home, 
  Map, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Flame
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { ActiveView } from "@/app/page"

interface AppSidebarProps {
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const navItems = [
  { id: "dashboard" as const, label: "Dashboard", icon: Home },
  { id: "roadmaps" as const, label: "Roadmaps", icon: Map },
  { id: "internships" as const, label: "Internships", icon: Briefcase },
  { id: "resume" as const, label: "Resume AI", icon: FileText },
  { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
]

export function AppSidebar({ activeView, setActiveView, collapsed, setCollapsed }: AppSidebarProps) {
  return (
    <aside 
      className={cn(
        "relative flex flex-col h-full glass-card border-r border-border/50 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 p-4 border-b border-border/50",
        collapsed && "justify-center"
      )}>
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-bold text-lg text-foreground">CareerPilot</span>
            <span className="text-xs text-muted-foreground">AI Career Navigator</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id
          const Icon = item.icon
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary/20 text-primary glow-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                collapsed && "justify-center px-2"
              )}
            >
              <div className={cn(
                "relative",
                isActive && "animate-pulse-glow rounded-lg"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )} />
                {isActive && (
                  <div className="absolute inset-0 bg-primary/30 blur-md rounded-full" />
                )}
              </div>
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Stats Card */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-4 rounded-xl glass border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-foreground">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">12</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <div className="mt-3 flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "flex-1 h-1.5 rounded-full",
                  i < 5 ? "bg-accent" : "bg-secondary"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-4 rounded-xl glass border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">Achievements</span>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
              DSA Pro
            </Badge>
            <Badge variant="secondary" className="text-xs bg-accent/20 text-accent border-accent/30">
              Fast Learner
            </Badge>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={cn(
        "p-3 border-t border-border/50",
        collapsed && "flex justify-center"
      )}>
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors",
          collapsed && "p-2"
        )}>
          <Avatar className="w-9 h-9 ring-2 ring-primary/50">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shreena" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Shreena Mani</p>
              <p className="text-xs text-muted-foreground truncate">CSE - Cloud & Automation</p>
            </div>
          )}
          {!collapsed && (
            <Settings className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-secondary border border-border hover:bg-primary/20 hover:border-primary/50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>
    </aside>
  )
}
