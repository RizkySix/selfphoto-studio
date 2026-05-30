'use client'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { BookingStep } from '@/lib/types'

interface StepIndicatorProps {
  currentStep: BookingStep
  onStepClick?: (step: BookingStep) => void
}

const STEPS: { id: BookingStep; label: string }[] = [
  { id: 1, label: 'Jumlah Orang' },
  { id: 2, label: 'Durasi' },
  { id: 3, label: 'Background' },
  { id: 4, label: 'Checkout' },
]

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <ol className="flex w-full items-center">
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isActive = step.id === currentStep
          const isLast = index === STEPS.length - 1
          const clickable = isCompleted && Boolean(onStepClick)

          return (
            <li
              key={step.id}
              className={cn(
                'flex items-center',
                isLast ? 'flex-initial' : 'flex-1'
              )}
            >
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => clickable && onStepClick?.(step.id)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300',
                    isCompleted &&
                      'border-gold bg-gold text-studio-dark hover:scale-105',
                    isActive &&
                      'border-gold bg-cream text-gold ring-4 ring-gold/20',
                    !isCompleted &&
                      !isActive &&
                      'border-studio-muted/30 bg-white text-studio-muted'
                  )}
                  aria-label={`Langkah ${step.id}: ${step.label}`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    step.id
                  )}
                </button>
                <span
                  className={cn(
                    'mt-2 hidden text-xs font-medium md:block',
                    (isActive || isCompleted)
                      ? 'text-studio-dark'
                      : 'text-studio-muted'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors duration-300 md:mx-4',
                    step.id < currentStep ? 'bg-gold' : 'bg-studio-muted/20'
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
