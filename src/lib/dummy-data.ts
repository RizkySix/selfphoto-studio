import { addMinutes, format, parse } from 'date-fns'

import {
  AvailableStartTime,
  BackgroundOption,
  BackgroundType,
  DurationMinutes,
  SoftcopyOption,
  TimeSlot,
  getRequiredSlotCount,
  getTotalBlockedMinutes,
} from './types'

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  {
    type: BackgroundType.WALL_BOOK,
    label: 'Wall Book',
    description: 'Classic bookshelf backdrop',
    colorPreview: '#8B7355',
  },
  {
    type: BackgroundType.BACKDROP_WHITE,
    label: 'Backdrop White',
    description: 'Clean white studio look',
    colorPreview: '#F5F5F5',
  },
  {
    type: BackgroundType.BACKDROP_GREY,
    label: 'Backdrop Grey',
    description: 'Professional neutral grey',
    colorPreview: '#9E9E9E',
  },
  {
    type: BackgroundType.BACKDROP_PINK,
    label: 'Backdrop Pink',
    description: 'Soft feminine pink',
    colorPreview: '#F8BBD9',
  },
  {
    type: BackgroundType.BACKDROP_BROWN,
    label: 'Backdrop Brown',
    description: 'Warm earthy tone',
    colorPreview: '#A0522D',
  },
  {
    type: BackgroundType.TAMAN_GARDEN,
    label: 'Taman Garden',
    description: 'Natural garden setting',
    colorPreview: '#4CAF50',
  },
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

export const STUDIO_OPEN_TIME = '09:00'
export const STUDIO_CLOSE_TIME = '21:00'

function generateDummySlots(): TimeSlot[] {
  const slots: TimeSlot[] = []
  const reference = new Date()
  const open = parse(STUDIO_OPEN_TIME, 'HH:mm', reference)
  const close = parse(STUDIO_CLOSE_TIME, 'HH:mm', reference)
  let current = open
  let index = 1

  while (current < close) {
    const next = addMinutes(current, 10)
    slots.push({
      id: `slot-${String(index).padStart(3, '0')}`,
      timeStart: format(current, 'HH:mm'),
      timeEnd: format(next, 'HH:mm'),
      status: 'AVAILABLE',
    })
    current = next
    index++
  }
  return slots
}

interface BookedRange {
  start: string
  end: string
}

const DEMO_BOOKED_RANGES: BookedRange[] = [
  { start: '10:00', end: '10:40' },
  { start: '12:30', end: '13:30' },
  { start: '14:00', end: '14:20' },
  { start: '16:00', end: '16:50' },
]

export function getDummySlotsForDate(date: string): TimeSlot[] {
  // Stable pseudo-random per date so different dates have slightly
  // different booked patterns but the same date is deterministic.
  const seed = date
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)

  const slots = generateDummySlots()

  const bookedRanges = DEMO_BOOKED_RANGES.map((range, i) => {
    if ((seed + i) % 3 === 0) {
      // shift booked range by 30 minutes for variety
      return shiftRange(range, 30)
    }
    return range
  })

  return slots.map((slot) => {
    const isBooked = bookedRanges.some(
      (range) =>
        slot.timeStart >= range.start && slot.timeStart < range.end
    )
    const isBlocked = slot.timeStart >= '20:30'

    return {
      ...slot,
      status: isBlocked
        ? ('BLOCKED' as const)
        : isBooked
          ? ('BOOKED' as const)
          : ('AVAILABLE' as const),
    }
  })
}

function shiftRange(range: BookedRange, minutes: number): BookedRange {
  const ref = new Date()
  return {
    start: format(
      addMinutes(parse(range.start, 'HH:mm', ref), minutes),
      'HH:mm'
    ),
    end: format(
      addMinutes(parse(range.end, 'HH:mm', ref), minutes),
      'HH:mm'
    ),
  }
}

export function getAvailableStartTimes(
  slots: TimeSlot[],
  duration: DurationMinutes
): AvailableStartTime[] {
  const required = getRequiredSlotCount(duration)
  const result: AvailableStartTime[] = []

  for (let i = 0; i <= slots.length - required; i++) {
    const chain = slots.slice(i, i + required)

    const allConsecutive = chain.every((s, idx) =>
      idx === 0 ? true : s.timeStart === chain[idx - 1].timeEnd
    )
    if (!allConsecutive) continue

    const allAvailable = chain.every((s) => s.status === 'AVAILABLE')

    result.push({
      startSlotId: chain[0].id,
      timeStart: chain[0].timeStart,
      timeEnd: chain[chain.length - 1].timeEnd,
      isAvailable: allAvailable,
    })
  }

  // Show every 30-minute interval to avoid overwhelming customer,
  // but keep unavailable entries visible so the pattern is legible.
  return result.filter((item, idx) => idx % 3 === 0 || !item.isAvailable)
}

export function getTotalStudioMinutes(duration: DurationMinutes): number {
  return getTotalBlockedMinutes(duration)
}

export const DUMMY_BOOKING_RESULT = {
  id: 'BST-2025-001',
  customerName: 'Sari Dewi',
  customerPhone: '081234567890',
  numberOfPeople: 3,
  durationMinutes: 20 as DurationMinutes,
  totalBlockedMinutes: 40,
  backgroundTypes: [BackgroundType.WALL_BOOK, BackgroundType.BACKDROP_PINK],
  softcopyOption: SoftcopyOption.FREE_FOLLOW_IG,
  bookingDate: '2025-01-25',
  selectedTimeStart: '09:00',
  selectedTimeEnd: '09:40',
  totalPrice: 180_000,
  status: 'PENDING',
}
