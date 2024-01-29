import crypto from "crypto";
import { readFile } from "fs/promises";

export async function readKeys() {
  const value = await readFile("config/config.json");
  const data = JSON.parse(value);
  return {
    publicKey: Buffer.from(data.rsaPublicKey, "base64").toString(),
    privateKey: Buffer.from(data.rsaPrivateKey, "base64").toString(),
  };
}

export function encrypt(value, publicKey) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(value),
  );
  return encryptedData.toString("base64");
}

export function decrypt(value, privateKey) {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(value, "base64"),
  );
  return decryptedData.toString();
}
