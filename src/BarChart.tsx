import { collect } from 'collect.js';
import { useState } from 'react';
import Chart from 'react-apexcharts';

type MaxItemsOptions = { [key: string]: string };

interface BarChartProps {
  id: string;
  data: { [key: string]: number };
  maxItemsOptions: MaxItemsOptions;
  maxItemsInitialOption?: keyof MaxItemsOptions & string;
};

function BarChart({ id, data, maxItemsOptions, maxItemsInitialOption = 'all' }: BarChartProps) {
  const [maxItemsOption, setMaxItemsOption] = useState<string>(maxItemsInitialOption);

  const maxItems = (maxItemsOption === 'all' || maxItemsOption == null) ? Infinity : parseInt(maxItemsOption);
  const items = collect(data).take(-maxItems).all();

  return (
    <>
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
            categories: Object.keys(items),
          },
        }}
        series={[
          {
            name: 'count',
            data: Object.values(items) as number[],
          },
        ]}
        type="bar"
        width="500"
      />
      {Object.values(maxItemsOptions).length ? (
        <div className="text-end text-neutral-500 text-sm">
          Show{' '}
          <select value={maxItemsOption} onChange={e => setMaxItemsOption(e.target.value)} className="px-2 py-1">
            {Object.entries(maxItemsOptions).map(([key, value]) => (
              <option key={value} value={value}>{key}</option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
}

export default BarChart;
