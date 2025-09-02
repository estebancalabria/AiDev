"""
Sound manager for the Pacman game.
Handles loading and playing sound effects.
"""

import pygame
import os

class SoundManager:
    def __init__(self):
        """Initialize the sound manager."""
        self.audio_available = False
        
        try:
            # Try to initialize pygame mixer
            pygame.mixer.init(frequency=22050, size=-16, channels=2, buffer=512)
            self.audio_available = True
            print("Audio system initialized successfully")
        except Exception as e:
            print(f"Audio not available: {e}")
            print("Game will run without sound")
        
        # Generate simple sound effects programmatically
        self.sounds = {}
        if self.audio_available:
            self._generate_sounds()
        else:
            # Create silent sound placeholders
            self.sounds = {
                'move': None,
                'dot': None,
                'game_over': None
            }
        
    def _generate_sounds(self):
        """Generate simple sound effects programmatically."""
        if not self.audio_available:
            return
            
        try:
            # Generate a simple beep for movement (very short)
            self.sounds['move'] = self._generate_tone(220, 0.05)  # A note, 50ms
            
            # Generate a higher pitch beep for dot collection
            self.sounds['dot'] = self._generate_tone(440, 0.1)  # A note one octave higher, 100ms
            
            # Generate a descending tone for game over
            self.sounds['game_over'] = self._generate_descending_tone()
            
        except Exception as e:
            print(f"Warning: Could not generate sounds: {e}")
            # Create silent sounds as fallback
            self.sounds = {
                'move': None,
                'dot': None,
                'game_over': None
            }
    
    def _generate_tone(self, frequency, duration):
        """Generate a simple sine wave tone."""
        import math
        
        sample_rate = 22050
        frames = int(duration * sample_rate)
        
        # Generate sine wave
        wave_array = []
        for i in range(frames):
            time = float(i) / sample_rate
            amplitude = 4096  # Max amplitude for 16-bit audio
            wave = amplitude * math.sin(frequency * 2 * math.pi * time)
            
            # Fade out to prevent clicks
            fade_frames = min(frames // 10, 100)
            if i < fade_frames:
                wave *= i / fade_frames
            elif i > frames - fade_frames:
                wave *= (frames - i) / fade_frames
            
            wave_array.append([int(wave), int(wave)])  # Stereo
        
        # Create pygame sound
        sound = pygame.sndarray.make_sound(wave_array)
        return sound
    
    def _generate_descending_tone(self):
        """Generate a descending tone for game over."""
        import math
        
        sample_rate = 22050
        duration = 0.5  # 500ms
        frames = int(duration * sample_rate)
        
        wave_array = []
        start_freq = 440
        end_freq = 220
        
        for i in range(frames):
            time = float(i) / sample_rate
            progress = i / frames  # 0 to 1
            
            # Linearly interpolate frequency
            frequency = start_freq + (end_freq - start_freq) * progress
            
            amplitude = 4096 * (1 - progress * 0.5)  # Fade out
            wave = amplitude * math.sin(frequency * 2 * math.pi * time)
            
            wave_array.append([int(wave), int(wave)])  # Stereo
        
        sound = pygame.sndarray.make_sound(wave_array)
        return sound
    
    def play_move(self):
        """Play movement sound effect."""
        if not self.audio_available or not self.sounds.get('move'):
            return
        try:
            # Play at low volume to avoid being annoying
            self.sounds['move'].set_volume(0.1)
            self.sounds['move'].play()
        except:
            pass  # Ignore sound errors
    
    def play_dot_collect(self):
        """Play dot collection sound effect."""
        if not self.audio_available or not self.sounds.get('dot'):
            return
        try:
            self.sounds['dot'].set_volume(0.3)
            self.sounds['dot'].play()
        except:
            pass  # Ignore sound errors
    
    def play_game_over(self):
        """Play game over sound effect."""
        if not self.audio_available or not self.sounds.get('game_over'):
            return
        try:
            self.sounds['game_over'].set_volume(0.5)
            self.sounds['game_over'].play()
        except:
            pass  # Ignore sound errors
