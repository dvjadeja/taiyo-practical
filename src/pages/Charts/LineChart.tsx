import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";

interface ChartData {
  series: {
    name: string;
    data: { x: number; y: number }[];
  }[];
  options: object;
}

interface ApiResponse {
  cases: number;
  deaths: number;
  recovered: number;
  updated: number;
}

const LineChart = () => {
  const fetchChartData = async (): Promise<ChartData> => {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    const data: ApiResponse = await response.json();

    // Format the data for the chart
    const formattedData: ChartData = {
      series: [
        {
          name: "Cases",
          data: [{ x: data.updated, y: data.cases }],
        },
        {
          name: "Deaths",
          data: [{ x: data.updated, y: data.deaths }],
        },
        {
          name: "Recovered",
          data: [{ x: data.updated, y: data.recovered }],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: true,
          },
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          title: {
            text: "Count",
          },
        },
      },
    };

    return formattedData;
  };

  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery<ChartData>({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>COVID-19 Statistics</h1>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
};
export default LineChart;
