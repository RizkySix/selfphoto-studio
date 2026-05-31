'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  DEFAULT_DURATION,
  MIN_PEOPLE,
  calculatePriceBreakdown,
} from '@/lib/pricing'
import {
  AvailableStartTime,
  BackgroundType,
  BookingState,
  BookingStep,
  DurationMinutes,
  PriceBreakdown,
  SoftcopyOption,
} from '@/lib/types'

const INITIAL_STATE: BookingState = {
  step: 1,
  numberOfPeople: MIN_PEOPLE,
  durationMinutes: DEFAULT_DURATION as DurationMinutes,
  backgroundTypes: [],
  softcopyOption: null,
  customerName: '',
  customerPhone: '',
  bookingDate: null,
  startSlotId: null,
  selectedTimeStart: null,
  selectedTimeEnd: null,
  totalPrice: 0,
}

export interface UseBookingReturn {
  state: BookingState
  priceBreakdown: PriceBreakdown
  canProceedToNextStep: boolean
  isSubmitting: boolean
  updateBooking: (partial: Partial<BookingState>) => void
  toggleBackground: (type: BackgroundType) => void
  updateDuration: (duration: DurationMinutes) => void
  updateBookingDate: (date: string | null) => void
  selectTimeSlot: (slot: AvailableStartTime) => void
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
      state.numberOfPeople,
      state.durationMinutes,
      state.backgroundTypes,
      state.softcopyOption
    )
  }, [
    state.numberOfPeople,
    state.durationMinutes,
    state.backgroundTypes,
    state.softcopyOption,
  ])

  const canProceedToNextStep = useMemo<boolean>(() => {
    switch (state.step) {
      case 1:
        return state.numberOfPeople >= MIN_PEOPLE
      case 2:
        return state.durationMinutes >= DEFAULT_DURATION
      case 3:
        return state.backgroundTypes.length >= 1
      case 4:
        return (
          state.customerName.trim().length > 0 &&
          state.customerPhone.trim().length >= 8 &&
          state.bookingDate !== null &&
          state.startSlotId !== null &&
          state.softcopyOption !== null
        )
      default:
        return false
    }
  }, [state])

  const updateBooking = useCallback((partial: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...partial }))
  }, [])

  const toggleBackground = useCallback((type: BackgroundType) => {
    setState((prev) => {
      const exists = prev.backgroundTypes.includes(type)
      if (exists) {
        return {
          ...prev,
          backgroundTypes: prev.backgroundTypes.filter((b) => b !== type),
        }
      }
      if (prev.backgroundTypes.length >= 3) return prev
      return {
        ...prev,
        backgroundTypes: [...prev.backgroundTypes, type],
      }
    })
  }, [])

  const updateDuration = useCallback((duration: DurationMinutes) => {
    setState((prev) => ({
      ...prev,
      durationMinutes: duration,
      startSlotId: null,
      selectedTimeStart: null,
      selectedTimeEnd: null,
    }))
  }, [])

  const updateBookingDate = useCallback((date: string | null) => {
    setState((prev) => ({
      ...prev,
      bookingDate: date,
      startSlotId: null,
      selectedTimeStart: null,
      selectedTimeEnd: null,
    }))
  }, [])

  const selectTimeSlot = useCallback((slot: AvailableStartTime) => {
    setState((prev) => ({
      ...prev,
      startSlotId: slot.startSlotId,
      selectedTimeStart: slot.timeStart,
      selectedTimeEnd: slot.timeEnd,
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
    router.push('/booking-confirmation/BST-2025-001')
  }, [router])

  return {
    state: { ...state, totalPrice: priceBreakdown.total },
    priceBreakdown,
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
  }
}
