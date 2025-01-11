import Chart from 'react-apexcharts';

interface BarChartProps {
  id: string;
  data: { [key: string]: number };
};

function BarChart({ id, data }: BarChartProps) {
  return (
    <Chart
      options={{
        chart: {
          animations: {
            enabled: false,
          },
          id,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: Object.keys(data),
        },
      }}
      series={[
        {
          name: 'count',
          data: Object.values(data) as number[],
        },
      ]}
      type="bar"
      width="500"
    />
  );
}

export default BarChart;
