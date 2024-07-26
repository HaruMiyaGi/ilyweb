import "@aws-amplify/ui-react/styles.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import outputs from "@/../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Badge,
  Button,
  Flex,
  Heading,
  Text,
  Theme,
  View,
} from "@aws-amplify/ui-react";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { IconLogout } from "@tabler/icons-react";

Amplify.configure(outputs);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Authenticator>
          {({ signOut, user }) => (
            <main>
              <Flex alignItems={"center"}>
                <View flex={1}>
                  <Heading>ilyweb</Heading>
                </View>

                {!!user?.signInDetails?.loginId?.includes("@") && (
                  <Badge>{user?.signInDetails?.loginId}</Badge>
                )}
                <Button size="small" gap="0.3rem" onClick={signOut}>
                  <IconLogout />
                  Sign Out
                </Button>
              </Flex>

              <Component {...pageProps} />
            </main>
          )}
        </Authenticator>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
