export class User {
  email: string;
  password: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
