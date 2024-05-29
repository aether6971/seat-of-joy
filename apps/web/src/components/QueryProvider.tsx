"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Provider = ({ children }: any) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 0,
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
