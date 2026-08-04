import type { Grammar } from "./Grammar";

export class LSystem {

    expand(
        grammar: Grammar,
        iterations: number
    ) {

        let current = grammar.axiom;

        for (let i = 0; i < iterations; i++) {

            let next = "";

            for (const symbol of current) {

                next += grammar.rules[symbol] ?? symbol;

            }

            current = next;
        }

        return current;
    }
}