import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import "dotenv/config";
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

const suppliedToPublicKey = process.argv[2] || null;


if (!suppliedToPublicKey) {
    console.log('Please provide a public key');
    process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');
console.log(`suppliedToPublicKey: ${suppliedToPublicKey}`);
const toPubkey = new PublicKey(suppliedToPublicKey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`
);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5 * LAMPORTS_PER_SOL;

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature: ${signature}`);
