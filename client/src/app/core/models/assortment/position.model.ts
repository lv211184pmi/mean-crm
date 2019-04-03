export class Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
