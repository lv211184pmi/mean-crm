export class Filter {
  start?: Date;
  end?: Date;
  order?: number;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
