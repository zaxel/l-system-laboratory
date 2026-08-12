import type { Branch } from '../turtle/TurtleState';

export function shouldPlaceLeaf(branch: Branch) {
    return branch.children.length === 0;
}

export function getLeafPositionT() {
    return 0.7 + Math.random() * 0.3;
}