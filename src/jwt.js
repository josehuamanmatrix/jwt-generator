import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { readFile } from "fs/promises";

export function generateJWT(now, signaturePrivateKey, tokenTTL) {
  const id = uuid();
  const exp = new Date(now.getTime() + tokenTTL * 1000);

  const tokenPayload = {
    id,
    sub: uuid(),
    exp: Math.floor(exp.getTime() / 1000),
    iat: Math.floor(now.getTime() / 1000),
    nbf: Math.floor(now.getTime() / 1000),
    iss: "io.pe",
    aud: "urn:io.pe:user:authentication",
    scope:
      "login complete_challenge signup confirm_signup forgot_password confirm_forgot_password resend_confirmation_code",
  };
  return {
    id,
    token: jwt.sign(tokenPayload, signaturePrivateKey, {
      algorithm: "RS256",
    }),
    expireAt: exp,
  };
}

export async function readConfig() {
  const content = await readFile("config/config.json");
  return JSON.parse(content);
}

export async function generateJWTFromConfig() {
  const config = await readConfig();

  const now = new Date();
  const signaturePrivateKey = Buffer.from(config.signaturePrivateKey, "base64").toString();

  const token = generateJWT(now, signaturePrivateKey, config.tokenTTL);
  console.log(token);
}
