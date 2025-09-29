const dotenv = require('dotenv');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const envFile = path.join(__dirname, 'src', '.env');
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

const ngServe = spawn('ng', ['serve'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

ngServe.on('close', (code) => {
  console.log(`ng serve exited with code ${code}`);
});

ngServe.on('error', (err) => {
  console.error('Failed to start ng serve process.', err);
});