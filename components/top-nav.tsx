"use client"

import { useState } from "react"
import { 
  Search, 
  Bell, 
  Command,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TopNavProps {
  onNotificationClick: () => void
  showNotifications: boolean
}

export function TopNav({ onNotificationClick, showNotifications }: TopNavProps) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-border/50 glass">
      {/* Search */}
      <div className={cn(
        "relative flex-1 max-w-md transition-all duration-300",
        searchFocused && "max-w-lg"
      )}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search roadmaps, skills, companies..."
          className="pl-10 pr-20 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
          <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-border/50 bg-muted/50 px-1.5 text-[10px] font-medium">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Moon className="w-4 h-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative text-muted-foreground hover:text-foreground",
            showNotifications && "text-primary bg-primary/10"
          )}
          onClick={onNotificationClick}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hover:bg-secondary/50">
              <Avatar className="w-8 h-8 ring-2 ring-primary/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shreena" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">Shreena Mani</span>
                <span className="text-xs text-muted-foreground">Pro Plan</span>
              </div>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Shreena Mani</p>
                <p className="text-xs text-muted-foreground">shreena.mani@university.edu</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Profile Settings</span>
              <Badge variant="secondary" className="ml-auto text-[10px]">New</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>Career Goals</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
