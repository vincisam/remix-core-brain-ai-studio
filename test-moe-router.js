import fs from 'fs';

async function main() {
    const response = await fetch('http://localhost:3000/api/ai/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: "Write a poem about the sea." }],
            model: "gemma-4-26b-a4b-it"
        })
    });
    console.log(response.status, response.statusText);
    const text = await response.text();
    console.log(text);
}
main();
