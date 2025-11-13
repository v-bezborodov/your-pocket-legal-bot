import { Markup } from "telegraf";
import { MAIN_MENU } from "../../domain/constants/menuOptions.js";
import { handleChat, handleFlow } from "./flowHandler.ts";

export async function showMainMenu(ctx) {
  await ctx.reply(
    "Виберіть ситуацію, яка вас цікавить 👇",
    Markup.keyboard(MAIN_MENU).resize()
  );
}

export async function handleMenuSelection(ctx) {
  const choice = ctx.message.text;

  switch (choice) {
    case '🚓 Зупинили на вулиці':
      await handleFlow(ctx, "street");
      break;
    case '🚗 Зупинили в автомобілі':
      await handleFlow(ctx, "car");
      break;
    case '🏠 Обшук в домі':
      await handleFlow(ctx, "home");
      break;
    case '⚖️ Інше':
      await handleFlow(ctx, "other");
      break;
    case 'Мені не допомогло. Спитати поради в бота':
      await handleChat(ctx, "chat");
      ctx.session.waitingForAdvice = true;
      break;
    default:
      if (!ctx.session.waitingForAdvice) {
        await ctx.reply('Будь ласка, оберіть одну з опцій нижче 👇');
      }
      
  }
}
