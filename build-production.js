const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'raper-2.webflow');
const buildDir = path.join(__dirname, 'dist');

console.log('🔨 Building RAPER for production...');

// Create dist directory
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Copy file with optimizations
      let content = fs.readFileSync(srcPath);
      
      // Optimize HTML files
      if (entry.name.endsWith('.html')) {
        content = content.toString()
          .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
          .replace(/\s+/g, ' ') // Minimize whitespace
          .replace(/> </g, '><'); // Remove space between tags
      }
      
      // Optimize CSS files
      if (entry.name.endsWith('.css')) {
        content = content.toString()
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, ' ') // Minimize whitespace
          .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
          .replace(/\s*{\s*/g, '{')
          .replace(/;\s*/g, ';');
      }
      
      fs.writeFileSync(destPath, content);
    }
  }
}

// Copy and optimize files
copyDir(sourceDir, buildDir);

// Generate build info
const buildInfo = {
  buildTime: new Date().toISOString(),
  version: require('./package.json').version,
  environment: 'production'
};

fs.writeFileSync(path.join(buildDir, 'build-info.json'), JSON.stringify(buildInfo, null, 2));

console.log('✅ Build completed successfully!');
console.log(`📁 Build output: ${buildDir}`);
console.log(`🕒 Build time: ${buildInfo.buildTime}`);
console.log('\n🚀 Ready for production deployment!'); 