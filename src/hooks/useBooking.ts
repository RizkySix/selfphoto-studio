'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { calculatePriceBreakdown } from '@/lib/pricing'
import {
  BackgroundType,
  BookingState,
  BookingStep,
  PriceBreakdown,
  SoftcopyOption,
} from '@/lib/types'

const INITIAL_STATE: BookingState = {
  step: 1,
  numberOfPeople: null,
  durationMinutes: null,
  backgroundType: null,
  softcopyOption: null,
  customerName: '',
  customerPhone: '',
  bookingDate: null,
  bookingTime: null,
  totalPrice: 0,
}

export interface UseBookingReturn {
  state: BookingState
  priceBreakdown: PriceBreakdown
  canProceedToNextStep: boolean
  isSubmitting: boolean
  updateBooking: (partial: Partial<BookingState>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: BookingStep) => void
  submitBooking: () => Promise<void>
}

export function useBooking(): UseBookingReturn {
  const router = useRouter()
  const [state, setState] = useState<BookingState>(INITIAL_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const priceBreakdown = useMemo<PriceBreakdown>(() => {
    return calculatePriceBreakdown(
      state.numberOfPeople ?? 0,
      state.durationMinutes ?? 10,
      state.backgroundType ?? BackgroundType.WALL_BOOK,
      state.softcopyOption ?? SoftcopyOption.FREE_FOLLOW_IG
    )
  }, [
    state.numberOfPeople,
    state.durationMinutes,
    state.backgroundType,
    state.softcopyOption,
  ])

  const canProceedToNextStep = useMemo<boolean>(() => {
    switch (state.step) {
      case 1:
        return state.numberOfPeople !== null
      case 2:
        return state.durationMinutes !== null
      case 3:
        return state.backgroundType !== null
      case 4:
        return (
          state.customerName.trim().length > 0 &&
          state.customerPhone.trim().length >= 8 &&
          state.bookingDate !== null &&
          state.bookingTime !== null &&
          state.softcopyOption !== null
        )
      default:
        return false
    }
  }, [state])

  const updateBooking = useCallback((partial: Partial<BookingState>) => {
    setState((prev) => ({
      ...prev,
      ...partial,
    }))
  }, [])

  const goToNextStep = useCallback(() => {
    setState((prev) => {
      if (prev.step >= 4) return prev
      return { ...prev, step: (prev.step + 1) as BookingStep }
    })
  }, [])

  const goToPreviousStep = useCallback(() => {
    setState((prev) => {
      if (prev.step <= 1) return prev
      return { ...prev, step: (prev.step - 1) as BookingStep }
    })
  }, [])

  const goToStep = useCallback((step: BookingStep) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const submitBooking = useCallback(async () => {
    setIsSubmitting(true)
    await new Promise<void>((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    router.push('/booking-confirmation/BST-2024-001')
  }, [router])

  return {
    state: { ...state, totalPrice: priceBreakdown.total },
    priceBreakdown,
    canProceedToNextStep,
    isSubmitting,
    updateBooking,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    submitBooking,
  }
}
