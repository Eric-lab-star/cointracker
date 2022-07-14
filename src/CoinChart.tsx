import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTheme,
} from "victory";
import { ChartData, OCHLC } from "./cointInterface";

import styled from "styled-components";
import { getChartData } from "./api";

const ChartBox = styled.div`
  background-color: ${(props) => props.theme.accent};
  min-height: 15rem;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
`;

export default function CoinChart() {
  const param = useParams();
  const sym = param.id as string | undefined;
  const { data: chartData } = useQuery<OCHLC[]>(["coin", `${sym} chart`], () =>
    getChartData(sym)
  );
  const data = chartData?.map((v, i) => {
    return {
      x: new Date(v.time_open),
      open: v.open,
      close: v.close,
      high: v.high,
      low: v.low,
    };
  });

  console.log(chartData);

  return (
    <ChartBox>
      {chartData ? (
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={data}
          />
        </VictoryChart>
      ) : (
        "Loading"
      )}
    </ChartBox>
  );
}
