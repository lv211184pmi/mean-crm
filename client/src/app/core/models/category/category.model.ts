export class Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
