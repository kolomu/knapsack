import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { Item } from './Item';
import { greedyByCost, greedyByDensity, greedyByValue } from './flexible-greed';

import { shuffle } from 'lodash';

const DATA: Item[] = [
  new Item('Schnitzel', 25, 45),
  new Item('Wine', 89, 123),
  new Item('Beer', 90, 154),
  new Item('Pizza', 30, 258),
  new Item('Burger', 50, 354),
  new Item('Fries', 90, 365),
  new Item('Coke', 79, 150),
  new Item('Apple', 90, 95),
  new Item('Donut', 10, 195)
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'value', 'cost'];
  dataSource = DATA;

  maxcost: number;

  selection = new SelectionModel<Item>(true, []);

  greedyValueResult: { items: Item[], totalCost: number, totalValue: number };
  greedyCostResult: { items: Item[], totalCost: number, totalValue: number };
  greedyDensityResult: { items: Item[], totalCost: number, totalValue: number };

  ngOnInit(): void {
    this.maxcost = 750;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  startGreedy() {
    console.log('starting Greedy algorithm');

    const [greedyByValueItems, greedyByValueValue, greedyByValueCost] = greedyByValue(this.dataSource, this.maxcost);
    this.greedyValueResult = { items: greedyByValueItems, totalValue: greedyByValueValue, totalCost: greedyByValueCost };

    const [greedyByCostItems, greedyByCostValue, greedyByCostCost] = greedyByCost(this.dataSource, this.maxcost);
    this.greedyCostResult = { items: greedyByCostItems, totalValue: greedyByCostValue, totalCost: greedyByCostCost };

    const [greedyByDensityItems, greedyByDensityValue, greedyByDensityCost] = greedyByDensity(this.dataSource, this.maxcost);
    this.greedyDensityResult = { items: greedyByDensityItems, totalValue: greedyByDensityValue, totalCost: greedyByDensityCost };
  }

  startBruteForce() {
    console.log('starting Bruteforce algorithm');
  }

  startBranch() {
    console.log('starting Branch algorithm');
  }

  shuffleItems() {
    console.log('Shuffling Items makes no difference because items get sorted in the background :)');
    this.dataSource = shuffle(this.dataSource);
  }

  // FIXME: Probably useless method because we are building instances on the fly.
  buildItems(names: string[], values: number[], cost: number[]): Item[] {
    const items = [];

    if (names.length !== values.length || values.length !== cost.length) {
      throw new Error('Provided arrays don\'t have the same length');
    }

    for (let i = 0; i < names.length; i++) {
      items.push(new Item(names[i], values[i], cost[i]));
    }

    return items;
  }


}
