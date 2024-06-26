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
  const values =
    'abcedefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
  let newShortUrl = '';
  for (let iteration = 0; iteration < 5; iteration++) {
    const randomValue = Math.floor(Math.random() * values.length);
    newShortUrl = newShortUrl + values.charAt(randomValue);
  }
  return newShortUrl;
};

export const checkShortUrl = async (shortURL: string) => {
  const checkIfShortURLExists = await prisma.urlTable
    .findUnique({
      where: {
        shortURL: shortURL,
      },
      select: { shortURL: true },
    })
    .then((data) => data);
  return checkIfShortURLExists;
};

export const validateShortUrl = (longURL: string) => {
  const partsOfURL = longURL.split('/');
  if (partsOfURL[partsOfURL.length - 1].length === 5) {
    return true;
  }
  return false;
};
