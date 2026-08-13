import type { Grammar } from '../grammar/Grammar';

export interface FoliageSettings {
    density: number;
    maxLeaves: number;
    spread: number;

    leafLength: {
        min: number;
        max: number;
    };

    leafWidth: {
        min: number;
        max: number;
    };
}

export interface PlantPreset {
    name: string;
    grammar: Grammar;

    foliage: FoliageSettings;
}