
import { emailQueue } from '../config/queue';
import crypto from 'crypto';

export const getEnvVariable = (key: string) => {
  if (typeof process.env[key] === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
};



export const addJobToQueue = (emailData: {
  to: string;
  subject: string;
  body: string;
}) => {
  emailQueue.add('sendEmail', emailData, {
    attempts: 3, // Retry 3 times if the job fails
    backoff: {
      type: 'fixed',
      delay: 5000, // Wait 5 seconds before retrying
    },
  });
};

export const generateToken = () => {
  return crypto
    .randomBytes(Math.ceil(20 / 2))
    .toString('hex')
    .slice(0, 20);
};

export const constructEmail = (message: string, verificationLink: string) => {
  return `<h3>${message}</h3>
    <a style="background-color: blue;
     text-align: center; color: white;
      text-decoration: none; padding:
       5px; border: none; border-radius: 3px;"
        href=${verificationLink}>
         Reset Password
         </a>`;
};
