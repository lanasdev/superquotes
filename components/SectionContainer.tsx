import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export default function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 sm:px-8", className)}>
      {children}
    </div>
  )
}



