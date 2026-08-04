import type { Grammar } from "./Grammar";

export class LSystem {
    expand(grammar: Grammar, iterations: number): string {
        let current = grammar.axiom;

        for (let i = 0; i < iterations; i++) {
            let next = '';

            for (const symbol of current) {
                const rule = grammar.rules.find(
                    r => r.predecessor === symbol
                );

                next += rule
                    ? rule.successor
                    : symbol;
            }

            current = next;
        }

        return current;
    }
}