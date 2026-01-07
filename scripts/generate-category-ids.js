const fs = require('fs');
const path = require('path');

// Read the psalms metadata
const metadataPath = path.join(__dirname, '../lib/psalms-metadata.json');
const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

// Group psalms by emotional_state and sort by number
const groupedByState = {};
metadata.psalms.forEach(psalm => {
  const state = psalm.emotional_state;
  if (!groupedByState[state]) {
    groupedByState[state] = [];
  }
  groupedByState[state].push(psalm);
});

// Sort each group by psalm number and assign category_number and category_id
Object.keys(groupedByState).forEach(state => {
  groupedByState[state].sort((a, b) => a.number - b.number);
  groupedByState[state].forEach((psalm, index) => {
    psalm.category_number = index + 1;
    psalm.category_id = `${state}-${index + 1}`;
  });
});

// Write back to file
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

console.log('✓ Generated category IDs for all psalms');
console.log('\nSample results:');
console.log('- wisdom-1 = Psalm', groupedByState.wisdom[0].number);
console.log('- wisdom-2 = Psalm', groupedByState.wisdom[1].number);
console.log('- confidence-1 = Psalm', groupedByState.confidence[0].number);
console.log('- grief-1 = Psalm', groupedByState.grief[0].number);
