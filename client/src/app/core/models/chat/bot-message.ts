export interface BotMessage {
  id: string;
  lang: string;
  result: Result;
  sessionId: string;
  status: Status;
  timestamp: string;
}

declare interface Status {
  code: number;
  errorType: string;
}

declare interface Result {
  action: string;
  actionIncomplete: boolean;
  contexts: Context[];
  fulfillment: {
    speech: string;
    messages: { type: number; speech: string }[];
  };
  metadata: Metadata;
  parameters: any;
  resolvedQuery: string;
  score: number;
  source: string;
}

declare interface Context {
  name: string;
  parameters: any;
  lifespan: number;
}

declare interface Metadata {
  intentId: string;
  intentName: string;
  isFallbackIntent: string | boolean;
  webhookForSlotFillingUsed: string | boolean;
  webhookUsed: string | boolean;
}
