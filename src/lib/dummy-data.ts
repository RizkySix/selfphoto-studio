import {
  AvailableSlot,
  BackgroundOption,
  BackgroundType,
  SoftcopyOption,
} from './types'

export const DUMMY_SLOTS: AvailableSlot[] = [
  { id: '1', timeStart: '09:00', timeEnd: '09:30', isBooked: false },
  { id: '2', timeStart: '09:30', timeEnd: '10:00', isBooked: true },
  { id: '3', timeStart: '10:00', timeEnd: '10:30', isBooked: false },
  { id: '4', timeStart: '10:30', timeEnd: '11:00', isBooked: false },
  { id: '5', timeStart: '11:00', timeEnd: '11:30', isBooked: true },
  { id: '6', timeStart: '13:00', timeEnd: '13:30', isBooked: false },
  { id: '7', timeStart: '13:30', timeEnd: '14:00', isBooked: false },
  { id: '8', timeStart: '14:00', timeEnd: '14:30', isBooked: false },
  { id: '9', timeStart: '15:00', timeEnd: '15:30', isBooked: true },
  { id: '10', timeStart: '15:30', timeEnd: '16:00', isBooked: false },
]

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    type: BackgroundType.WALL_BOOK,
    label: 'Wall Book',
    description: 'Classic bookshelf backdrop',
    colorPreview: '#8B7355',
    surcharge: 0,
  },
  {
    type: BackgroundType.BACKDROP_WHITE,
    label: 'Backdrop White',
    description: 'Clean white studio look',
    colorPreview: '#F5F5F5',
    surcharge: 50000,
  },
  {
    type: BackgroundType.BACKDROP_GREY,
    label: 'Backdrop Grey',
    description: 'Professional neutral grey',
    colorPreview: '#9E9E9E',
    surcharge: 50000,
  },
  {
    type: BackgroundType.BACKDROP_PINK,
    label: 'Backdrop Pink',
    description: 'Soft feminine pink',
    colorPreview: '#F8BBD9',
    surcharge: 50000,
  },
  {
    type: BackgroundType.BACKDROP_BROWN,
    label: 'Backdrop Brown',
    description: 'Warm earthy tone',
    colorPreview: '#A0522D',
    surcharge: 50000,
  },
  {
    type: BackgroundType.TAMAN_GARDEN,
    label: 'Taman Garden',
    description: 'Natural garden setting',
    colorPreview: '#4CAF50',
    surcharge: 50000,
  },
]

export const DURATION_OPTIONS: number[] = [
  10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
]

export const BACKGROUND_LABEL: Record<BackgroundType, string> =
  BACKGROUND_OPTIONS.reduce(
    (acc, option) => {
      acc[option.type] = option.label
      return acc
    },
    {} as Record<BackgroundType, string>
  )

export const SOFTCOPY_LABEL: Record<SoftcopyOption, string> = {
  [SoftcopyOption.FREE_FOLLOW_IG]: 'Follow & Mention Instagram',
  [SoftcopyOption.FREE_GOOGLE_REVIEW]: 'Google Review',
  [SoftcopyOption.PAID]: 'Beli Softcopy',
}

export const DUMMY_BOOKING_RESULT = {
  id: 'BST-2024-001',
  customerName: 'Sari Dewi',
  customerPhone: '081234567890',
  numberOfPeople: 3,
  durationMinutes: 20,
  backgroundType: BackgroundType.BACKDROP_PINK,
  softcopyOption: SoftcopyOption.FREE_FOLLOW_IG,
  bookingDate: new Date().toISOString(),
  bookingTime: '10:00',
  totalPrice: 195000,
  status: 'PENDING',
}
