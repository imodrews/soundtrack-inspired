import { MusicPreset } from './types'

export const PRESETS: MusicPreset[] = [
  {
    id: 'twin-peaks',
    title: 'Twin Peaks',
    description: 'Dreamy, surreal atmosphere with haunting melodies and jazz undertones',
    mood: ['mysterious', 'dreamy', 'unsettling'],
    musicalCharacteristics: {
      tempo: 'slow to medium',
      instruments: ['synthesizer', 'electric piano', 'bass', 'ambient pads'],
      atmosphere: 'ethereal and mysterious with jazz influences',
      keyElements: ['sustained chords', 'reverb-heavy textures', 'melancholic melodies', 'slow tempo'],
    },
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    description: 'Dark electronic soundscape with industrial beats and cyberpunk energy',
    mood: ['intense', 'futuristic', 'dark'],
    musicalCharacteristics: {
      tempo: 'fast',
      instruments: ['synthesizer', 'electronic drums', 'bass', 'digital effects'],
      atmosphere: 'dark, technological, and intense',
      keyElements: ['driving beats', 'distorted synths', 'heavy bass', 'digital glitches'],
    },
  },
  {
    id: 'blade-runner',
    title: 'Blade Runner',
    description: 'Atmospheric synth textures with noir-inspired melancholy',
    mood: ['melancholic', 'futuristic', 'contemplative'],
    musicalCharacteristics: {
      tempo: 'slow',
      instruments: ['synthesizer', 'ambient pads', 'electronic piano'],
      atmosphere: 'neo-noir, rainy cityscapes, philosophical',
      keyElements: ['lush synth pads', 'sparse melodies', 'ambient drones', 'emotional depth'],
    },
  },
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    description: '80s-inspired synthwave with nostalgic and eerie undertones',
    mood: ['nostalgic', 'mysterious', 'adventurous'],
    musicalCharacteristics: {
      tempo: 'medium',
      instruments: ['synthesizer', 'arpeggiator', 'bass', 'electronic drums'],
      atmosphere: 'retro-futuristic 80s horror-adventure',
      keyElements: ['arpeggiated sequences', 'analog synths', 'pulsing bass', 'cinematic swells'],
    },
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    description: 'Epic cosmic soundscapes with organ-driven emotional crescendos',
    mood: ['epic', 'emotional', 'vast'],
    musicalCharacteristics: {
      tempo: 'variable, building',
      instruments: ['organ', 'synthesizer', 'strings', 'ambient effects'],
      atmosphere: 'cosmic, time-bending, emotionally powerful',
      keyElements: ['church organ tones', 'massive reverb', 'slow builds', 'silence and space'],
    },
  },
  {
    id: 'drive',
    title: 'Drive',
    description: 'Neon-soaked synthwave with pulsing rhythms and dreamy melodies',
    mood: ['cool', 'atmospheric', 'nocturnal'],
    musicalCharacteristics: {
      tempo: 'medium',
      instruments: ['synthesizer', 'electronic drums', 'bass', 'pads'],
      atmosphere: 'nocturnal cityscape, stylized violence, romance',
      keyElements: ['driving basslines', 'shimmering synths', 'steady beats', 'vocal-like pads'],
    },
  },
  {
    id: 'dune',
    title: 'Dune',
    description: 'Vast desert soundscapes with ethnic instruments and deep atmospheres',
    mood: ['epic', 'mystical', 'ancient'],
    musicalCharacteristics: {
      tempo: 'slow to medium',
      instruments: ['synthesizer', 'percussion', 'ambient drones', 'ethnic textures'],
      atmosphere: 'desert mysticism, epic scale, ancient future',
      keyElements: ['deep bass drones', 'percussion patterns', 'female vocals textures', 'spatial effects'],
    },
  },
  {
    id: 'black-mirror',
    title: 'Black Mirror',
    description: 'Unsettling electronic textures exploring technology and humanity',
    mood: ['unsettling', 'technological', 'dystopian'],
    musicalCharacteristics: {
      tempo: 'variable',
      instruments: ['synthesizer', 'digital glitches', 'ambient noise', 'piano'],
      atmosphere: 'tech-dystopian, psychological thriller',
      keyElements: ['dissonant harmonies', 'digital artifacts', 'minimal piano', 'uncomfortable silences'],
    },
  },
]
