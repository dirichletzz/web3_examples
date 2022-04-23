const HDWalletProvider = require("@truffle/hdwallet-provider")

module.exports = {
	networks: {
	  development: {
		provider: function() {
			return new HDWalletProvider(process.env.BOT_PRIVATE_KEY, "http://127.0.0.1:8545/");
		},
	    network_id: "*",
	    skipDryRun: true
	  },
	  ropsten: {
	    provider: new HDWalletProvider(process.env.BOT_PRIVATE_KEY, "https://ropsten.infura.io/v3/" + process.env.BOT_INFURA_KEY),
	    network_id: 3,
	    gas: 5000000,
		gasPrice: 5000000000, // 5 Gwei
		skipDryRun: true
	  },
	  kovan: {
	    provider: new HDWalletProvider(process.env.BOT_PRIVATE_KEY, "https://kovan.infura.io/v3/" + process.env.BOT_INFURA_KEY),
	    network_id: 42,
	    gas: 5000000,
		gasPrice: 5000000000, // 5 Gwei
		skipDryRun: true
	  },
	  mainnet: {
	    provider: new HDWalletProvider(process.env.BOT_PRIVATE_KEY, "https://mainnet.infura.io/v3/" + process.env.BOT_INFURA_KEY),
	    network_id: 1,
	    gas: 5000000,
	    gasPrice: 5000000000 // 5 Gwei
	  }
	},
	compilers: {
		solc: {
			version: "^0.6.6",
		},
	},
}
