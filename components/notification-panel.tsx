"use client"

import { useEffect } from "react"
import { X, Bell, CheckCircle2, AlertCircle, Info, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

const notifications = [
  {
    id: 1,
    type: "success" as const,
    title: "Resume Score Improved!",
    message: "Your ATS score increased from 72 to 78 after the latest updates.",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    type: "alert" as const,
    title: "Deadline Approaching",
    message: "Google SWE Intern application deadline is in 3 days.",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "info" as const,
    title: "New Roadmap Available",
    message: "Check out our new Full Stack Developer roadmap with updated 2024 technologies.",
    time: "3 hours ago",
    read: false
  },
  {
    id: 4,
    type: "achievement" as const,
    title: "Achievement Unlocked!",
    message: "You earned the 'Consistent Coder' badge for a 10-day streak.",
    time: "Yesterday",
    read: true
  },
  {
    id: 5,
    type: "info" as const,
    title: "Weekly Summary Ready",
    message: "Your weekly progress report is now available. You solved 35 problems!",
    time: "2 days ago",
    read: true
  },
]

const typeConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10"
  },
  alert: {
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10"
  },
  info: {
    icon: Info,
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  achievement: {
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10"
  }
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={cn(
        "fixed top-0 right-0 z-50 h-full w-full max-w-sm glass-card border-l border-border/50 shadow-2xl transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Notifications</h2>
            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
              {notifications.filter(n => !n.read).length} new
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Mark all as read
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Clear all
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type]
              const Icon = config.icon

              return (
                <div 
                  key={notification.id}
                  className={cn(
                    "relative p-4 rounded-lg mb-2 transition-colors cursor-pointer",
                    notification.read 
                      ? "hover:bg-secondary/30" 
                      : "bg-secondary/50 hover:bg-secondary/70"
                  )}
                >
                  {!notification.read && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                      <Icon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-medium text-sm",
                        notification.read ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {notification.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
