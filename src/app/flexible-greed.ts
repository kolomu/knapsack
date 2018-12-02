import { Item } from "./Item";

export function greedy(items: Item[], maxCost: number, keyFunction: (a: Item, b: Item) => number): [any[], number, number] {
    const sortedArr = items.sort(keyFunction);
    const result = [];
    let totalValue = 0;
    let totalCost = 0;
    for (let i = 0; i < sortedArr.length; i++) {
        let currentItem = items[i];
        let currentItemCost = currentItem.getCost();
        if (currentItemCost + totalCost < maxCost) {
            result.push(currentItem);
            totalCost += currentItemCost;
            totalValue += currentItem.getValue();
        }
    }
    return [result, totalValue, totalCost];
}

export function greedyByValue(items: Item[], maxCost: number) {
    return greedy(items, maxCost, (a: Item, b: Item) => b.getValue() - a.getValue());
}

export function greedyByCost(items: Item[], maxCost: number) {
    return greedy(items, maxCost, (a: Item, b: Item) => a.getCost() - b.getCost());
}

export function greedyByDensity(items: Item[], maxCost: number) {
    return greedy(items, maxCost, (a: Item, b: Item) => b.getDensity() - a.getDensity());
}


export function testGreedy(items: Item[], constraint: number, keyFunction: (a: Item, b: Item) => number) {
    const [takenItems, itemValue, itemCost] = greedy(items, constraint, keyFunction);
    console.log(`Total value of items taken = ${itemValue} with total cost ${itemCost}`);
    console.log(takenItems);
}

export function testGreedys(items: Item[], maxCost: number) {
    // use greedy by value
    console.log('Greedy by Value');
    testGreedy(items, maxCost, (a: Item, b: Item) => a.getValue() - b.getValue());

    // use greedy by cost
    console.log('Greedy by Cost');
    testGreedy(items, maxCost, (a: Item, b: Item) => a.getCost() - b.getCost());

    // use greedy by density
    console.log('Greedy by Density');
    testGreedy(items, maxCost, (a: Item, b: Item) => a.getDensity() - b.getDensity());
}
