
// We use the Web Audio API to generate sounds without needing audio files.
// This ensures the app is self-contained and loads quickly.

/**
 * Plays a short, high-pitched "pop" sound.
 * Ideal for UI feedback like button clicks.
 */
export const playPopSound = () => {
  // Check for window to ensure it runs only in the browser
  if (typeof window === 'undefined') return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (!audioContext) return; // Web Audio API not supported

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Connect the nodes: Oscillator -> Gain -> Destination (speakers)
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Configure the sound's properties
  oscillator.type = 'triangle'; // A softer, less harsh tone than a sine wave
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A high note (A5)

  // Create a rapid volume decay to make it sound like a "pop"
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

  // Play the sound now and stop it after 0.2 seconds
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
};

/**
 * Plays a white noise burst that fades out, simulating a "blast" or "poof".
 * Perfect for disappearance or explosion effects.
 */
export const playBlastSound = () => {
  if (typeof window === 'undefined') return;

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (!audioContext) return;

  // Create a buffer for white noise
  const bufferSize = audioContext.sampleRate * 0.5; // 0.5 seconds of noise
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = buffer.getChannelData(0);

  // Fill the buffer with random values to create noise
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noiseSource = audioContext.createBufferSource();
  noiseSource.buffer = buffer;

  const gainNode = audioContext.createGain();

  // Create a fade-out effect
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

  // Connect nodes: Noise Source -> Gain -> Destination
  noiseSource.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Play and schedule stop
  noiseSource.start();
  noiseSource.stop(audioContext.currentTime + 0.5);
};
