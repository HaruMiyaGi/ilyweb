import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import outputs from "@/../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(outputs);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
