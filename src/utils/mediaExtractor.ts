import { ChatSession } from '../types';

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  sourceSessionId: string;
  messageId: string;
  timestamp: string;
}

export function extractMediaFromSessions(sessions: ChatSession[]): MediaAsset[] {
  const mediaList: MediaAsset[] = [];
  
  for (const session of sessions) {
    for (const msg of session.messages) {
      if (msg.role !== 'assistant') continue;
      
      const content = msg.content;
      
      // Extract images: ![alt](url)
      const imgRegex = /!\[.*?\]\((.*?)\)/g;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        mediaList.push({
          id: `${msg.id}-${mediaList.length}`,
          type: 'image',
          url: match[1],
          sourceSessionId: session.id,
          messageId: msg.id,
          timestamp: msg.timestamp || new Date().toISOString()
        });
      }
      
      // Extract HTML images: <img src="url" .../>
      const htmlImgRegex = /<img[^>]+src=["'](.*?)["']/g;
      while ((match = htmlImgRegex.exec(content)) !== null) {
        mediaList.push({
          id: `${msg.id}-${mediaList.length}`,
          type: 'image',
          url: match[1],
          sourceSessionId: session.id,
          messageId: msg.id,
          timestamp: msg.timestamp || new Date().toISOString()
        });
      }

      // Extract HTML videos: <video ... src="url" .../>
      const htmlVideoRegex = /<video[^>]+src=["'](.*?)["']/g;
      while ((match = htmlVideoRegex.exec(content)) !== null) {
        mediaList.push({
          id: `${msg.id}-${mediaList.length}`,
          type: 'video',
          url: match[1],
          sourceSessionId: session.id,
          messageId: msg.id,
          timestamp: msg.timestamp || new Date().toISOString()
        });
      }
      
      // Extract HTML audio: <audio ... src="url" .../>
      const htmlAudioRegex = /<audio[^>]+src=["'](.*?)["']/g;
      while ((match = htmlAudioRegex.exec(content)) !== null) {
        mediaList.push({
          id: `${msg.id}-${mediaList.length}`,
          type: 'audio',
          url: match[1],
          sourceSessionId: session.id,
          messageId: msg.id,
          timestamp: msg.timestamp || new Date().toISOString()
        });
      }
    }
  }
  
  // deduplicate by URL
  const uniqueMedia = new Map<string, MediaAsset>();
  for (const item of mediaList) {
    if (!uniqueMedia.has(item.url)) {
      uniqueMedia.set(item.url, item);
    }
  }
  
  return Array.from(uniqueMedia.values()).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
