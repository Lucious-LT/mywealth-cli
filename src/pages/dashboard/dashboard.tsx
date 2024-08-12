import React from "react";
import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { type Props } from "react-apexcharts";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import {
  type ProductTypeBalance,
  type TransactionCount,
} from "~/server/api/models/reports";
import { formatMoney, formatMoneyWithSymbol } from "~/utils/format";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { green, red, amber, blue, indigo, grey } from "@mui/material/colors";

const isSSR = () => typeof window === "undefined";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Dashboard: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { data: report, isLoading: isReportLoading } =
    api.reports.getClientCenterValuationReport.useQuery(
      { clientId: session?.user?.clientId ?? "" },
      { enabled: session?.user.clientId != null, staleTime: 60000 }
    );

  function getTotalValueByProductType(
    productType: string
  ): ProductTypeBalance | undefined {
    return report?.balanceByProductType.find(
      (it) => it.productType === productType
    );
  }

  function getTransactionCount(
    periodType: string
  ): TransactionCount | undefined {
    return report?.transactionCount[periodType];
  }

  const AssetAllocation: React.FC<Props> = ({}) => {
    const series = report?.assetAllocationByCategory["this-week"]?.value ?? [];
    const labels = report?.assetAllocationByCategory["this-week"]?.labels ?? [];
    const options = {
      labels: labels,
      chart: {
        zoom: {
          enabled: false,
        },
      },
    };

    return !isSSR() ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <ReactApexChart
        type="pie"
        options={options}
        series={series}
        height={350}
      />
    ) : (
      <Typography>Loading</Typography>
    );
  };

  if (sessionStatus === "loading" || isReportLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {/* <CircularProgress size={80} /> */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading, please wait...
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader
              title="Deposits"
              titleTypographyProps={{ variant: "h6" }}
              sx={{ textAlign: "center" }}
            />
            <CardContent>
              <Typography variant="h4" color={blue[500]} align="center">
                {formatMoneyWithSymbol(
                  report?.reportCurrency ?? "",
                  getTotalValueByProductType("Deposit")?.totalBalance ?? 0.0
                )}
              </Typography>
              <Typography variant="body1" color={blue[500]} align="center">
                Balance
              </Typography>
              <Typography variant="body2" align="center">
                Net Change:{" "}
                {formatMoney(
                  getTotalValueByProductType("Deposit")?.netChange ?? 0.0
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader
              title="Investments"
              titleTypographyProps={{ variant: "h6" }}
              sx={{ textAlign: "center" }}
            />
            <CardContent>
              <Typography variant="h4" color={green[500]} align="center">
                {formatMoneyWithSymbol(
                  report?.reportCurrency ?? "",
                  getTotalValueByProductType("Investment")?.totalBalance ?? 0.0
                )}
              </Typography>
              <Typography variant="body1" color={green[500]} align="center">
                Value
              </Typography>
              <Typography variant="body2" align="center">
                Net Change:{" "}
                {formatMoney(
                  getTotalValueByProductType("Investment")?.netChange ?? 0.0
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader
              title="Insurance"
              titleTypographyProps={{ variant: "h6" }}
              sx={{ textAlign: "center" }}
            />
            <CardContent>
              <Typography variant="h4" color={amber[500]} align="center">
                {formatMoneyWithSymbol(
                  report?.reportCurrency ?? "",
                  getTotalValueByProductType("Insurance")?.totalBalance ?? 0.0
                )}
              </Typography>
              <Typography variant="body1" color={amber[500]} align="center">
                Coverage
              </Typography>
              <Typography variant="body2" align="center">
                Premium Due:{" "}
                {formatMoney(
                  getTotalValueByProductType("Insurance")?.paymentDue ?? 0.0
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader
              title="Loans"
              titleTypographyProps={{ variant: "h6" }}
              sx={{ textAlign: "center" }}
            />
            <CardContent>
              <Typography variant="h4" color={red[500]} align="center">
                {formatMoneyWithSymbol(
                  report?.reportCurrency ?? "",
                  getTotalValueByProductType("Loan")?.totalBalance ?? 0.0
                )}
              </Typography>
              <Typography variant="body1" color={red[500]} align="center">
                Balance
              </Typography>
              <Typography variant="body2" align="center">
                Payments Due:{" "}
                {formatMoney(
                  getTotalValueByProductType("Loan")?.paymentDue ?? 0.0
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mt: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h6" gutterBottom>
            Assets
          </Typography>
          <Box
            mt={2}
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
          >
            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Asset Allocation
              </Typography>
              <Box mt={2}>
                <AssetAllocation />
              </Box>
            </Box>
            <Box flex={1}>
              <Typography variant="body1" fontWeight="bold">
                Transactions
              </Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: indigo[50],
                      color: indigo[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.inflow}
                    </Typography>
                    <Typography variant="body1">Inflow</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: green[50],
                      color: green[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.outflow}
                    </Typography>
                    <Typography variant="body1">Outflow</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: grey[100],
                      color: grey[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.card}
                    </Typography>
                    <Typography variant="body1">Card</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: grey[100],
                      color: grey[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.transfer}
                    </Typography>
                    <Typography variant="body1">Transfer</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: grey[100],
                      color: grey[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.billPay}
                    </Typography>
                    <Typography variant="body1">Bill Pay</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: grey[100],
                      color: grey[800],
                      textAlign: "center",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h3" fontWeight="bold">
                      {getTransactionCount("this-week")?.teller}
                    </Typography>
                    <Typography variant="body1">Teller</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
