import { mulberry32 } from '@/shared/utils/mulberry32';

interface Position {
  row: number;
  column: number;
}

export class Game {
  static readonly Status = {
    Idle: 'idle',
    Playing: 'playing',
    Paused: 'paused',
    Over: 'over',
  } as const;

  static readonly MoveDirection = {
    Left: 'left',
    Up: 'up',
    Right: 'right',
    Down: 'down',
  } as const;

  static readonly BLANK = 0;
  static readonly DEFAULT_BOARD_SIZE = 4;

  /**
   * Board size.
   */
  readonly boardSize: Game.BoardSize = Game.DEFAULT_BOARD_SIZE;
  /**
   * Current tile collection.
   */
  #board: Game.Board = [];
  /**
   * Number of moves.
   */
  #moves: number = 0;
  /**
   * Current game status.
   */
  #status: Game.Status = Game.Status.Idle;
  /**
   * Timestamp of latest moment when was play was started (after start/resume).
   */
  #playSessionStartedAt: number | null = null;
  /**
   * Elapsed time in milliseconds for current game.
   */
  #elapsedMs: number = 0;
  /**
   * Whether the game is auto-solved using the `solve` method.
   */
  #isAutoSolved: boolean = false;
  /**
   * Game state listeners.
   */
  #listeners: Set<Game.Listener> = new Set();
  /**
   * Random number generator function.
   */
  #random: () => number = Math.random;

  constructor(opts: Game.Options = {}) {
    if (opts.boardSize !== undefined) {
      this.boardSize = opts.boardSize;
    }

    if (opts.seed !== undefined) {
      this.#random = mulberry32(opts.seed);
    }

    this.init();
  }

  /**
   * Initializes a new game.
   */
  public init(): void {
    this.#board = Game.createSequence(this.boardSize, true, this.#random);
    this.#moves = 0;
    this.#status = Game.Status.Idle;
    this.#playSessionStartedAt = null;
    this.#elapsedMs = 0;
    this.#isAutoSolved = false;

    this.#emitGameState();
    this.#debug('New game initialized');
  }

  /**
   * Pauses the game.
   */
  public pause(): void {
    if (!this.isPlaying) {
      this.#debug('Cannot pause game that is not playing');
      return;
    }

    this.#status = Game.Status.Paused;

    this.#stopPlaySession();
    this.#emitGameState();
    this.#debug('Game paused');
  }

  /**
   * Resumes the paused game.
   */
  public resume(): void {
    if (!this.isPaused) {
      this.#debug('Cannot resume game that is not paused');
      return;
    }

    this.#status = Game.Status.Playing;
    this.#playSessionStartedAt = Date.now();

    this.#emitGameState();
    this.#debug('Game resumed');
  }

  /**
   * Solves the game.
   */
  public solve(): void {
    if (this.isOver) {
      this.#debug('Cannot solve game that is over');
      return;
    }

    this.#board = Game.createSequence(this.boardSize, false);
    this.#status = Game.Status.Over;
    this.#isAutoSolved = true;

    this.#stopPlaySession();
    this.#emitGameState();
    this.#debug('Game solved');
  }

  /**
   * Subscribes to the game state.
   *
   * @param listener
   * @returns Unsubscribe callback.
   */
  public subscribe(listener: Game.Listener): () => void {
    this.#listeners.add(listener);
    this.#debug('Listener added');

    return () => this.#listeners.delete(listener);
  }

