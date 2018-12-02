import { Item } from "./Item";

export function bruteforce(items: Item[], constraint: number) {
    const result = [];
    const pairs = [];
    let maxCost = 0;
    let maxValue = 0;

    // finding all possible subsets in a given array is not as simple as I thought it would be
    // src: https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript 
    // the problem with an iterative approach is that building each subset is a difficult because the length increases 
    // and also some values shouldnt be taken into consideration because we already have them just in different order
    // e.g. [apple, banana] and [banana, apple] is the same

    // to solve a problem always use an example for visualization
    // e.g. [a,b,c] -> [ [a], [b], [c], [a,b], [a,c], [b,c], [a,b,c]]
    // its easy to get the first 3 pairs but how about [a,b] ? You need to know that the pair have to be of 
    // length 2 and that ba and ca should not be included in the array

    // its helpful to think about visualizing the possible combinations .e.g only [1,2] subsets

    console.log(getAllSubsets([1, 2, 3]));

    return [result, maxCost, maxValue];
}

export function getAllSubsets(arr: any[]) {
    // array reduce(accumulator = subsets, currentValue = value)
    return arr.reduce(
        // here we are using the accumulator and concatening it
        // concat = [a,b,c] + [c,d,e] => [a,b,c,c,d,e]
        (subsets, value) => subsets.concat(
            // here we are mapping the set to a new array with the value 
            // and use spread syntax to copy previous array so [5,1,2,3,4]
            subsets.map(set => [value, ...set])
        ), [[]]); // we start the reduce function with an empty array
}