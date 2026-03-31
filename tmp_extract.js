const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const dir = 'd:/Learning/SEP2/assignment_submission_system_fe/src/renderer/src';
const files = getAllFiles(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const translations = {
  common: {},
  dashboard: {},
  settings: {}
};

function deepSet(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

const regex = /t\(\s*['"]([^'"]+)['"]\s*,\s*\{[^}]*defaultValue:\s*[`'"]([^`'"]+)[`'"][^}]*\}\)/g;
const regex2 = /t\(\s*['"]([^'"]+)['"]\s*\)/g; // for ones without defaultValue?

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    let key = match[1];
    let val = match[2];
    
    let ns = 'common';
    if (key.includes(':')) {
      [ns, key] = key.split(':');
    }
    
    if (translations[ns]) {
      deepSet(translations[ns], key, val);
    }
  }
});

fs.writeFileSync('d:/Learning/SEP2/assignment_submission_system_fe/src/locales/en-US/common.json', JSON.stringify(translations.common, null, 2));
fs.writeFileSync('d:/Learning/SEP2/assignment_submission_system_fe/src/locales/en-US/dashboard.json', JSON.stringify(translations.dashboard, null, 2));
fs.writeFileSync('d:/Learning/SEP2/assignment_submission_system_fe/src/locales/en-US/settings.json', JSON.stringify(translations.settings, null, 2));

console.log("Extraction complete.");
