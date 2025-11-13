import "dotenv/config";
import bot from "./bot.ts";

(async () => {
  console.log("🚀 Starting bot...");
  await bot.launch();
  console.log("✅ Bot is running!");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
