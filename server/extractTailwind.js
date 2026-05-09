import fs from 'fs';

const html = fs.readFileSync('./public/upload.html', 'utf-8');
const configMatch = html.match(/tailwind\.config = ({[\s\S]*?})\s*<\/script>/);

if (configMatch && configMatch[1]) {
  const configContent = configMatch[1];
  
  const jsContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  ...${configContent}
};`;

  fs.writeFileSync('./tailwind.config.js', jsContent);
  console.log('tailwind.config.js extracted');
  
  // Create input.css
  fs.writeFileSync('./input.css', '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  console.log('input.css created');
} else {
  console.error('Tailwind config not found');
}
