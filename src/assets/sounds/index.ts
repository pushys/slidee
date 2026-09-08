import countdown from './countdown.wav';
import countdownEnd from './countdown_end.wav';
import move from './move.wav';
import win from './win.mp3';

export const sounds = { countdown, countdownEnd, move, win };

export type SoundKey = keyof typeof sounds;
