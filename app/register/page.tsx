"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthDivider } from "@/components/auth/auth-divider"
import { SocialButton } from "@/components/auth/social-button"
import { cn } from "@/lib/utils"

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", check: (p: string) => p.length >= 8 },
  { id: "uppercase", label: "One uppercase letter", check: (p: string) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "One lowercase letter", check: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", check: (p: string) => /[0-9]/.test(p) },
]

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSocialLogin = (provider: "google" | "facebook") => {
    setIsLoading(true)
    // Simulate social login - replace with actual OAuth
    setTimeout(() => {
      router.push("/")
      setIsLoading(false)
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Check password requirements
    const failedRequirements = passwordRequirements.filter((req) => !req.check(formData.password))
    if (failedRequirements.length > 0 && formData.password) {
      newErrors.password = "Password does not meet requirements"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    // Simulate registration - replace with actual auth
    setTimeout(() => {
      router.push("/")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Start your learning journey with Nexera"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      {/* Social Login */}
      <div className="space-y-3">
        <SocialButton provider="google" onClick={() => handleSocialLogin("google")} />
        <SocialButton provider="facebook" onClick={() => handleSocialLogin("facebook")} />
      </div>

      <AuthDivider />

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          disabled={isLoading}
        />
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          disabled={isLoading}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          disabled={isLoading}
        />

        {/* Password Requirements */}
        {formData.password && (
          <div className="space-y-2 rounded-lg bg-secondary/50 p-3">
            {passwordRequirements.map((req) => {
              const isMet = req.check(formData.password)
              return (
                <div key={req.id} className="flex items-center gap-2 text-xs">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                      isMet ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {isMet && <Check className="h-3 w-3" />}
                  </div>
                  <span className={cn(isMet ? "text-green-500" : "text-muted-foreground")}>{req.label}</span>
                </div>
              )
            })}
          </div>
        )}

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </AuthCard>
  )
}
