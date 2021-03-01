const { execSync } = require('child_process');
const path = require('path');

execSync('yarn build',  { cwd: path.join(process.cwd(), 'app') }, (err, stdout, stderr) => {
  if(err) {
      console.log(err);
      return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})

console.log('build done')
