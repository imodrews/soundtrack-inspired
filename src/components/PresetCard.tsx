import { MusicPreset } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PresetCardProps {
  preset: MusicPreset
  isSelected: boolean
  onSelect: (preset: MusicPreset) => void
}

export function PresetCard({ preset, isSelected, onSelect }: PresetCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2',
        isSelected
          ? 'border-accent glow bg-card/80'
          : 'border-border hover:border-accent/50 bg-card/40'
      )}
      onClick={() => onSelect(preset)}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">{preset.title}</CardTitle>
        <CardDescription className="text-sm">{preset.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {preset.mood.map((mood) => (
            <Badge key={mood} variant="secondary" className="text-xs font-mono">
              {mood}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
