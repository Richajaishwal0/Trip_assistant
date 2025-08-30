#!/usr/bin/env node
/**
 * Security Audit Script for Trip Assistant
 * This script checks for potential hardcoded secrets and insecure configurations
 * 
 * Usage: node security-audit.js
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Patterns that might indicate hardcoded secrets
const PATTERNS = [
  {
    regex: /(password|pwd|passwd|secret|token|api_?key)\s*=\s*['"`][^'"`]{8,}['"`]/i,
    description: 'Potential hardcoded credential',
    severity: 'HIGH'
  },
  {
    regex: /mongo(?:db)?(?:uri|url)\s*=\s*['"`]mongodb(?:\+srv)?:\/\/[^'"`]+['"`]/i,
    description: 'Hardcoded MongoDB connection string',
    severity: 'HIGH'
  },
  {
    regex: /jwt\.sign\(\s*[^,]+,\s*['"`][^'"`]{10,}['"`]/,
    description: 'Hardcoded JWT secret',
    severity: 'CRITICAL'
  },
  {
    regex: /Authorization\s*:\s*['"`](?:Bearer|Basic|Apikey)\s+[A-Za-z0-9+/=_-]{8,}['"`]/i,
    description: 'Hardcoded authorization header',
    severity: 'HIGH'
  }
];

// Directories and files to exclude
const EXCLUDE = [
  'node_modules',
  '.git',
  'package-lock.json',
  'yarn.lock',
  '.env',
  '.env.example',
  '.env.sample'
];

// File extensions to check
const INCLUDE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.yml', '.yaml', '.env.'];

// Get command line args for path
const args = process.argv.slice(2);
const rootPath = args[0] || '../';

console.log(chalk.blue('🔍 Running security audit for potential hardcoded secrets...'));
console.log(chalk.blue(`📂 Scanning directory: ${path.resolve(rootPath)}\n`));

const issues = [];

function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(rootPath, filePath);
      
      // Skip excluded directories and files
      if (EXCLUDE.some(excluded => relativePath.includes(excluded))) {
        continue;
      }
      
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        scanDirectory(filePath);
      } else if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (INCLUDE_EXTENSIONS.includes(ext) || file.includes('.env')) {
          scanFile(filePath);
        }
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error scanning directory ${dir}: ${error.message}`));
  }
}

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = path.relative(rootPath, filePath);
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      for (const pattern of PATTERNS) {
        if (pattern.regex.test(line)) {
          issues.push({
            file: relativePath,
            line: i + 1,
            content: line.trim(),
            description: pattern.description,
            severity: pattern.severity
          });
        }
      }
    }
  } catch (error) {
    console.error(chalk.red(`Error scanning file ${filePath}: ${error.message}`));
  }
}

// Start scanning
scanDirectory(rootPath);

// Sort issues by severity
issues.sort((a, b) => {
  const severityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
  return severityOrder[a.severity] - severityOrder[b.severity];
});

// Print issues
if (issues.length > 0) {
  console.log(chalk.yellow(`Found ${issues.length} potential security issues:\n`));
  
  issues.forEach((issue, index) => {
    const severityColor = issue.severity === 'CRITICAL' ? 'red' : 
                          issue.severity === 'HIGH' ? 'yellow' : 'blue';
                          
    console.log(chalk[severityColor](`[${issue.severity}] ${issue.description}`));
    console.log(chalk.white(`File: ${issue.file}:${issue.line}`));
    console.log(chalk.gray(`Code: ${issue.content}`));
    console.log(''); // Empty line for readability
  });
  
  console.log(chalk.yellow('\n⚠️  RECOMMENDATION:'));
  console.log(chalk.white('  1. Replace hardcoded secrets with environment variables'));
  console.log(chalk.white('  2. Use process.env.VARIABLE_NAME to access sensitive data'));
  console.log(chalk.white('  3. Add fallbacks that fail securely, not with default credentials'));
  console.log(chalk.white('  4. Make sure .env is in your .gitignore file'));
} else {
  console.log(chalk.green('✅ No potential security issues found!'));
}

console.log(chalk.blue('\n🔍 Security audit completed'));
