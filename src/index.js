import { readKeys, encrypt } from "./password.js";

async function main() {
  const keys = await readKeys();

  const password = process.argv[2];
  console.log("Password:", password);

  const encrypted = encrypt(password, keys.publicKey);
  console.log("Encrypted password:", encrypted);
}

await main();
