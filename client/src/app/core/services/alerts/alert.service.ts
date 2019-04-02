declare const M;

export class AlertService {
  static message(message: string) {
    M.toast({ html: message });
  }
}
