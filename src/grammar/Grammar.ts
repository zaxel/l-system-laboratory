export interface Grammar {
    axiom: string;
    rules: Rule[];
}

export interface Rule {
    predecessor: string;
    successor: string;
}


export const treeGrammar: Grammar = {
    axiom: "F",
    rules: [
        {
            predecessor: "F",
            // successor: "F[+F]F[-F]F",
            successor: "FF-[-F+F+F]+[+F-F-F]",
        }
    ]
}