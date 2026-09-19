import bcrypt from 'bcryptjs';
import { Config } from '../../../common/env';

export const comparePasswords = async (plainPassword: string, hashedPassword: string) =>
  await bcrypt.compare(plainPassword, hashedPassword);

export const hashPassword = async (plainPassword: string) => await bcrypt.hash(plainPassword, Config.bCryptSaltRounds);
