export enum BackgroundType {
  WALL_BOOK = 'WALL_BOOK',
  BACKDROP_WHITE = 'BACKDROP_WHITE',
  BACKDROP_GREY = 'BACKDROP_GREY',
  BACKDROP_PINK = 'BACKDROP_PINK',
  BACKDROP_BROWN = 'BACKDROP_BROWN',
  TAMAN_GARDEN = 'TAMAN_GARDEN',
}

export enum SoftcopyOption {
  FREE_FOLLOW_IG = 'FREE_FOLLOW_IG',
  FREE_GOOGLE_REVIEW = 'FREE_GOOGLE_REVIEW',
  PAID = 'PAID',
}

export type BookingStep = 1 | 2 | 3 | 4

export const DURATION_OPTIONS = [10, 15, 20, 25, 30] as const
export type DurationMinutes = (typeof DURATION_OPTIONS)[number]

export function getTotalBlockedMinutes(duration: DurationMinutes): number {
  return duration * 2
}

export function getRequiredSlotCount(duration: DurationMinutes): number {
  return (duration * 2) / 10
}

export type SlotStatus = 'AVAILABLE' | 'RESERVED' | 'BOOKED' | 'BLOCKED'

export interface TimeSlot {
  id: string
  timeStart: string
  timeEnd: string
  status: SlotStatus
}

export interface AvailableStartTime {
  startSlotId: string
  timeStart: string
  timeEnd: string
  isAvailable: boolean
}

export interface BookingState {
  step: BookingStep
  numberOfPeople: number
  durationMinutes: DurationMinutes
  backgroundTypes: BackgroundType[]
  softcopyOption: SoftcopyOption | null
  customerName: string
  customerPhone: string
  bookingDate: string | null
  startSlotId: string | null
  selectedTimeStart: string | null
  selectedTimeEnd: string | null
  totalPrice: number
}

export interface PriceBreakdown {
  basePackage: number
  peopleSurcharge: number
  durationSurcharge: number
  backgroundSurcharge: number
  softcopySurcharge: number
  total: number
}

export interface BackgroundOption {
  type: BackgroundType
  label: string
  description: string
  colorPreview: string
}
