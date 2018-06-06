# Solidity TDD Boilerplate

A boilerplate Solidity project structure using Truffle, Mocha and Chai.

Test Driven Development is useful for developing the secure smart contracts.  

[한국어 블로그 포스트](https://medium.com/@jason_kim/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-%EC%8A%A4%EB%A7%88%ED%8A%B8-%EC%BB%A8%ED%8A%B8%EB%9E%99%ED%8A%B8-%EC%99%80-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A3%BC%EB%8F%84-%EA%B0%9C%EB%B0%9C-876bdbcbc953)
## Installation

Download to your project directory.

To install libraries, enter:

```
npm install
```

To compile the Solidity codes, enter:

```
npm run compile 
```

To lint the Javascript codes, enter:

```
npm run lint 
```

To lint the Solidity codes, enter:

```
npm run lint:sol 
```

To lint both Solidity and Javascript codes, enter:

```
npm run lint:all 
```
To run tests, enter:

```
npm run test
```

To run code coverage & evaluate the gas cost of each function:
```
npm run coverage
```

To deploy the codes to the Rospten, make the .env file and enter INFURA_API_KEY, MNEMONIC.
You can get the INFURA_API_KEY in the [Infura](https://infura.io/) and MNEMONIC in the [Mnemonic Code Converter](https://iancoleman.io/bip39/).
```
truffle migrate --network ropsten
```

## Features
* [Truffle](https://github.com/trufflesuite/truffle)
* [Solidity-coverage](https://github.com/sc-forks/solidity-coverage)
* [Eth-gas-reporter](https://github.com/cgewecke/eth-gas-reporter)
* [Openzeppelin-solidity](https://github.com/OpenZeppelin/openzeppelin-solidity)
* [Mocha](https://github.com/mochajs/mocha)
* [Chai](https://github.com/chaijs/chai)
* [Eslint](https://github.com/eslint/eslint)
* [Babel](https://github.com/babel/babel)


## Support

Please [open an issue](https://github.com/jasonkim-tech/solidity-tdd/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/jasonkim-tech/solidity-tdd/compare)