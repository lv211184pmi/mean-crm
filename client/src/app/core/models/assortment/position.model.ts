export class Position {
  name: string;
  cost: number;
  category: string;
  user?: string;
  _id: string;
  quantity?: number;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
