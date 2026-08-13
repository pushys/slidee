import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';

import { Game } from './game';

const SEQUENCE = [1, 5, 3, 7, 6, 0, 4, 2, 8] as const;

describe('Game', () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: 0 });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize a new game instance', () => {
    const game = new Game({ boardSize: 3 });

    expect(game.state.board).toStrictEqual(SEQUENCE);
    expect(game.state.moves).toBe(0);
    expect(game.state.status).toBe(Game.Status.Idle);
    expect(game.state.isAutoSolved).toBe(false);
    expect(game.totalPlayTime).toBe(0);
  });

  it('should pause the game', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(8);
    game.pause();

    expect(game.state.status).toBe(Game.Status.Paused);
  });

  it('should resume the game', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(8);
    game.pause();
    game.resume();

    expect(game.state.status).toBe(Game.Status.Playing);
  });

  it('should solve the game', () => {
    const game = new Game({ boardSize: 3 });

    game.solve();

    expect(game.state.board).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    expect(game.state.status).toBe(Game.Status.Over);
  });

  it('should not pause the game that is not playing', () => {
    const game = new Game({ boardSize: 3 });

    game.pause();

    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should not resume the game that is not paused', () => {
    const game = new Game({ boardSize: 3 });

    game.resume();

    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should move a tile and start the game', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(6);

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 0, 6, 4, 2, 8]);
    expect(game.state.moves).toBe(1);
    expect(game.state.status).toBe(Game.Status.Playing);
  });

  it('should move multiple tiles in cascade', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(7);

    expect(game.state.board).toStrictEqual([1, 5, 3, 0, 7, 6, 4, 2, 8]);

    game.moveTile(4);

    expect(game.state.board).toStrictEqual([1, 5, 3, 4, 7, 6, 0, 2, 8]);

    game.moveTile(1);

    expect(game.state.board).toStrictEqual([0, 5, 3, 1, 7, 6, 4, 2, 8]);
  });

  it('should not move a tile when the game is paused', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(6);
    game.pause();
    game.moveTile(6);

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 0, 6, 4, 2, 8]);
    expect(game.state.moves).toBe(1);
  });

  it('should not move a tile when the game is over', () => {
    const game = new Game({ boardSize: 3 });

    game.solve();
    game.moveTile(8);

    expect(game.state.board).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  });

  it('should not start the game when tile is not movable', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(1);

    expect(game.state.board).toStrictEqual(SEQUENCE);
    expect(game.state.moves).toBe(0);
    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should not move a non-movable tile', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(1);

    expect(game.state.board).toStrictEqual(SEQUENCE);
    expect(game.state.moves).toBe(0);
    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should not move the blank tile', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(0);

    expect(game.state.board).toStrictEqual(SEQUENCE);
    expect(game.state.moves).toBe(0);
    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should move a tile by direction and start the game', () => {
    const game = new Game({ boardSize: 3 });

    game.move('up');

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 6, 8, 4, 2, 0]);
    expect(game.state.moves).toBe(1);
    expect(game.state.status).toBe(Game.Status.Playing);

    game.move('right');

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 6, 8, 4, 0, 2]);
    expect(game.state.moves).toBe(2);

    game.move('down');

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 0, 8, 4, 6, 2]);
    expect(game.state.moves).toBe(3);

    game.move('left');

    expect(game.state.board).toStrictEqual([1, 5, 3, 7, 8, 0, 4, 6, 2]);
    expect(game.state.moves).toBe(4);
  });

  it('should not move a tile by direction and start the game as nowhere to move', () => {
    const game = new Game({ boardSize: 3 });

    game.move('left');

    expect(game.state.board).toStrictEqual(SEQUENCE);
    expect(game.state.moves).toBe(0);
    expect(game.state.status).toBe(Game.Status.Idle);
  });

  it('should subscribe/unsubscribe to game state changes', () => {
    const game = new Game({ boardSize: 3 });

    let stateChanges: Game.State[] = [];

    const unsubscribe = game.subscribe((state) => stateChanges.push(state));

    game.move('up');
    game.pause();
    game.resume();
    game.solve();

    expect(stateChanges).toStrictEqual([
      {
        board: [1, 5, 3, 7, 6, 8, 4, 2, 0],
        moves: 1,
        status: Game.Status.Playing,
        isAutoSolved: false,
      },
      {
        board: [1, 5, 3, 7, 6, 8, 4, 2, 0],
        moves: 1,
        status: Game.Status.Paused,
        isAutoSolved: false,
      },
      {
        board: [1, 5, 3, 7, 6, 8, 4, 2, 0],
        moves: 1,
        status: Game.Status.Playing,
        isAutoSolved: false,
      },
      {
        board: [1, 2, 3, 4, 5, 6, 7, 8, 0],
        moves: 1,
        status: Game.Status.Over,
        isAutoSolved: true,
      },
    ]);

    unsubscribe();

    game.init();

    expect(stateChanges.length).toBe(4);
  });

  it('should create solvable sequences of different sizes', () => {
    const seq1 = Game.createSequence(3);
    const seq2 = Game.createSequence(4);
    const seq3 = Game.createSequence(5);
    const seq4 = Game.createSequence(6);

    expect(seq1).toStrictEqual(SEQUENCE);
    expect(seq2).toStrictEqual([
      8, 2, 6, 1, 12, 0, 15, 14, 11, 9, 10, 5, 4, 7, 3, 13,
    ]);
    expect(seq3).toStrictEqual([
      2, 16, 8, 18, 21, 19, 13, 4, 23, 6, 10, 14, 5, 17, 9, 15, 11, 24, 7, 3,
      20, 0, 22, 12, 1,
    ]);
    expect(seq4).toStrictEqual([
      19, 18, 28, 30, 14, 34, 24, 21, 6, 15, 10, 35, 2, 23, 3, 20, 9, 4, 0, 11,
      33, 32, 1, 5, 25, 16, 12, 22, 27, 31, 26, 13, 8, 17, 7, 29,
    ]);
  });

  it('should throw on invalid board size when creating a sequence', () => {
    expect(() => Game.createSequence(2 as any)).toThrow();
    expect(() => Game.createSequence(7 as any)).toThrow();
  });

  it('should check if a sequence is solvable', () => {
    const seq1 = [7, 0, 2, 6, 1, 8, 4, 3, 5];
    const seq2 = [4, 8, 7, 5, 3, 2, 0, 1, 6];
    const seq3 = [4, 1, 7, 2, 0, 3, 5, 6, 8];
    const seq4 = [2, 4, 1, 0, 8, 3, 5, 7, 6];

    expect(Game.isSequenceSolvable(seq1)).toBe(false);
    expect(Game.isSequenceSolvable(seq2)).toBe(true);
    expect(Game.isSequenceSolvable(seq3)).toBe(false);
    expect(Game.isSequenceSolvable(seq4)).toBe(true);
  });

  it('should throw if checking solvability of an invalid sequence', () => {
    const seq = [4, 8, 7, 5, 3, 2, 0, 1];

    expect(() => Game.isSequenceSolvable(seq)).toThrow();
  });

  it('should check if sequence is solved', () => {
    const seq1 = [4, 8, 7, 5, 3, 2, 0, 1, 6];
    const seq2 = [1, 2, 3, 4, 5, 6, 7, 8, 0];

    expect(Game.isSequenceSolved(seq1)).toBe(false);
    expect(Game.isSequenceSolved(seq2)).toBe(true);
  });

  it('should calculate total play time', () => {
    const game = new Game({ boardSize: 3 });

    game.moveTile(6);
    vi.advanceTimersByTime(3000);
    game.pause();
    vi.advanceTimersByTime(5000);
    game.resume();
    vi.advanceTimersByTime(2000);
    game.moveTile(6);
    vi.advanceTimersByTime(1000);
    game.solve();
    vi.advanceTimersByTime(10000);

    expect(game.totalPlayTime).toBe(6000);
  });
});
