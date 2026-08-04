const content = `[Image](/api/ai/image?prompt=Hyper-realistic_fashion)`;
console.log(content.split(/(\/api\/ai\/(?:image|video)\?prompt=[^\s]+)/));
