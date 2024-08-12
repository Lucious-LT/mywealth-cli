// @ts-nocheck

import { env } from "~/env.mjs";
import axios from "axios";

class KcAdminClient {
  baseUrl: string;
  authConfig: { clientSecret: string; clientId: string; grantType: string; } | undefined;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  auth(config: { clientSecret: string; clientId: string; grantType: string }) {
    this.authConfig = config;
  }

  async getAccessToken(realm: string): Promise<KcResponse> {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      }
    };
    const authUrl = `${this.baseUrl}/realms/${realm}/protocol/openid-connect/token`;

    //Build the body
    const body = new URLSearchParams();
    body.set("client_secret", this.authConfig.clientSecret);
    body.set("client_id", this.authConfig.clientId);
    body.set("grant_type", this.authConfig.grantType);

    try {
      const response = await axios.post(authUrl, body, options);
      return response.data as KcResponse;
    } catch (error) {
      console.error("Token generation error is ", error); //todo
      return error;
    }
  }
}

class KcResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token?: string;
  token_type: string;
  "not-before-policy": number;
  scope: string;
}

class Token {
  token: string | undefined;
  expires: number | undefined;

  constructor(token: string | undefined, expires: number | undefined) {
    this.token = token;
    this.expires = expires;
  }

  isExpired(): boolean {
    if (this.expires === undefined) {
      return true;
    }
    //Add 60 seconds to the expiry time to ensure we don't run into any issues
    //with the token expiring before we use it
    return this.expires < Date.now() + 60000;
  }
}

export class TokenService {
  private static tokenService: TokenService | null = null;
  private static TOKENS: Map<string, Token> = new Map<string, Token>();
  private static kcAdminClient: KcAdminClient | null = null;

  private constructor() {
    TokenService.kcAdminClient = new KcAdminClient(env.KEYCLOAK_BASE_URL);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  static async getInstance() {
    if (TokenService.tokenService === null) {
      // Wait for the client to initialize
      TokenService.tokenService = new TokenService();
      TokenService.kcAdminClient.auth({
        clientSecret: env.KEYCLOAK_CLIENT_SECRET,
        clientId: env.KEYCLOAK_CLIENT_ID,
        grantType: "client_credentials"
      });
    }
    return TokenService.tokenService;
  }

  async getToken(realm: string): Promise<string | undefined> {
    let token: Token | undefined = TokenService.TOKENS.get(realm);

    if (token === undefined || token.isExpired()) {
      const response = await TokenService.kcAdminClient.getAccessToken(realm);

      //Throw an error if we don't get a token
      if (response === undefined) {
        throw new Error("Unable to get token for realm: " + realm);
      }
      token = new Token(response.access_token, Date.now() + response.expires_in * 1000);
      TokenService.TOKENS.set(realm, token);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`New token for realm {${realm}} expires at {${new Date(Date.now() + response.expires_in * 1000)}}`);

    }
    return token.token;
  }
}


















