//连接账户

const CONNECT_AUTOMATICALLY = true;
if(CONNECT_AUTOMATICALLY) {
  main();
} else {
  connectButton.onclick = main;
}


async function main() {
  loadingIconConnect.style.display = "block";
  if(navigator.userAgent.indexOf("Safari") != -1
  && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Browser is Web3 compatible");


  if(!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("MetaMask is installed");


  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
        window.location.reload();
    }
  });

  
  try {
    await provider.send("eth_requestAccounts", []);
  } catch(error) {
    const errorMessage = "Cannot connect to wallet. There might be an issue with another browser extenstion. Try disabling some browser extensions (other than MetaMask), then attempt to reconnect."
    console.error(errorMessage, error);
    alert(errorMessage);
    loadingIconConnect.style.display = "none";
    return;
  }  
  console.log("Wallet connected");


  const chainId = await provider.getNetwork();
  if(chainId.chainId != 5) {
    alert("Please switch to the Goerli Test Network in MetaMask. The page will refresh automatically after switching.");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Connected to Goerli");


  connectionStatus.textContent = "🟢 Connected";
  connectButton.setAttribute("disabled", "true");

  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);
  const connectedWalletAddress = await signer.getAddress();
  connectedWallet.textContent = connectedWalletAddress;
  console.log(`Connected Wallet: ${connectedWalletAddress}`);


//   async function displayBalance() {
//     let balance = await provider.getBalance(connectedWalletAddress);
//     balance = ethers.utils.formatEther(balance);
//     goerliBalance.textContent = balance;
//     if(balance == 0) {
//       goerliBalance.innerHTML+=` (Goerli ETH needed to interact with this contract. Visit <a href="https://goerlifaucet.com/" target="_blank">goerlifaucet.com</a> to get free Goerli ETH.)`;
//     }
//   }

//   displayBalance();
//   loadingIconConnect.style.display = "none";


  

  //----------------------------------------------------//
  //-----------ADD YOUR CODE BELOW THIS LINE------------//
  //----------------------------------------------------//


//   displayCurrentNumberFromContract();
//   contract.on("NumIncreasedEvent", (message, newNumber) => {
//     console.log(message);
//     currentNumberDisplay.textContent = newNumber;
//     displayBalance();
//   });
  submit.onclick = gRight;

  async function gRight() {
    console.log("Initiating transaction...");
    // loadingIconIncreaseNum.style.display = "block";
    try {
      await contractWithSigner.gainRight();
    } catch(error) {
    //   loadingIconIncreaseNum.style.display = "none";
      console.error("User rejected the transaction");
      console.error(error);
    }
    // loadingIconIncreaseNum.style.display = "none";
  }
  async function displayCurrentNumberFromContract() {
    balance.textContent = await contract.getNum();
  }
}