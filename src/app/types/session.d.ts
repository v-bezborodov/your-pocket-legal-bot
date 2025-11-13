import 'telegraf';

export interface BotSession {
  waitingForAdvice?: boolean;
}

declare module 'telegraf' {
  interface Context {
    session: BotSession;
  }
}

// Also augment NarrowedContext so it works with text messages
declare module 'telegraf/typings/core/types/typegram' {
  interface NarrowedContext<C, Update> {
    session: BotSession;
  }
}
