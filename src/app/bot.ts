import { Telegraf, session } from 'telegraf';
import { showMainMenu, handleMenuSelection } from './handlers/menuHandlers.ts';
import { handleBackOrRestart } from './handlers/flowHandler.ts';
import { handleInput } from './handlers/inputHandler.ts';
import { askAI } from '../domain/services/askAi.ts';
import { sendSafeReply } from '../utils/sendSafeReply.ts';

const bot = new Telegraf(process.env.BOT_TOKEN);

// 🧠 Add session middleware — allows saving user state (ctx.session)
bot.use(session());

bot.use((ctx, next) => {
  if (!ctx.session) ctx.session = {}; // make sure session object exists
  return next();
});

// /start command
bot.start(async (ctx) => {
  await ctx.reply('👋 Вітаю! Я ваш юридичний помічник.');
  await showMainMenu(ctx);
});

// handle any text messages
bot.on('text', async (ctx) => {
  try {
    
  const text = ctx.message.text;

  if (['🔙 Назад'].includes(text)) {
    ctx.session.waitingForAdvice = false;
    await handleBackOrRestart(ctx);
  }


  if (ctx.session.waitingForAdvice) {
    const result = await handleInput(text)

    if (!result.isRelevant) {
      await ctx.reply(`❌ Ваш запит відхилено: ${result.reason}`);
      await showMainMenu(ctx);
      return;
    }
    const answer = await askAI(text);

    if (!answer) {
      await ctx.reply(
        "На жаль, зараз бот не може відповісти. Спробуйте пізніше або зверніться до адміністратора."
      );
      return;
    }

    await sendSafeReply(ctx, answer, { parse_mode: 'Markdown' });


    return;
  }

  await handleMenuSelection(ctx);
} catch(err) {
  console.error("❌ Unhandled error while processing message:", err);
    await ctx.reply(
      "❌ Сталася непередбачена помилка. Спробуйте пізніше або зверніться до адміністратора."
    );

  }
});

export default bot;
