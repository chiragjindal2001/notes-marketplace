import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logDir, 'api-requests.log');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export async function POST(request: Request) {
  try {
    const logData = await request.json();
    
    // Format the log entry
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${JSON.stringify(logData)}\n`;
    
    // Append to log file
    fs.appendFileSync(logFile, logEntry, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing to log file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log request' },
      { status: 500 }
    );
  }
}
