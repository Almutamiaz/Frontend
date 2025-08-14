import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Get the file path
    const filePath = path.join(process.cwd(), 'public', '.well-known', 'assetlinks.json');
    
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON to ensure it's valid
    const jsonContent = JSON.parse(fileContent);
    
    // Return the JSON response
    return Response.json(jsonContent, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving assetlinks.json:', error);
    return new Response('Error loading assetlinks.json', { status: 500 });
  }
}
