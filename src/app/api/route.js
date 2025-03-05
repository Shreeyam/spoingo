// src/app/api/upload/route.js
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        // Extract form data (including the file) from the request.
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response(JSON.stringify({ message: "No file uploaded" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Determine a unique filename.
        const filename = file.name || "uploaded-file";
        const extension = path.extname(filename);
        const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${extension}`;

        // Define the upload directory (public/uploads)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        fs.mkdirSync(uploadDir, { recursive: true });

        // Read the file as an ArrayBuffer and then convert it to a Node.js Buffer.
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save the file.
        const filePath = path.join(uploadDir, uniqueFilename);
        fs.writeFileSync(filePath, buffer);

        const fileUrl = `/uploads/${uniqueFilename}`;
        return new Response(JSON.stringify({ url: fileUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({ message: "Upload failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
