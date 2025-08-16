
//Calculate the move cost
export function calculateFuelCost(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

//Calculate the cost and travel distance
export function findTreasure(n, m, p, matrix) {
  const positions = Array.from({ length: p + 1 }, () => []);

  //Group the positions of the chests
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      positions[matrix[i][j]].push([i, j]);
    }
  }

  // DP: dp[k] = Map(key="x,y", {cost, parent})
  let dp = [];
  dp[0] = new Map();
  dp[0].set("0,0", { cost: 0, parent: null });

  for (let k = 0; k < p; k++) {
    dp[k + 1] = new Map();

    for (let [posKey, { cost }] of dp[k].entries()) {
      const [x1, y1] = posKey.split(",").map(Number);

      for (let [x2, y2] of positions[k + 1]) {
        const dist = calculateFuelCost(x1, y1, x2, y2);
        const newCost = cost + dist;
        const key2 = `${x2},${y2}`;

        if (!dp[k + 1].has(key2) || dp[k + 1].get(key2).cost > newCost) {
          dp[k + 1].set(key2, { cost: newCost, parent: posKey });
        }
      }
    }
  }

  // Get the best result at level p
  let bestKey = null;
  let minCost = Infinity;
  for (let [key, { cost }] of dp[p].entries()) {
    let roundedCost = parseFloat(cost.toFixed(2));
    if (roundedCost < minCost) {
      minCost = roundedCost;
      bestKey = key;
    }
  }

  // Reconstruct path (chest 1 → max chest p)
  let planPath = [];
  let cur = bestKey;
  let level = p;

  while (cur && level > 0) {
    const node = dp[level].get(cur);
    if (!node) break;
    const [x, y] = cur.split(",").map(Number);
    planPath.push([x, y]);
    cur = node.parent;
    level--;
  }

  planPath.reverse();

  return { minCost, planPath };
}