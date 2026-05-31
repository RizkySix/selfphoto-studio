'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { StepIndicator } from './StepIndicator'
import { StepPeople } from './steps/StepPeople'
import { StepDuration } from './steps/StepDuration'
import { StepBackground } from './steps/StepBackground'
import { StepCheckout } from './steps/StepCheckout'
import type { UseBookingReturn } from '@/hooks/useBooking'

interface BookingWizardProps {
  booking: UseBookingReturn
}

export function BookingWizard({ booking }: BookingWizardProps) {
  const {
    state,
    canProceedToNextStep,
    isSubmitting,
    updateBooking,
    toggleBackground,
    updateDuration,
    updateBookingDate,
    selectTimeSlot,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitBooking,
  } = booking

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={state.step} onStepClick={goToStep} />

      <div className="min-h-[420px]">
        {state.step === 1 && (
          <StepPeople
            numberOfPeople={state.numberOfPeople}
            onChange={(v) => updateBooking({ numberOfPeople: v })}
          />
        )}
        {state.step === 2 && (
          <StepDuration
            durationMinutes={state.durationMinutes}
            onChange={updateDuration}
          />
        )}
        {state.step === 3 && (
          <StepBackground
            backgroundTypes={state.backgroundTypes}
            onToggle={toggleBackground}
          />
        )}
        {state.step === 4 && (
          <StepCheckout
            customerName={state.customerName}
            customerPhone={state.customerPhone}
            bookingDate={state.bookingDate}
            startSlotId={state.startSlotId}
            selectedTimeStart={state.selectedTimeStart}
            durationMinutes={state.durationMinutes}
            softcopyOption={state.softcopyOption}
            isSubmitting={isSubmitting}
            canSubmit={canProceedToNextStep}
            onCustomerName={(v) => updateBooking({ customerName: v })}
            onCustomerPhone={(v) => updateBooking({ customerPhone: v })}
            onBookingDate={updateBookingDate}
            onSelectSlot={selectTimeSlot}
            onSoftcopyOption={(o) => updateBooking({ softcopyOption: o })}
            onSubmit={submitBooking}
          />
        )}
      </div>

      {state.step < 4 && (
        <div className="flex items-center justify-between gap-3 border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={goToPreviousStep}
            disabled={state.step === 1}
            className="text-studio-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <Button
            type="button"
            variant="solid"
            size="lg"
            onClick={goToNextStep}
            disabled={!canProceedToNextStep}
          >
            Lanjutkan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {state.step === 4 && (
        <div className="flex items-center justify-start border-t pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={goToPreviousStep}
            className="text-studio-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      )}
    </div>
  )
}