  /**
   * Moves a tile.
   *
   * @param tile
   */
  public moveTile(tile: number): void {
    if (this.isPaused || this.isOver) {
      this.#debug('Cannot move a tile when the game is either paused or over');
      return;
    }

    if (tile === Game.BLANK) {
      this.#debug('Cannot move the blank tile itself');
      return;
    }

    if (!this.isTileMovable(tile)) {
      this.#debug(`Tile "${tile}" is not movable to the blank position`);
      return;
    }

    // If the game hasn't started yet then the first legal move must start it.
    if (this.isIdle) {
      this.#status = Game.Status.Playing;
      this.#playSessionStartedAt = Date.now();

      this.#debug('Game started');
    }

    const board = [...this.#board];

    const blankIndex = board.indexOf(Game.BLANK);
    const tileIndex = board.indexOf(tile);

    const blankPos = this.#indexToPosition(blankIndex);
    const tilePos = this.#indexToPosition(tileIndex);

    const step = blankPos.row === tilePos.row ? 1 : this.boardSize;
    const direction = tileIndex < blankIndex ? 1 : -1;

    for (
      let index = blankIndex;
      index !== tileIndex;
      index -= direction * step
    ) {
      board[index] = board[index - direction * step];
    }

    board[tileIndex] = Game.BLANK;

    this.#board = board;
    this.#moves++;

    this.#debug(`Tile "${tile}" moved`);

    if (Game.isSequenceSolved(this.#board)) {
      this.#status = Game.Status.Over;
      this.#stopPlaySession();
      this.#debug('Game over');
    }

    this.#emitGameState();
  }

  /**
   * Moves a tile by direction. Used when a move is initiated by player's
   * keyboard.
   *
   * @param direction
   */
  public move(direction: Game.MoveDirection): void {
    if (this.isPaused || this.isOver) {
      this.#debug('Cannot move a tile when the game is either paused or over');
      return;
    }

    const blankIndex = this.#board.indexOf(Game.BLANK);
    const { row, column } = this.#indexToPosition(blankIndex);

    const offset = DirectionOffsets[direction];

    const targetRow = row + offset.row;
    const targetColumn = column + offset.column;

    // The requested move would go outside the board.
    if (
      targetRow < 0 ||
      targetRow >= this.boardSize ||
      targetColumn < 0 ||
      targetColumn >= this.boardSize
    ) {
      this.#debug(
        'Cannot move tile because the requested move would go outside the board',
      );
      return;
    }

    const targetIndex = targetRow * this.boardSize + targetColumn;

    this.moveTile(this.#board[targetIndex]);
  }

  /**
   * Checks whether a tile is movable.
   *
   * @param tile
   */
  public isTileMovable(tile: number): boolean {
    const blankIndex = this.#board.indexOf(Game.BLANK);
    const tileIndex = this.#board.indexOf(tile);

    const blankPos = this.#indexToPosition(blankIndex);
    const tilePos = this.#indexToPosition(tileIndex);

    return blankPos.row === tilePos.row || blankPos.column === tilePos.column;
  }

  /**
   * Generate a solvable sequence of tiles.
   *
   * @param boardSize
   * @param shuffle Whether to shuffle the sequence or not.
   * @param random
   */
  public static createSequence(
    boardSize: Game.BoardSize = Game.DEFAULT_BOARD_SIZE,
    shuffle = true,
    random: () => number = Math.random,
  ): Game.Board {
    if (boardSize < 3 || boardSize > 6) {
      throw new Error(
        `Cannot create a sequence as an invalid board size "${boardSize}" is provided`,
      );
    }

    const squared = boardSize * boardSize;
    const sequence = Array.from({ length: squared }, (_, i) =>
      i + 1 === squared ? Game.BLANK : i + 1,
    );

    if (!shuffle) return sequence;

    // Shuffle the values using the Fisher-Yates Shuffle algorithm.
    const shuffleSequence = () => {
      for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));

        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
      }
    };

    // Shuffle the sequence until it is solvable and not already solved.
    do {
      shuffleSequence();
    } while (
      !Game.isSequenceSolvable(sequence) ||
      Game.isSequenceSolved(sequence)
    );

