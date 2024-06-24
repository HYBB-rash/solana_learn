import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
const publicKey = new PublicKey("9Rxa2GA7cTT8o1PxTEK5rp17TASSWnL8VYgFmF5TkfZ1");
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);


