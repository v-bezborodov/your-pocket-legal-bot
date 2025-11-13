// src/utils/sendSafeReply.ts
export async function sendSafeReply(ctx, text: string, options = {}) {
    const MAX_LENGTH = 4000; // Telegram limit is 4096, leave some margin
  
    // Split text by paragraphs if possible, otherwise fallback to chunking
    const paragraphs = text.split(/\n{2,}/g);
    let buffer = "";
  
    for (const para of paragraphs) {
      if ((buffer + "\n\n" + para).length > MAX_LENGTH) {
        if (buffer) await ctx.reply(buffer, options);
        buffer = para;
      } else {
        buffer += (buffer ? "\n\n" : "") + para;
      }
    }
  
    if (buffer) await ctx.reply(buffer, options);
  }
  