import { onRequestPost as __api_log_visit_ts_onRequestPost } from "/Users/joyce.wang/dev/wedding-website/functions/api/log-visit.ts"

export const routes = [
    {
      routePath: "/api/log-visit",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_log_visit_ts_onRequestPost],
    },
  ]