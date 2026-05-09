import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  'index.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2RhNWY5ZGU5MDM4ZjRhZjFhZjdkZGI2MWY4YWZiOGM0EgsSBxC7ncfeggQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjA4OTI4NzUxNTc2NzY1NTkyMg&filename=&opi=89354086',
  'upload.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2MxMTQ4MWRlMDA5ZDQ2ZjhhOWZhOWNjMDQ4YzcyMDgyEgsSBxC7ncfeggQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjA4OTI4NzUxNTc2NzY1NTkyMg&filename=&opi=89354086',
  'dashboard.html': 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzcxYTJmZDI0MDNhZjRiOWNhNjQ4YTZmZDI0ZmI1NjM0EgsSBxC7ncfeggQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjA4OTI4NzUxNTc2NzY1NTkyMg&filename=&opi=89354086'
};

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

for (const [filename, url] of Object.entries(urls)) {
  const filePath = path.join(publicDir, filename);
  const file = fs.createWriteStream(filePath);
  
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filePath);
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}
