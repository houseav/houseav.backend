export class ForgotPasswordResponse {
  status: string;
  message: string;
  timeCreation?: Date;

  constructor(status: string, message: string, timeCreation?: Date) {
    this.status = status;
    this.message = message;
    this.timeCreation = timeCreation;
  }
}
