# Planning Guide

A web-based generative music application that creates atmospheric soundscapes inspired by iconic films and TV series, using AI to capture the sonic essence of each title's unique mood and aesthetic.

**Experience Qualities**:
1. **Immersive** - Users should feel transported into the sonic world of their chosen film or series, with evolving soundscapes that capture the atmosphere
2. **Intuitive** - Selecting a title and generating music should be effortless, with immediate playback and clear controls
3. **Cinematic** - The interface and audio experience should feel premium and evocative, matching the quality of the source material

**Complexity Level**: Light Application (multiple features with basic state)
This app combines media selection, AI-powered generation, and audio playback with state management for presets and playback controls, but doesn't require complex routing or data management.

## Essential Features

**Preset Selection**
- Functionality: Browse and select from curated film/TV presets (Twin Peaks, The Matrix, Blade Runner, Stranger Things, etc.)
- Purpose: Provides users with recognizable starting points that evoke specific cinematic atmospheres
- Trigger: User clicks on a preset card or dropdown option
- Progression: View preset gallery → Select preset → Preview description → Generate button becomes active
- Success criteria: User can clearly identify and select any preset, with visual feedback confirming selection

**AI Music Generation**
- Functionality: Generate unique atmospheric music based on selected preset using LLM to create musical parameters
- Purpose: Creates procedurally generated soundscapes that capture the mood without copying copyrighted music
- Trigger: User clicks "Generate Music" button after selecting preset
- Progression: Click generate → Loading state with progress indication → AI analyzes preset characteristics → Web Audio API synthesizes music → Playback begins automatically
- Success criteria: Music generation completes within 3-5 seconds and resulting audio clearly reflects the chosen aesthetic

**Playback Controls**
- Functionality: Play, pause, and adjust volume of generated music
- Purpose: Gives users control over their listening experience
- Trigger: Music begins playing after generation, controls become active
- Progression: Music playing → Click pause to stop → Click play to resume → Drag volume slider to adjust
- Success criteria: All controls respond immediately and audio state persists correctly

**Regeneration**
- Functionality: Generate a new variation using the same preset
- Purpose: Provides variety and exploration within a chosen aesthetic
- Trigger: User clicks regenerate button while music is playing or paused
- Progression: Click regenerate → Brief loading state → New variation generated → Playback switches to new track
- Success criteria: Each regeneration produces noticeably different music while maintaining the preset's aesthetic

## Edge Case Handling

- **Generation Failure**: If AI generation fails, display error toast and allow retry with fallback to preset defaults
- **Audio Context Issues**: Handle browser autoplay restrictions with clear "Click to enable audio" prompt if needed
- **Rapid Clicking**: Debounce generate button to prevent multiple simultaneous generation requests
- **No Preset Selected**: Disable generate button until user selects a preset
- **Mid-Generation Switching**: Cancel pending generation if user selects different preset before completion

## Design Direction

The design should evoke a high-end audio production interface with cinematic atmosphere - think of a sound designer's workspace meets a streaming service. Dark, moody, with glowing accents that suggest both technology and artistry. The interface should feel like a professional tool that's been made accessible and beautiful.

## Color Selection

A dark, cinematic color scheme with electric blue accents and rich blacks, creating a premium audio application aesthetic.

- **Primary Color**: Deep electric blue (oklch(0.55 0.18 240)) - Represents technology, creativity, and audio wavelengths
- **Secondary Colors**: Charcoal gray (oklch(0.25 0.02 240)) for cards and surfaces, creating depth and sophistication
- **Accent Color**: Bright cyan (oklch(0.75 0.15 200)) - For interactive elements, playback indicators, and calls-to-action
- **Foreground/Background Pairings**: 
  - Background (Deep black oklch(0.12 0.01 240)): Light gray text (oklch(0.95 0.01 240)) - Ratio 15.8:1 ✓
  - Primary (Electric blue oklch(0.55 0.18 240)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Charcoal oklch(0.25 0.02 240)): Light text (oklch(0.95 0.01 240)) - Ratio 10.1:1 ✓
  - Accent (Bright cyan oklch(0.75 0.15 200)): Black text (oklch(0.12 0.01 240)) - Ratio 11.3:1 ✓

## Font Selection

Typography should balance technical precision with artistic flair, using a distinctive display font for preset names and a clean modern font for UI elements.

- **Typographic Hierarchy**: 
  - H1 (App Title): Space Grotesk Bold/32px/tight letter spacing/-0.02em
  - H2 (Preset Names): Space Grotesk SemiBold/24px/normal spacing
  - H3 (Section Headers): JetBrains Mono Medium/14px/wide spacing/0.05em
  - Body (Descriptions): Inter Regular/15px/1.5 line height
  - UI Labels: JetBrains Mono Regular/13px/wide spacing/0.03em

## Animations

Animations should reinforce the audio-visual connection - waveforms, pulses, and smooth transitions that feel synchronized with music generation and playback.

- Preset cards should have subtle hover lift with glow effect
- Generate button should pulse gently when active, with satisfying press animation
- Loading states should feature animated waveform or frequency bars
- Playback indicator should pulse in rhythm with generated music
- Volume slider should have smooth drag response with visual feedback
- Page transitions should fade smoothly without jarring cuts

## Component Selection

- **Components**: 
  - Card component for preset display with hover states and selection indicators
  - Button component with variants (primary for generate, secondary for controls)
  - Slider component for volume control with custom styling
  - Progress component for generation loading state
  - Badge component for genre/mood tags on presets
  - Scroll Area for preset list if many options
  - Tooltip for control explanations
  
- **Customizations**: 
  - Custom audio visualizer component using canvas/SVG for waveform display
  - Custom preset card with image overlay and gradient masks
  - Glowing border effects on active elements using box-shadow
  - Custom play/pause button with morphing icon animation
  
- **States**: 
  - Buttons: Idle with subtle glow, hover with brightness increase, active with press down effect, disabled with reduced opacity
  - Preset cards: Idle with border, hover with lift and glow, selected with bright border and background shift
  - Volume slider: Smooth drag with thumb highlighting, track fills from left to indicate level
  
- **Icon Selection**: 
  - Play/Pause from Phosphor for playback controls
  - ArrowsClockwise for regenerate
  - SpeakerHigh/SpeakerLow for volume
  - Waveform or MusicNotes for audio visualization
  - Sparkle for generation/AI indicator
  
- **Spacing**: 
  - Container padding: p-6 on desktop, p-4 on mobile
  - Card gaps: gap-6 for preset grid
  - Control groups: gap-4 for related buttons, gap-2 for tight groups
  - Section margins: mb-8 for major sections, mb-4 for subsections
  
- **Mobile**: 
  - Preset grid: 2 columns on desktop, 1 column on mobile with full-width cards
  - Controls stack vertically on mobile with larger touch targets (min 44px)
  - App title reduces to 24px on mobile
  - Volume slider gets larger thumb for easier touch control
  - Preset cards show condensed info on mobile with tap to expand for full description
