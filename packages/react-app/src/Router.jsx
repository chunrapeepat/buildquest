import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import LandingPage from "./LandingPage";
import EmbedPage from "./EmbedPage";
import { ProvideAuth } from "./hooks/UnstoppableAuth";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";
import CreateBountyPage from "./CreateBountyPage";
import { NETWORKS } from "./constants";

const { chains, provider } = configureChains(
  [NETWORKS.BOBA_TESTNET, chain.mainnet],
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
              <Route path="/create">
                <CreateBountyPage />
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
