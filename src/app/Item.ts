export class Item {
    constructor(private name: string, private value: number, private cost: number) { }

    getDensity(): number {
        if (this.cost <= 0) {
            throw new Error('Cost is zero or below which is not allowed');
        }
        return this.value / this.cost;
    }

    public getCost() {
        return this.cost;
    }

    public getValue() {
        return this.value;
    }

    public toString = (): string => {
        return `${this.name}: <${this.value}, ${this.cost}>`;
    }
}

