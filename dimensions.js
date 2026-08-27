const GAP = 8;
const BOARD_SIZES = [3, 4, 5, 6];

function intersectMultiple(...arrays) {
  if (arrays.length === 0) return [];

  // Convert arrays into Sets for optimal performance
  const sets = arrays.map((arr) => new Set(arr));

  // Use the first set as the baseline and filter elements present in all other sets
  return [...sets[0]].filter((element) =>
    sets.slice(1).every((set) => set.has(element)),
  );
}

function calc(gap) {
  const widths = [];

  BOARD_SIZES.map((boardSize, index) => {
    widths[index] = [];

    for (let width = 0; width <= 1000; width++) {
      const gapWidth = GAP * (boardSize + 1);
      const itemWidth = (width - gapWidth) / boardSize;
      const itemWidthWithoutGap = (width - GAP * 2) / boardSize;

      if (itemWidth < 0) continue;
      if (gap && !Number.isInteger(itemWidth)) continue;
      if (!gap && !Number.isInteger(itemWidthWithoutGap)) continue;

      widths[index].push(width);
    }
  });

  console.log(intersectMultiple(...widths));
}

console.dir('With gap:');
calc(true);
console.dir('Without gap:');
calc(false);
