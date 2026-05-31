'use client'

import { MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface WhatsAppShareButtonProps {
  text: string
}

export function WhatsAppShareButton({ text }: WhatsAppShareButtonProps) {
  const handleClick = () => {
    const encoded = encodeURIComponent(text)
    const url = `https://wa.me/?text=${encoded}`
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Button
      type="button"
      variant="solid"
      size="lg"
      className="w-full sm:flex-1"
      onClick={handleClick}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Simpan ke WhatsApp
    </Button>
  )
}
