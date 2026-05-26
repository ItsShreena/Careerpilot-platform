"use client"

import { useEffect, useState } from "react"
import { X, Sparkles, ChevronRight, Rocket, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  {
    id: 1,
    title: "Welcome to CareerPilot!",
    description: "Your AI-powered companion for navigating your tech career journey. Let's get you set up for success.",
    icon: Rocket,
    color: "primary"
  },
  {
    id: 2,
    title: "Track Your Progress",
    description: "Follow structured roadmaps, track your DSA progress, and visualize your growth with detailed analytics.",
    icon: Target,
    color: "accent"
  },
  {
    id: 3,
    title: "Land Your Dream Internship",
    description: "Manage applications, optimize your resume with AI, and stay on top of deadlines all in one place.",
    icon: BookOpen,
    color: "chart-3"
  }
]

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 200)
    } else {
      onClose()
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 glass-card border border-border/50 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">CareerPilot</span>
          </div>

          {/* Step Content */}
          <div className={cn(
            "transition-all duration-200",
            isAnimating && "opacity-0 translate-x-4"
          )}>
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
              `bg-${step.color}/20`
            )} style={{ backgroundColor: `var(--${step.color})20` }}>
              <Icon className="w-8 h-8" style={{ color: `var(--${step.color})` }} />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              {step.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "w-8 bg-primary" 
                    : index < currentStep 
                      ? "bg-primary/50"
                      : "bg-secondary"
                )}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip tour
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 glow-primary"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
