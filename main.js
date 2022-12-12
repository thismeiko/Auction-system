//连接账户
const CONNECT_AUTOMATICALLY = true;
if(CONNECT_AUTOMATICALLY){
    main();
}else{
    connectButton.onclick = main;
}

async function main(){
    icon.style.display="block";
    if(navigator.userAgent.indexOf("safari")!=-1&&
    navigator.userAgent.indexOf("Chrome")==-1){
        icon.style.display="none";
        
    }
}