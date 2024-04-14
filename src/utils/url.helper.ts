import { PrismaService } from '../../src/database/prisma.service';

const prisma = new PrismaService();
export const getShortVersionUrl = async () => {
  while (true) {
    const newURL = getNewShortUrl();
    const isAvailable = await checkShortUrl(newURL);
    if (isAvailable == null) {
      return newURL;
    }
  }
};

export const getNewShortUrl = () => {
  // values represents all alphabets
  // values provides 0-9 digits
  // limit 5 give 5 digits
  // 62(base)^5
  const values = 'abcedefghijklnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  let newShortUrl = '';
  for (let iteration = 0; iteration < 5; iteration++) {
    const randomValue = Math.floor(Math.random() * values.length);
    newShortUrl = newShortUrl + values.charAt(randomValue);
  }
  return newShortUrl;
};

export const checkShortUrl = async (shortURL: string) => {
  const verify = await prisma.urlTable
    .findUnique({
      where: {
        shortURL: shortURL,
      },
      select: { shortURL: true },
    })
    .then((data) => data);
  return verify;
};