    return sequence;
  }

  /**
   * Checks if a sequence of tiles is solvable.
   *
   * @param sequence
   * @see https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
   */
  public static isSequenceSolvable(sequence: number[]): boolean {
    const length = sequence.length;
    const N = Math.sqrt(length);

    // Validate that the grid is a perfect square
    if (!Number.isInteger(N)) {
      throw new Error(
        'Puzzle length must be a perfect square (e.g., 9 for 3x3, 16 for 4x4).',
      );
    }

    let inversions = 0;
    let blankRowFromBottom = 0;

    // Calculate inversions and find the blank tile's row.
    for (let i = 0; i < length; i++) {
      // Handle the blank tile.
      if (sequence[i] === Game.BLANK) {
        // Calculate row from the bottom (1-indexed).
        blankRowFromBottom = N - Math.floor(i / N);
        continue;
      }

      // Count inversions for the current tile.
      for (let j = i + 1; j < length; j++) {
        if (sequence[j] !== 0 && sequence[i] > sequence[j]) {
          inversions++;
        }
      }
    }

    // Apply the mathematical rules of sliding puzzle solvability.
    if (N % 2 !== 0) {
      // Rule for odd N: solvable if inversions are even.
      return inversions % 2 === 0;
    } else {
      // Rule for even N: solvable if the inversion parity differs from the blank row parity.
      return inversions % 2 !== blankRowFromBottom % 2;
    }
  }

  /**
   * Checks if a sequence of tiles is solved.
   *
   * @param sequence
   */
  public static isSequenceSolved(sequence: Game.Board): boolean {
    const last = sequence.length - 1;

    for (let i = 0; i < last; i++) {
      if (sequence[i] !== i + 1) {
        return false;
      }
    }

    return sequence[last] === Game.BLANK;
  }

  #stopPlaySession(): void {
    if (this.#playSessionStartedAt === null) {
      return;
    }

    this.#elapsedMs += Date.now() - this.#playSessionStartedAt;
    this.#playSessionStartedAt = null;
  }

  /**
   * Converts a tile index to a position object with row and column.
   *
   * @param index
   */
  #indexToPosition(index: number): Position {
    const row = Math.floor(index / this.boardSize);
    const column = index % this.boardSize;

    return { row, column };
  }

  #emitGameState(): void {
    this.#listeners.forEach((listener) => listener(this.state));
  }

  /**
   * Log debug message in console in development environment.
   *
   * @param message
   */
  #debug(...args: unknown[]): void {
    if (import.meta.env.DEV) {
      console.log(
        '%cGame',
        'background:#4caf50;color:white;padding:2px 6px;border-radius:4px',
        ...args,
      );
    }
  }

  public get state(): Game.State {
    return Object.freeze({
      board: this.#board,
      moves: this.#moves,
      status: this.#status,
      isAutoSolved: this.#isAutoSolved,
    } satisfies Game.State);
  }

  /**
   * Calculates total play time which exludes time in pause.
   */
  public get totalPlayTime(): number {
    if (this.#playSessionStartedAt === null) {
      return this.#elapsedMs;
    }

    return this.#elapsedMs + (Date.now() - this.#playSessionStartedAt);
  }

  public get isIdle(): boolean {
    return this.#status === Game.Status.Idle;
  }

  public get isPlaying(): boolean {
    return this.#status === Game.Status.Playing;
  }

  public get isPaused(): boolean {
    return this.#status === Game.Status.Paused;
  }

  public get isOver(): boolean {
    return this.#status === Game.Status.Over;
  }
}

export namespace Game {
  export type Board = readonly number[];

  export type BoardSize = 3 | 4 | 5 | 6;

  export interface Options {
    /**
     * Board size.
     *
     * 2 for 2x2. 3 for 3x3. etc.
     *
     * @default 2
     */
    boardSize?: BoardSize;
    /**
     * Seed for random number generator. Used for testing purposes.
     */
    seed?: number;
  }

  export interface State {
    readonly board: Board;
    readonly moves: number;
    readonly status: Status;
    readonly isAutoSolved: boolean;
  }

  export type Status = (typeof Game.Status)[keyof typeof Game.Status];

  export type MoveDirection =
    (typeof Game.MoveDirection)[keyof typeof Game.MoveDirection];

  export type Listener = (state: State) => void;
}

const DirectionOffsets = {
  [Game.MoveDirection.Up]: { row: 1, column: 0 },
  [Game.MoveDirection.Down]: { row: -1, column: 0 },
  [Game.MoveDirection.Left]: { row: 0, column: 1 },
  [Game.MoveDirection.Right]: { row: 0, column: -1 },
} satisfies Record<Game.MoveDirection, Position>;
