const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

console.log('🔍 Checking your blog project structure...');
console.log('=' .repeat(50));

// Check if important files exist
const importantFiles = [
  'package.json',
  'next.config.ts',
  'lib/db/schema.ts',
  'app/layout.tsx',
  '.env'
];

importantFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

// Database connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function connectAndLogTables() {
  let client;
  
  try {
    console.log('\n🔌 CONNECTING TO DATABASE...');
    console.log('=' .repeat(50));
    console.log(`Database URL: ${process.env.DATABASE_URL ? 'Set ✅' : 'Missing ❌'}`);
    
    client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL database!');
    
    // Get database info
    const dbInfo = await client.query('SELECT version(), current_database(), current_user;');
    console.log(`\n📊 Database: ${dbInfo.rows[0].current_database}`);
    console.log(`👤 User: ${dbInfo.rows[0].current_user}`);
    console.log(`🔧 Version: ${dbInfo.rows[0].version.split(' ')[0]} ${dbInfo.rows[0].version.split(' ')[1]}`);
    
    // List all tables
    console.log('\n📋 AVAILABLE TABLES:');
    console.log('=' .repeat(50));
    const tablesQuery = `
      SELECT table_name, table_type 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    const tables = await client.query(tablesQuery);
    
    if (tables.rows.length === 0) {
      console.log('❌ No tables found in the database');
      return;
    }
    
    tables.rows.forEach(table => {
      console.log(`📄 ${table.table_name} (${table.table_type})`);
    });
    
    // Check and log content of each main table
    const mainTables = ['users', 'news_articles', 'images'];
    
    for (const tableName of mainTables) {
      console.log(`\n🗃️  TABLE: ${tableName.toUpperCase()}`);
      console.log('=' .repeat(50));
      
      try {
        // Check if table exists
        const tableExists = tables.rows.find(t => t.table_name === tableName);
        if (!tableExists) {
          console.log(`❌ Table '${tableName}' does not exist`);
          continue;
        }
        
        // Get table structure
        const columnsQuery = `
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_name = $1 
          ORDER BY ordinal_position;
        `;
        const columns = await client.query(columnsQuery, [tableName]);
        
        console.log('\n📋 Table Structure:');
        columns.rows.forEach(col => {
          const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
          const defaultVal = col.column_default ? ` DEFAULT ${col.column_default}` : '';
          console.log(`   ${col.column_name}: ${col.data_type.toUpperCase()} ${nullable}${defaultVal}`);
        });
        
        // Get row count
        const countResult = await client.query(`SELECT COUNT(*) FROM ${tableName}`);
        const rowCount = parseInt(countResult.rows[0].count);
        console.log(`\n📊 Total Records: ${rowCount}`);
        
        if (rowCount > 0) {
          // Get sample data (limit to 5 rows)
          const dataQuery = `SELECT * FROM ${tableName} ORDER BY created_at DESC LIMIT 5`;
          const data = await client.query(dataQuery);
          
          console.log('\n📄 Sample Data (Latest 5 records):');
          if (data.rows.length > 0) {
            data.rows.forEach((row, index) => {
              console.log(`\n   Record ${index + 1}:`);
              Object.entries(row).forEach(([key, value]) => {
                let displayValue = value;
                if (typeof value === 'string' && value.length > 100) {
                  displayValue = value.substring(0, 100) + '...';
                }
                console.log(`     ${key}: ${displayValue}`);
              });
            });
          }
        } else {
          console.log('   📭 No records found in this table');
        }
        
      } catch (error) {
        console.log(`❌ Error querying table '${tableName}': ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Make sure your .env file has the correct DATABASE_URL');
    console.log('   2. Check if your database is running');
    console.log('   3. Verify your database credentials');
    console.log('   4. Run: npm install pg dotenv');
  } finally {
    if (client) {
      client.release();
    }
    await pool.end();
  }
}

// Read package.json
console.log('\n📦 PROJECT INFO');
console.log('=' .repeat(50));
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`Project: ${packageJson.name}`);
  console.log(`Description: ${packageJson.description || 'No description'}`);
  console.log(`Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
  console.log(`Dev Dependencies: ${Object.keys(packageJson.devDependencies || {}).length}`);
} catch (error) {
  console.log('❌ Could not read package.json');
}

// Start the database connection and logging
connectAndLogTables().then(() => {
  console.log('\n🎉 Database analysis completed!');
  console.log('\n💡 Your Database Features:');
  console.log('   ✨ Multilingual support (Mongolian + English)');
  console.log('   🔐 User authentication system');
  console.log('   📝 Draft/Published article states');
  console.log('   🖼️  Image management system');
  console.log('   🔗 Proper foreign key relationships');
}).catch(error => {
  console.error('❌ Script failed:', error.message);
});