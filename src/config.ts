import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error(
    "Missing environment variables, please copy the placeholder env file and fill it out with your credentials"
  );
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
};
