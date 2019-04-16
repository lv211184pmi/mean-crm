export class Message {
  content?: string;
  timestamp?: Date;
  avatar?: string;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
