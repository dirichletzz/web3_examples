### 写在前面
这个flashloan demo来源于aave官方github(https://github.com/aave/flashloan-box)

### 如何在开发环境测试
1. 按照项目根目录下的README.md安装cli工具，然后进入aave_v2_flashloan目录

2. 安装package.json依赖
yarn

1. 设置环境变量
export BOT_MNEMONIC="测试账号的助记词"
export BOT_PRIVATE_KEY="测试账号的私钥"
export BOT_ACCOUNT="测试账号地址"
export BOT_INFURA_KEY="你的infura主网key"

2. Fork主网到本地节点
ganache-cli --fork https://mainnet.infura.io/v3/$BOT_INFURA_KEY -i 1 -m "$BOT_MNEMONIC"
* 执行命令并保持监听状态，监听地址127.0.0.1:8545需要配置到truffle-config.js中。
* 看输出可以发现，BOT_ACCOUNT在本地节点有1000ETH。

3. 部署闪电贷合约
truffle console --network development
部署合约：
> migrate --reset
> let f = await Flashloan.deployed()
第一次查询合约ETH余额：
> await web3.eth.getBalance(f.address)
向合约转账，使得没有盈利逻辑也能完成闪电贷：
> f.send(web3.utils.toWei("1", "ether")).then(function(result) {});
第二次查询合约ETH余额：
> await web3.eth.getBalance(f.address)
进行闪电贷，从aave接触ETH：
> await f.flashloan("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE")
第三次查询合约ETH余额：
> await web3.eth.getBalance(f.address)
闪电贷结束。
