// 加载网页时，自动连接web3
const CONNECT_AUTOMATICALLY = true;
if(CONNECT_AUTOMATICALLY){
    main();
}
else{
    connectButton.onclick = main;
}

async function main(){
    // 检查兼容性
    if(navigator.userAgent.indexOf("safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1){
        alert("No web3 provider detected, please install MetaMask Wallet");
        return;
    }
    console.log('compatible');

    //metaMask是否下载
    if(!window.ethereum){
        alert("No web3 provider detected.");
        return;
    }
    console.log("installed");

    // 连接web3 provider
    const provider= new ethers.providers.Web3Provider(window.ethereum,"any");
    provider.on("network",(newNetwork,oldNetwork)=>{
        if(oldNetwork){
            window.location.reload();
        }
    });

    // 请求连接当前钱包
    try{
        await provider.send("eth_requestAccount",[]);
    }
    catch(error){
        const errorMessage="Cannot connect to wallet";
        console.log(errorMessage,error);
        alert(errorMessage);
        return;
    }
    console.log("Wallet Connected");

    // 检查用户是否登入正确的网络
    const chainId = await provider.getNetwork();
    if(chainId.chainId!=5){
        alert("Please switch to the Goerli test network in metamask. The page will refresh.");
        return;
    }
    console.log("Connect to Goerli");


}
