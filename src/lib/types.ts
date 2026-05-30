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

export interface BookingState {
  step: BookingStep
  numberOfPeople: number | null
  durationMinutes: number | null
  backgroundType: BackgroundType | null
  softcopyOption: SoftcopyOption | null
  customerName: string
  customerPhone: string
  bookingDate: Date | null
  bookingTime: string | null
  totalPrice: number
}

export interface PriceBreakdown {
  basePeople: number
  durationSurcharge: number
  backgroundSurcharge: number
  softcopySurcharge: number
  total: number
}

export interface AvailableSlot {
  id: string
  timeStart: string
  timeEnd: string
  isBooked: boolean
}

export interface BackgroundOption {
  type: BackgroundType
  label: string
  description: string
  colorPreview: string
  surcharge: number
}
