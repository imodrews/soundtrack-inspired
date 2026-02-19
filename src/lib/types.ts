export interface MusicPreset {
  id: string
  title: string
  description: string
  mood: string[]
  musicalCharacteristics: {
    tempo: string
    instruments: string[]
    atmosphere: string
    keyElements: string[]
  }
}

export interface GeneratedMusic {
  id: string
  presetId: string
  audioContext: AudioContext
  nodes: AudioNode[]
  startTime: number
}
