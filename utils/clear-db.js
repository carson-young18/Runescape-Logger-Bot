import db from './db.js';

const confirm = process.argv.includes('--yes');

if(!confirm){
  console.log('Cancelled. Run with "--yes" to confirm.')
  process.exit(0);
}

const deleted = db.prepare('DELETE FROM activity_logs').run();

console.log(`Deleted ${deleted.changes} rows from db`);