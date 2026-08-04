import { createApp } from '../server.ts';

let appPromise: Promise<import('express').Express> | null = null;

const getApp = async () => {
  if (!appPromise) {
    appPromise = createApp();
  }
  return appPromise;
};

export default async function handler(req: any, res: any) {
  const app = await getApp();
  return new Promise<void>((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
