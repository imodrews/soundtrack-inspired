import { useState, useRef, useEffect } from 'react'
import { PresetCard } from '@/components/PresetCard'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, ArrowsClockwise, SpeakerHigh, Sparkle } from '@phosphor-icons/react'
import { PRESETS } from '@/lib/presets'
import { MusicPreset } from '@/lib/types'
import { MusicGenerator } from '@/lib/musicGenerator'
import { toast, Toaster } from 'sonner'
import { motion } from 'framer-motion'

function App() {
  const [selectedPreset, setSelectedPreset] = useState<MusicPreset | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const musicGeneratorRef = useRef<MusicGenerator | null>(null)

  useEffect(() => {
    musicGeneratorRef.current = new MusicGenerator()
    return () => {
      if (musicGeneratorRef.current) {
        musicGeneratorRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (musicGeneratorRef.current) {
      musicGeneratorRef.current.setVolume(volume[0] / 100)
    }
  }, [volume])

  const handleGenerate = async () => {
    if (!selectedPreset || !musicGeneratorRef.current) return

    setIsGenerating(true)
    setIsPlaying(false)

    try {
      await musicGeneratorRef.current.generate(selectedPreset)
      setIsPlaying(true)
      toast.success(`Generated music for ${selectedPreset.title}`)
    } catch (error) {
      console.error('Generation failed:', error)
      toast.error('Failed to generate music. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePlayPause = () => {
    if (!musicGeneratorRef.current) return

    if (isPlaying) {
      musicGeneratorRef.current.pause()
      setIsPlaying(false)
    } else {
      musicGeneratorRef.current.resume()
      setIsPlaying(true)
    }
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  return (
    <>
      <Toaster position="top-center" theme="dark" />
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                oklch(0.75 0.15 200 / 0.03) 2px,
                oklch(0.75 0.15 200 / 0.03) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                oklch(0.75 0.15 200 / 0.03) 2px,
                oklch(0.75 0.15 200 / 0.03) 4px
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Cinematic Music Generator
          </h1>
          <p className="text-muted-foreground text-lg font-mono tracking-wide">
            AI-POWERED SOUNDSCAPES INSPIRED BY FILM & TELEVISION
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-6 font-mono tracking-wide">
              SELECT PRESET
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {PRESETS.map((preset) => (
                <PresetCard
                  key={preset.id}
                  preset={preset}
                  isSelected={selectedPreset?.id === preset.id}
                  onSelect={setSelectedPreset}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold mb-6 font-mono tracking-wide">
                CONTROLS
              </h2>

              <div className="bg-card/60 backdrop-blur-sm border-2 border-border rounded-lg p-6 space-y-6">
                <div>
                  <Button
                    onClick={handleGenerate}
                    disabled={!selectedPreset || isGenerating}
                    size="lg"
                    className={`w-full text-lg font-semibold ${
                      !selectedPreset || isGenerating ? '' : 'animate-pulse-glow'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkle className="mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkle className="mr-2" />
                        Generate Music
                      </>
                    )}
                  </Button>
                  {isGenerating && (
                    <Progress value={undefined} className="mt-3" />
                  )}
                </div>

                {selectedPreset && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground font-mono mb-3">
                      CURRENT: {selectedPreset.title.toUpperCase()}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={handlePlayPause}
                        disabled={isGenerating}
                        variant="secondary"
                        size="lg"
                        className="flex-1"
                      >
                        {isPlaying ? (
                          <>
                            <Pause weight="fill" className="mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play weight="fill" className="mr-2" />
                            Play
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                        variant="secondary"
                        size="lg"
                      >
                        <ArrowsClockwise />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-mono tracking-wide">VOLUME</label>
                    <span className="text-sm font-mono text-muted-foreground">
                      {volume[0]}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <SpeakerHigh className="text-muted-foreground" />
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App