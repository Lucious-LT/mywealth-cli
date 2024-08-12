const DEFAULT_REALM = "mywealth";
const DEFAULT_PORTAL_URL = "http://localhost:3000";
const DEFAULT_MDS_URL = "http://localhost:9024";

export function getTenantId(): string {
  //Hack to allow the SSR to compile
  if (typeof window === "undefined") return DEFAULT_REALM;

  const url = window.location.href;
  const host = url.split("/")[2];
  if (host && host.startsWith("localhost")) return DEFAULT_REALM;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  else { // @ts-ignore
    return host.split(".")[0];
  }
}

export function getTenantUrl(): string {
  //Hack to allow the SSR to compile
  if (typeof window === "undefined") return DEFAULT_PORTAL_URL;

  const url = window.location.origin;
  const host = url.split("/")[2];
  if (host && host.startsWith("localhost")) return DEFAULT_PORTAL_URL;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  else { // @ts-ignore
    return url;
  }
}

export function getMdsUrl(): string {
  //Hack to allow the SSR to compile
  if (typeof window === "undefined") return DEFAULT_MDS_URL;

  const url = window.location.origin;
  const host = url.split("/")[2];
  if (host && host.startsWith("localhost")) return DEFAULT_MDS_URL;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  else { // @ts-ignore
    const env = host.split(".").slice(2).join(".");
    return `https://${getTenantId()}.mds.${env}`;
  }
}

export function getWsUrl(): string {
  //Hack to allow the SSR to compile
  if (typeof window === "undefined") return DEFAULT_MDS_URL + "/ws";
  const url = window.location.origin;
  const host = url.split("/")[2];
  if (host && host.startsWith("localhost")) return DEFAULT_MDS_URL + "/ws";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  else { // @ts-ignore
    const env = host.split(".").slice(2).join(".");
    return `wss://${getTenantId()}.mds.${env}/ws`;
  }
}

