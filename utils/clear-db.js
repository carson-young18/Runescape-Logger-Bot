import db from './db.js';

const confirm = process.argv.includes('--yes');

if(!confirm){
  console.log('Cancelled. Run with "--yes" to confirm.')
  process.exit(0);
}

db.prepare('DELETE FROM activity_logs').run();
db.prepare("DELETE FROM sqlite_sequence WHERE name = 'activity_logs'").run();

console.log(`Database cleared.`);