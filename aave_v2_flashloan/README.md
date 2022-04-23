### 写在前面
这个flashloan demo来源于[aave官方github](https://github.com/aave/flashloan-box)，做了适当修改才成功跑通。

### 开发环境准备
按照项目根目录下的README.md安装cli工具  
进入目录
```
cd aave_v2_flashloan
```
安装package.json依赖  
```
yarn  
```
设置环境变量  
```
export BOT_MNEMONIC="测试账号的助记词"  
export BOT_PRIVATE_KEY="测试账号的私钥"  
export BOT_ACCOUNT="测试账号地址"  
export BOT_INFURA_KEY="你的infura主网key"  
```
Fork主网到本地节点
```
ganache-cli --fork https://mainnet.infura.io/v3/$BOT_INFURA_KEY -i 1 -m "$BOT_MNEMONIC"
```
* 保持监听状态，监听地址127.0.0.1:8545已配置到truffle-config.js中。  
* 看输出可以发现，BOT_ACCOUNT在本地节点有1000ETH。  

### 使用truffle进行闪电贷  
进入truffle console：
```
truffle console --network development
```
部署合约：  
```
migrate --reset
let f = await Flashloan.deployed()
```
第一次查询合约ETH余额：  
```
await web3.eth.getBalance(f.address)
```
向合约转账，使得没有盈利逻辑也能完成闪电贷：  
```
f.send(web3.utils.toWei("1", "ether")).then(function(result) {});
```
第二次查询合约ETH余额：  
```
await web3.eth.getBalance(f.address)
```
进行闪电贷，从aave借出ETH：  
```
await f.flashloan("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")
```
第三次查询合约ETH余额：  
```
await web3.eth.getBalance(f.address)
```
闪电贷结束。  
