console.log('Hello from Node.js!');
console.log('Current directory:', process.cwd());
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);

// Simple function example
function greet(name) {
  return `Hello, ${name}! Welcome to Node.js`;
}

console.log(greet('Developer'));

// Working with your project
console.log('\n--- Project Info ---');
console.log('This is your blog project directory');
console.log('You have a Next.js app with multilingual support!');