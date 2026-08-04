import html2pdf from 'html2pdf.js';

export const handleDownloadSvg = (svgString: string) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `design-${Date.now()}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const handleDownloadPng = (svgString: string) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width || 500;
    canvas.height = img.height || 500;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          const pngUrl = URL.createObjectURL(pngBlob);
          const a = document.createElement('a');
          a.href = pngUrl;
          a.download = `design-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(pngUrl);
        }
      }, 'image/png');
    }
    URL.revokeObjectURL(url);
  };
  img.src = url;
};


export const handleDownloadJpg = (svgString: string) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width || 500;
    canvas.height = img.height || 500;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((jpgBlob) => {
        if (jpgBlob) {
          const jpgUrl = URL.createObjectURL(jpgBlob);
          const a = document.createElement('a');
          a.href = jpgUrl;
          a.download = `design-${Date.now()}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(jpgUrl);
        }
      }, 'image/jpeg');
    }
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

export const handleDownloadMedia = (mediaString: string, type: 'audio' | 'video' | 'image' | 'auto' = 'auto', format?: string) => {
  let url = mediaString;
  const match = mediaString.match(/src=["'](.*?)["']/);
  if (match && match[1]) {
    url = match[1];
  }
  
  if (url) {
    let ext = format;
    if (!ext) {
      if (type === 'audio' || mediaString.trim().startsWith('<audio')) ext = 'mp3';
      else if (type === 'video' || mediaString.trim().startsWith('<video')) ext = 'mp4';
      else if (type === 'image' || mediaString.trim().startsWith('<img')) ext = 'png';
      else ext = 'bin';
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = `media-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

export const handleDownloadPdf = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const opt = {
      margin:       1,
      filename:     `prompt-result-${Date.now()}.pdf`,
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2, logging: false },
      jsPDF:        { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };
    
    // Temporarily suppress console.error for oklch parsing errors from html2canvas
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('oklch')) return;
      originalError(...args);
    };

    html2pdf().set(opt).from(element).save().catch((err: any) => {
      // html2canvas does not support oklch and will throw an error when parsing Tailwind v4 CSS
      console.warn("Ignored html2pdf error:", err);
    }).finally(() => {
      console.error = originalError;
    });
  }
};

export const handleSaveTxt = (content: string, filename = "message.md") => {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
