// export const simpleTree = "FFFF[+FFFF[+FFFF[+FF[-FF]][-FF[+FF]]][-FFFF[+FF[-FF]][-FF[+FF]]]][-FFFF[+FFFF[+FF[-FF]][-FF[+FF]]][-FFFF[+FF[-FF]][-FF[+FF]]]]FFFF[+FFFF[+FF[-FF]][-FF[+FF]]][-FFFF[+FF[-FF]][-FF[+FF]]]FF";


import type { PlantPreset } from './PlantPreset';
import { treeGrammar } from '../grammar/Grammar';

export const simpleTree: PlantPreset = {
    name: 'Simple Bush',

    grammar: treeGrammar,

    foliage: {
        density: 0.7,

        maxLeaves: 6,

        spread: Math.PI * 2,

        leafLength: {
            min: 0.8,
            max: 1.2,
        },

        leafWidth: {
            min: 0.3,
            max: 0.5,
        },
    },
};