import React from 'react';
import './App.css';

import { StkrSdk } from './index';
import { LOCAL_CONFIG } from './config';
import { BalanceReply, MicroPoolReply, ProviderReply } from './gateway';

interface Props {}

interface State {
  sdk?: StkrSdk | null;
  allMicroPools?: MicroPoolReply[] | null;
  myMicroPools?: MicroPoolReply[] | null;
  providers?: ProviderReply[] | null;
  myEth?: BalanceReply | null;
  myAnkr?: BalanceReply | null;
  downloadLink?: string | null;
}

//{
//   ankrContract: '0xb5Bb4478C8c5e6173214a033Bdbe1467258D7c62',
//   micropoolContract: '0xa70aB3d531a0580c881eD37F1d8a24eaED6A1692',
//   providerContract: '0xd65bd6Bc26e5569874B0B92a861db8caC4C22C7a',
//   stakingContract: '0x9cf775A22688616609F00570E9B025aB2865cB4a',
//   governanceContract: '0x3FBe933E01448F67B0ED5D6af3477fEBB452A753',
//   AETHContract: '0x025433da1D9100A34E83F7FDc6A2B662dEf69514'
// }

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      // noinspection JSIgnoredPromiseFromCall
      this.loadData();
    }, 10000);

    (async () => {
      const stkr = StkrSdk.factoryDefault(LOCAL_CONFIG);
      this.setState((prev, props) => ({
        sdk: stkr,
      }));
    })();
  }

  async loadData() {
    if (!this?.state?.sdk) return;
    if (this.state.sdk?.isConnected()) {
      const providers = await this.state.sdk?.getApiGateway().getProviders();
      const allMicroPools = await this.state.sdk
        ?.getApiGateway()
        .getMicroPools();
      const myMicroPools = await this.state.sdk
        ?.getApiGateway()
        .getMicroPoolsByProvider(
          this.state.sdk.getKeyProvider().currentAccount(),
        );
      const myEth = await this.state.sdk
        ?.getApiGateway()
        .getEtheremBalance(this.state.sdk?.getKeyProvider().currentAccount());
      const myAnkr = await this.state.sdk
        ?.getApiGateway()
        .getAnkrBalance(this.state.sdk?.getKeyProvider().currentAccount());
      this.setState((prev, props) => ({
        providers,
        allMicroPools,
        myMicroPools,
        myEth,
        myAnkr,
      }));
    } else {
      const providers = await this.state.sdk?.getApiGateway().getProviders();
      const allMicroPools = await this.state.sdk
        ?.getApiGateway()
        .getMicroPools();
      this.setState((prev, props) => ({
        providers,
        allMicroPools,
      }));
    }
  }

  renderBody() {
    const sdk = this.state.sdk;
    if (!sdk) throw new Error('sdk not initialized');
    return (
      <div>
        <pre>Address: {sdk.getKeyProvider().currentAccount()}</pre>
        <pre>Chain: {sdk.getKeyProvider().currentChain()}</pre>
        <pre>Network: {sdk.getKeyProvider().currentNetwork()}</pre>
        <pre>ETH: {this.state.myEth?.available}</pre>
        <pre>ANKR: {this.state.myAnkr?.available}</pre>
        <br />
        <button
          onClick={async () => {
            const name = prompt('Micro pool name');
            if (!name) return;
            const txHash = await sdk?.createMicroPool(name);
            alert(`TxHash: ${txHash}`);
          }}
        >
          CREATE MICRO POOL
        </button>
        {/*<br/>*/}
        {/*<button onClick={async () => {*/}
        {/*  const poolIndex = prompt('Pool Index')*/}
        {/*  if (!poolIndex) return*/}
        {/*  const poolDetails = await sdk?.getMicroPool(poolIndex)*/}
        {/*  alert(`TxHash: ${JSON.stringify(poolDetails)}`)*/}
        {/*}}>*/}
        {/*  GET MICRO POOL*/}
        {/*</button>*/}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {this.state?.sdk && this.state?.sdk?.isConnected()
              ? this.renderBody()
              : null}
            <hr />
          </div>
          <button
            onClick={async () => {
              await this.state?.sdk?.connectMetaMask();
              await this.loadData();
            }}
          >
            CONNECT
          </button>
          <br />
          <button
            onClick={async () => {
              await this.state?.sdk?.authorize();
              await this.loadData();
            }}
          >
            LOGIN
          </button>
          <br />
          <button
            onClick={async () => {
              const id = prompt('Sidecar ID: ');
              const downloadLink = this.state?.sdk?.getSidecarDownloadLink(
                `${id}`,
              );
              this.setState((prev, props) => ({
                downloadLink,
              }));
            }}
          >
            DOWNLOAD SIDECAR
          </button>
          <a href={`${this?.state?.downloadLink}`}>
            {this?.state?.downloadLink}
          </a>
          <hr />
          <div>
            <h5>All providers</h5>
            <hr />
            <table style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>status</th>
                  <th>created</th>
                  <th>banned</th>
                </tr>
              </thead>
              <tbody>
                {this?.state?.providers?.map(provider => {
                  return (
                    <tr>
                      <td>{provider.id}</td>
                      <td>{provider.status}</td>
                      <td>{provider.created}</td>
                      <td>{provider.banned}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <hr />
          </div>
          <div>
            <h5>All micropools</h5>
            <hr />
            <table style={{ fontSize: '12px' }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>status</th>
                  <th>name</th>
                  <th>is mine?</th>
                </tr>
              </thead>
              <tbody>
                {this?.state?.allMicroPools?.map(microPool => {
                  return (
                    <tr>
                      <td>{microPool.id}</td>
                      <td>{microPool.status}</td>
                      <td>{microPool.name}</td>
                      <td>
                        {microPool.provider ===
                        this.state?.sdk?.currentAccount()
                          ? 'YES'
                          : 'NO'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <hr />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
