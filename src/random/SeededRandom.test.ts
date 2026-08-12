import { SeededRandom } from './SeededRandom';

const a = new SeededRandom(12345);
const b = new SeededRandom(12345);
const c = new SeededRandom(12346);

const sequenceA = Array.from(
    { length: 5 },
    () => a.next()
);

const sequenceB = Array.from(
    { length: 5 },
    () => b.next()
);

const sequenceC = Array.from(
    { length: 5 },
    () => c.next()
);

console.log('A:', sequenceA);
console.log('B:', sequenceB);
console.log('C:', sequenceC);

console.log(
    'same seed:',
    JSON.stringify(sequenceA) === JSON.stringify(sequenceB)
);

console.log(
    'different seed:',
    JSON.stringify(sequenceA) !== JSON.stringify(sequenceC)
);