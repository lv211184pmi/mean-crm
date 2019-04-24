export class Message {
  content?: string;
  timestamp?: Date;
  avatar?: string;
  isOwn?: boolean;

  constructor(values: any = {}) {
    Object.assign(this, values);
  }
}
