import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import LandingPage from "./LandingPage";
import EmbedPage from "./EmbedPage";
import { ProvideAuth } from "./hooks/UnstoppableAuth";
import {
  apiProvider,
  configureChains,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()],
);
const { connectors } = getDefaultWallets({
  appName: "BuildQuest",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Router = () => {
  return (
    <>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#1a1b1f",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
          })}
          chains={chains}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/embed">
                <ProvideAuth>
                  <EmbedPage />
                </ProvideAuth>
              </Route>
              <Route path="/callback" element={<NavLink replace to="/" />} />
            </Switch>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiProvider>
    </>
  );
};

export default Router;
