import { collect } from 'collect.js';
import { lightFormat} from 'date-fns';
import { useState } from 'react';
import Chart from 'react-apexcharts';

function App() {
  const [dates, setDates] = useState<Date[]>([]);
  const [inputError, setInputError] = useState<string|null>(null);

  const onDatesUpdated = (text: string) => {
    setInputError(null);
    try {
      const dates = text.split(/\r?\n/)
        .map(dateAsString => {
          const date = new Date(dateAsString)

          if (isNaN(date.getTime())) {
            throw new Error(`Invalid date: "${dateAsString}"`);
          }

          return date;
        });
      setDates(dates);
    } catch (error) {
      if (error instanceof Error) {
        setInputError(error.message);
      }
    }
  };

  const countByYear = collect(dates)
    .countBy((date: Date) => lightFormat(date, 'yyyy'))
    .sortKeys()
    .all();

  const countByMonth = collect(dates)
    .countBy((date: Date) => lightFormat(date, 'yyyy-MM'))
    .sortKeys()
    .all();

  return (
    <>
      <div className="container mx-auto bg-neutral-100">
        <div className="min-h-screen bg-neutral-100">
          <header className="bg-pink-700 text-neutral-100 p-4 mb-4">
            <h1 className="text-2xl font-bold">QuickStats</h1>
          </header>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Paste a list of dates below:</p>
              {inputError && (
                <p className="bg-pink-700 text-neutral-100">Error: {inputError}</p>
              )}
              <textarea id="dates" onChange={e => onDatesUpdated(e.target.value)} rows={20}></textarea>
            </div>
            <div>
              <div className="mb-4">
                <table className="table-fixed">
                  <tbody>
                    <tr>
                      <th className="border px-2">Count</th>
                      <td className="border px-2">{dates.length}</td>
                    </tr>
                    <tr>
                      <th className="border px-2">Min</th>
                      <td className="border px-2">{dates.length ? new Date(collect(dates).min()).toLocaleDateString() : '-'}</td>
                    </tr>
                    <tr>
                      <th className="border px-2">Max</th>
                      <td className="border px-2">{dates.length ? new Date(collect(dates).max()).toLocaleDateString() : '-'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mb-4">
                <h3>By year</h3>
                {dates.length ? (
                  <Chart
                    options={{
                      chart: {
                        animations: {
                          enabled: false,
                        },
                        id: 'chart-count-by-year',
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      xaxis: {
                        categories: Object.keys(countByYear),
                      },
                    }}
                    series={[
                      {
                        name: 'count',
                        data: Object.values(countByYear) as number[],
                      },
                    ]}
                    type="bar"
                    width="500"
                  />
                ) : 'n/a'}
              </div>
              <div className="mb-4">
                <h3>By month</h3>
                {dates.length ? (
                  <Chart
                    options={{
                      chart: {
                        animations: {
                          enabled: false,
                        },
                        id: 'chart-count-by-month',
                      },
                      dataLabels: {
                        enabled: false,
                      },
                      xaxis: {
                        categories: Object.keys(countByMonth),
                      },
                    }}
                    series={[
                      {
                        name: 'count',
                        data: Object.values(countByMonth) as number[],
                      },
                    ]}
                    type="bar"
                    width="500"
                  />
                ) : 'n/a'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
