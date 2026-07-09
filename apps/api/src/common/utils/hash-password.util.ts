import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (error, hashed) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(hashed);
    });
  });
}
