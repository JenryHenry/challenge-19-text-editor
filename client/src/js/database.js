import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('text objectStore already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('jate database upgraded');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.put({ id: 1, content: content });
  const result = await request;
  console.log('Text saved to the database', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('text', 'readonly');
  const store = tx.objectStore('text');
  const request = store.get(1);
  const result = await request;
  console.log('Text retrieved from database', result);
  return result.content;
};

initdb();
