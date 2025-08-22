"use client";

import { ReactNode } from "react";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

// Create a system (can customize if needed)
const system = createSystem(defaultConfig, {});

export default function ChakraProviders({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
