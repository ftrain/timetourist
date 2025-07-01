#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

function convertCSVToJS() {
    try {
        // Read the CSV file
        const csvContent = fs.readFileSync('youtubes.csv', 'utf8');
        const lines = csvContent.trim().split('\n');
        
        // Parse CSV data
        const events = {};
        
        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = parseCSVLine(line);
            if (values.length >= 4) {
                const year = parseInt(values[0]);
                const event = values[1];
                const title = values[2];
                const url = values[3];
                
                if (!events[year]) events[year] = [];
                events[year].push({
                    text: event,
                    link: `https://en.wikipedia.org/wiki/${encodeURIComponent(event.replace(/\s+/g, '_'))}`,
                    media: {
                        youtube: { url, title }
                    }
                });
            }
        }
        
        // Generate JavaScript file
        const jsContent = `// Auto-generated from youtubes.csv - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}

window.historicalEvents = ${JSON.stringify(events, null, 2)};
`;
        
        // Write the JavaScript file
        fs.writeFileSync('data/events.js', jsContent);
        
        console.log('✅ Successfully converted CSV to JavaScript!');
        console.log(`📊 Generated ${Object.keys(events).length} years with events`);
        console.log(`📁 Output: data/events.js`);
        
    } catch (error) {
        console.error('❌ Error converting CSV to JavaScript:', error.message);
        process.exit(1);
    }
}

// Create data directory if it doesn't exist
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

convertCSVToJS();