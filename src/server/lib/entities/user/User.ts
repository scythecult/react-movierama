import type { UserSignUpRequest } from '../../../../common/entities/auth';
import { comparePasswords, hashPassword } from '../../helpers/auth';

export class User {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isLegalChecked: boolean;
  isPromoChecked?: boolean | undefined;

  constructor(data: UserSignUpRequest) {
    this.phone = data.phone;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.isLegalChecked = data.isLegalChecked;
    this.isPromoChecked = data.isPromoChecked;
  }

  static async comparePasswords(userPassword: string, hashedPassword: string) {
    return await comparePasswords(userPassword, hashedPassword);
  }

  async hashPassword() {
    this.password = await hashPassword(this.password);
  }

  getAsDto() {
    return this;
  }
}
