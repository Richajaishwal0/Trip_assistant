#!/usr/bin/env node
/**
 * Environment Variable Setup Script
 * This script helps set up environment variables for the Trip Assistant application
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');
const chalk = require('chalk');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define required environment variables
const requiredVars = [
  {
    name: 'MONGO_DB_URI',
    description: 'MongoDB Connection String',
    default: 'mongodb://localhost:27017/tripPlannerDB',
    prompt: 'Enter your MongoDB connection string'
  },
  {
    name: 'JWT_SECRET',
    description: 'JWT Secret Key (min 32 chars)',
    generate: () => crypto.randomBytes(32).toString('hex'),
    prompt: 'Enter a secure JWT secret or press Enter to generate one'
  },
  {
    name: 'PORT',
    description: 'Server Port',
    default: '5000',
    prompt: 'Enter the server port'
  }
];

// Optional variables
const optionalVars = [
  {
    name: 'PEXELS_API_KEY',
    description: 'Pexels API Key for place images',
    prompt: 'Enter your Pexels API key (optional)'
  },
  {
    name: 'NODE_ENV',
    description: 'Environment (development, staging, production)',
    default: 'development',
    prompt: 'Enter the environment'
  },
  {
    name: 'CORS_ORIGIN',
    description: 'CORS allowed origin',
    default: 'http://localhost:5173',
    prompt: 'Enter the CORS allowed origin (frontend URL)'
  }
];

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');
let currentEnv = {};

// Load existing .env if it exists
if (fs.existsSync(envPath)) {
  console.log(chalk.yellow('Existing .env file found. We will update it.'));
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      const match = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
      if (match) {
        currentEnv[match[1]] = match[2];
      }
    });
  } catch (error) {
    console.error(chalk.red(`Error reading .env file: ${error.message}`));
  }
} else {
  console.log(chalk.green('No .env file found. We will create one.'));
}

// Load example env for reference
let exampleEnv = '';
if (fs.existsSync(envExamplePath)) {
  try {
    exampleEnv = fs.readFileSync(envExamplePath, 'utf8');
  } catch (error) {
    console.error(chalk.red(`Error reading .env.example: ${error.message}`));
  }
}

console.log(chalk.blue('\n🔧 Trip Assistant Environment Setup\n'));
console.log(chalk.white('This script will help you set up your environment variables.'));
console.log(chalk.white('Press Enter to use default or existing values.\n'));

// Prompt for each variable
const promptForVariables = async () => {
  const newEnv = {};
  
  // Process required variables first
  for (const variable of requiredVars) {
    const currentValue = currentEnv[variable.name];
    const defaultValue = currentValue || variable.default || (variable.generate ? 'auto-generated' : '');
    
    await new Promise(resolve => {
      rl.question(chalk.green(`${variable.name} (${variable.description}) [${defaultValue}]: `), answer => {
        let value = answer.trim();
        
        if (!value) {
          if (currentValue) {
            value = currentValue;
            console.log(chalk.gray(`Using existing value for ${variable.name}`));
          } else if (variable.generate) {
            value = variable.generate();
            console.log(chalk.gray(`Generated value for ${variable.name}: ${value.substring(0, 5)}...`));
          } else if (variable.default) {
            value = variable.default;
            console.log(chalk.gray(`Using default value for ${variable.name}: ${value}`));
          }
        }
        
        newEnv[variable.name] = value;
        resolve();
      });
    });
  }
  
  console.log(chalk.blue('\nOptional variables (press Enter to skip):\n'));
  
  // Process optional variables
  for (const variable of optionalVars) {
    const currentValue = currentEnv[variable.name];
    const defaultValue = currentValue || variable.default || '';
    
    await new Promise(resolve => {
      rl.question(chalk.yellow(`${variable.name} (${variable.description}) [${defaultValue}]: `), answer => {
        let value = answer.trim();
        
        if (!value) {
          if (currentValue) {
            value = currentValue;
            console.log(chalk.gray(`Using existing value for ${variable.name}`));
          } else if (variable.default) {
            value = variable.default;
            console.log(chalk.gray(`Using default value for ${variable.name}: ${value}`));
          }
        }
        
        if (value) {
          newEnv[variable.name] = value;
        }
        
        resolve();
      });
    });
  }
  
  return newEnv;
};

// Write the .env file
const writeEnvFile = (env) => {
  try {
    // Start with comments and base structure from .env.example if available
    let envContent = exampleEnv 
      ? exampleEnv.replace(/^([A-Za-z0-9_]+=).*$/gm, (match, p1) => {
          const varName = p1.substring(0, p1.length - 1);
          return env[varName] ? `${p1}${env[varName]}` : match;
        })
      : '';
    
    // If we don't have an example, build the file from scratch
    if (!envContent) {
      envContent = '# Trip Assistant Environment Variables\n# Generated on ' + new Date().toISOString() + '\n\n';
      
      Object.entries(env).forEach(([key, value]) => {
        envContent += `${key}=${value}\n`;
      });
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log(chalk.green(`\n✅ .env file has been ${fs.existsSync(envPath) ? 'updated' : 'created'} successfully!`));
  } catch (error) {
    console.error(chalk.red(`Error writing .env file: ${error.message}`));
  }
};

// Run the script
promptForVariables()
  .then(newEnv => {
    writeEnvFile(newEnv);
    rl.close();
  })
  .catch(error => {
    console.error(chalk.red(`An error occurred: ${error.message}`));
    rl.close();
  });
