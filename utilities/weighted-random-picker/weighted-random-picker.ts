import {obtain} from "@/types/container";

interface Ticket {
  id: number;
  weight: number;
  [index: string]: unknown; // Allows for arbitrary properties
}

interface WeightClasses {
  [weight: number]: number[];
}

export class WeightedPicker {
  private constructor(private tickets: Ticket[]) {
    this.weightClasses = {};
    this.tickets.forEach(this.addTicket);
  }
  private weightClasses: WeightClasses;

  public static of(tickets: Ticket[]): WeightedPicker {
    return new WeightedPicker(tickets);
  }

  private addTicket(ticket: Ticket): void {
    this.weightClasses[ticket.weight].push(ticket.id);
  }
}

const randomNumber = (): number => {
  return obtain<() => number>("random-number-generator")();
};

export const randomSegment = (maxWeight: number): number => {
  const weights = Array.from({length: maxWeight}, (_, i) => i + 1);
  const totalWeight = weights.reduce((total, weight) => total + weight, 0);
  const randomWeight = randomNumber() * totalWeight;
  let weightSum = 0;
  for (const weight of weights) {
    weightSum += weight;
    if (weightSum >= randomWeight) {
      return weight;
    }
  }
  throw new Error(
    `random weight ${randomWeight} exceeded maxWeight ${maxWeight}`
  );
};
