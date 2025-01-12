import Dexie from 'dexie';

const db = new Dexie('OfflineVideosDB');
db.version(1).stores({
  videos: '_id,videoFile,thumbnail,title,description,duration,ownerDetails',
});

export default db;
