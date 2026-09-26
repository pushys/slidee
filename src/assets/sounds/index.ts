import countdown from './countdown.wav';
import countdownEnd from './countdown_end.wav';
import move from './move.wav';
import shuffle from './shuffle.wav';
import tick from './tick.wav';
import win from './win.mp3';

export const sounds = { countdown, countdownEnd, move, shuffle, tick, win };

export type SoundKey = keyof typeof sounds;
