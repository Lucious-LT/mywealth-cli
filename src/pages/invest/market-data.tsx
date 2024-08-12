import { NextPageWithLayout } from "~/pages/_app";
import InvestLayout from "~/components/layout/page/invest-layout";
import { getMdsUrl, getTenantId, getTenantUrl } from "~/components/util/tenant";
import { api } from "~/utils/api";

const MarketData: NextPageWithLayout = () => {
  //Get the tenant id
  const tenantId =  getTenantId();
  const { data: apiKey } = api.invest.getMdsApiKeyForTenant.useQuery(tenantId);
  const mdsUrl = getMdsUrl();
  const requestUrl = `${mdsUrl}/?apiKey=${apiKey ? apiKey : ""}`;
  return (
    <>
      {/*<h1>MarketData</h1> TODO */}
      <iframe
        scrolling="yes"
        src={requestUrl}
        frameBorder="0"
        style={{ width: "100%", height: "1000px", border: "0px solid #BAB9B9" }}
      ></iframe>
    </>
  );
};
MarketData.getLayout = function(page: any) {
  return <InvestLayout>{page}</InvestLayout>;
};
export default MarketData;
