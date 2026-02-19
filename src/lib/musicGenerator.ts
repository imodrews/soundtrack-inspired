import { MusicPreset } from './types'

interface MusicParameters {
  tempo: number
  baseFrequency: number
  harmonicRatios: number[]
  rhythmPattern: number[]
  atmosphereType: 'pad' | 'arpeggio' | 'drone' | 'pulse'
  filterFrequency: number
  reverbAmount: number
  delayTime: number
}

export async function generateMusicParameters(preset: MusicPreset): Promise<MusicParameters> {
  const promptText = `You are a music composition AI. Based on the following film/TV preset, generate specific musical parameters that capture its essence.

Preset: ${preset.title}
Description: ${preset.description}
Mood: ${preset.mood.join(', ')}
Tempo: ${preset.musicalCharacteristics.tempo}
Instruments: ${preset.musicalCharacteristics.instruments.join(', ')}
Atmosphere: ${preset.musicalCharacteristics.atmosphere}
Key Elements: ${preset.musicalCharacteristics.keyElements.join(', ')}

Generate musical parameters as a JSON object with these exact properties:
- tempo: number (BPM, between 40-180)
- baseFrequency: number (Hz, between 80-440, lower for darker moods)
- harmonicRatios: array of 4-6 numbers (frequency multipliers like 1.0, 1.5, 2.0, etc.)
- rhythmPattern: array of 8-16 numbers (0-1 values representing note velocities)
- atmosphereType: one of "pad", "arpeggio", "drone", or "pulse"
- filterFrequency: number (Hz, between 200-8000)
- reverbAmount: number (0-1, higher for more spacious sounds)
- delayTime: number (seconds, 0.1-1.0)

Make the parameters unique and fitting for this specific preset's cinematic character.`
  
  const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
  const params = JSON.parse(response)
  
  return params
}

export class MusicGenerator {
  private audioContext: AudioContext
  private nodes: AudioNode[] = []
  private isPlaying = false
  private masterGain: GainNode
  private oscillators: OscillatorNode[] = []
  private scheduledEvents: number[] = []

  constructor() {
    this.audioContext = new AudioContext()
    this.masterGain = this.audioContext.createGain()
    this.masterGain.connect(this.audioContext.destination)
    this.masterGain.gain.value = 0.3
  }

  async generate(preset: MusicPreset): Promise<void> {
    this.stop()
    
    const params = await generateMusicParameters(preset)
    
    this.createAmbientLayer(params)
    this.createMelodicLayer(params)
    this.createRhythmicLayer(params)
    
    this.isPlaying = true
  }

  private createAmbientLayer(params: MusicParameters): void {
    const oscillator1 = this.audioContext.createOscillator()
    const oscillator2 = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    oscillator1.type = 'sine'
    oscillator2.type = 'sine'
    oscillator1.frequency.value = params.baseFrequency * 0.5
    oscillator2.frequency.value = params.baseFrequency * 0.503

    filter.type = 'lowpass'
    filter.frequency.value = params.filterFrequency

    gainNode.gain.value = 0.15

    oscillator1.connect(filter)
    oscillator2.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.masterGain)

    oscillator1.start()
    oscillator2.start()

    this.oscillators.push(oscillator1, oscillator2)
    this.nodes.push(oscillator1, oscillator2, gainNode, filter)

    const lfo = this.audioContext.createOscillator()
    const lfoGain = this.audioContext.createGain()
    lfo.frequency.value = 0.1
    lfoGain.gain.value = params.filterFrequency * 0.3
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()
    this.oscillators.push(lfo)
    this.nodes.push(lfo, lfoGain)
  }

  private createMelodicLayer(params: MusicParameters): void {
    const now = this.audioContext.currentTime
    const noteDuration = 60 / params.tempo * 2

    const playNote = (time: number, freqMultiplier: number, duration: number) => {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()
      const filter = this.audioContext.createBiquadFilter()

      osc.type = params.atmosphereType === 'arpeggio' ? 'square' : 'triangle'
      osc.frequency.value = params.baseFrequency * freqMultiplier

      filter.type = 'bandpass'
      filter.frequency.value = params.filterFrequency * 0.8
      filter.Q.value = 5

      gain.gain.value = 0
      gain.gain.setTargetAtTime(0.08, time, 0.02)
      gain.gain.setTargetAtTime(0, time + duration, 0.1)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)

      osc.start(time)
      osc.stop(time + duration + 0.5)
    }

    for (let i = 0; i < 16; i++) {
      const noteTime = now + i * noteDuration
      const ratioIndex = i % params.harmonicRatios.length
      const freqMultiplier = params.harmonicRatios[ratioIndex]
      playNote(noteTime, freqMultiplier, noteDuration * 0.8)
      this.scheduledEvents.push(noteTime)
    }
  }

  private createRhythmicLayer(params: MusicParameters): void {
    if (params.atmosphereType === 'drone' || params.atmosphereType === 'pad') {
      return
    }

    const now = this.audioContext.currentTime
    const beatDuration = 60 / params.tempo

    const playBeat = (time: number, velocity: number) => {
      if (velocity < 0.1) return

      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()
      const filter = this.audioContext.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.value = params.baseFrequency * 0.25

      filter.type = 'highpass'
      filter.frequency.value = 80

      gain.gain.value = 0
      gain.gain.setTargetAtTime(velocity * 0.15, time, 0.001)
      gain.gain.setTargetAtTime(0, time + 0.05, 0.02)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.masterGain)

      osc.start(time)
      osc.stop(time + 0.2)
    }

    for (let i = 0; i < 32; i++) {
      const beatTime = now + i * beatDuration
      const patternIndex = i % params.rhythmPattern.length
      const velocity = params.rhythmPattern[patternIndex]
      playBeat(beatTime, velocity)
      this.scheduledEvents.push(beatTime)
    }
  }

  setVolume(volume: number): void {
    this.masterGain.gain.setTargetAtTime(volume * 0.3, this.audioContext.currentTime, 0.1)
  }

  stop(): void {
    this.oscillators.forEach((osc) => {
      try {
        osc.stop()
      } catch (e) {
        // Already stopped
      }
    })
    this.oscillators = []
    this.nodes = []
    this.scheduledEvents = []
    this.isPlaying = false
  }

  resume(): void {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  pause(): void {
    if (this.audioContext.state === 'running') {
      this.audioContext.suspend()
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying && this.audioContext.state === 'running'
  }

  getAudioContext(): AudioContext {
    return this.audioContext
  }
}
