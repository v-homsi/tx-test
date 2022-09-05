import { ethers, providers, Wallet } from "ethers";

interface Params {
  rpcUrl: string;
  privKey: string;
}

async function sendTx(params: Params) {
  const provider = new providers.JsonRpcProvider(params.rpcUrl);
  const signer = new Wallet(params.privKey, provider);

  try {
    const txResponse = await signer.sendTransaction({
      to: "0x6d9126C06C85f6da87F7DC72b702E11d513E4688",
      value: ethers.utils.parseEther("1.0"),
    });

    console.log("received response");

    const receipt = await txResponse.wait();

    console.log("received receipt ", receipt);
  } catch (e) {
    console.log("error sending transaction. Exiting!", {
      error: e,
    });
    throw e;
  }
}

async function main() {
  const rpcUrl = process.env["RPC_URL"] || "http://localhost:8545";
  const privKey = process.env["PRIV_KEY"] || "";

  console.log(rpcUrl, privKey);
  await sendTx({
    rpcUrl: rpcUrl,
    privKey: privKey,
  });
}

main();
