"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { DashboardHome } from "@/components/dashboard-home"
import { CareerRoadmaps } from "@/components/career-roadmaps"
import { InternshipTracker } from "@/components/internship-tracker"
import { ResumeAnalyzer } from "@/components/resume-analyzer"
import { SkillAnalytics } from "@/components/skill-analytics"
import { OnboardingModal } from "@/components/onboarding-modal"
import { NotificationPanel } from "@/components/notification-panel"

export type ActiveView = "dashboard" | "roadmaps" | "internships" | "resume" | "analytics"

export default function CareerPilotApp() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardHome />
      case "roadmaps":
        return <CareerRoadmaps />
      case "internships":
        return <InternshipTracker />
      case "resume":
        return <ResumeAnalyzer />
      case "analytics":
        return <SkillAnalytics />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav 
          onNotificationClick={() => setShowNotifications(!showNotifications)}
          showNotifications={showNotifications}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {renderContent()}
          </div>
        </main>
      </div>

      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  )
}
