import { openDB } from 'idb';

const DATABASE_NAME = 'ecommerceDB';
const USERS_STORE = 'users';
const RATINGS_STORE = 'ratings';

const initDB = async () => {
  const db = await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const usersStore = db.createObjectStore(USERS_STORE, { keyPath: 'username' });
        usersStore.createIndex('username', 'username', { unique: true });
      }
      if (!db.objectStoreNames.contains(RATINGS_STORE)) {
        db.createObjectStore(RATINGS_STORE, { keyPath: 'productId' });
      }
    },
  });
  return db;
};

export const getUser = async (username) => {
  const db = await initDB();
  return await db.get(USERS_STORE, username);
};

export const addUser = async (user) => {
  const db = await initDB();
  return await db.add(USERS_STORE, user);
};

export const updateUser = async (user) => {
  const db = await initDB();
  return await db.put(USERS_STORE, user);
};

export const getUserCart = async (username) => {
  const user = await getUser(username);
  return user ? user.cart : [];
};

export const getUserFavorites = async (username) => {
  const user = await getUser(username);
  return user ? user.favorites : [];
};

export const addUserRating = async (productId, rating) => {
  const db = await initDB();
  const productRatings = await db.get(RATINGS_STORE, productId) || { productId, ratings: [] };
  productRatings.ratings.push(rating);
  await db.put(RATINGS_STORE, productRatings);
};

export const getProductRatings = async (productId) => {
  const db = await initDB();
  const productRatings = await db.get(RATINGS_STORE, productId);
  return productRatings ? productRatings.ratings : [];
};
