import { collect } from 'collect.js';
import { useState } from 'react';
import {
  countByDayOfWeek as getCountByDayOfWeek,
  countByMonth as getCountByMonth,
  countByYear as getCountByYear,
} from './counts';
import BarChart from './BarChart';

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

  const minDate = dates.length ? new Date(collect(dates).min()) : null;
  const maxDate = dates.length ? new Date(collect(dates).max()) : null;

  const countByYear = getCountByYear(dates);
  const countByMonth = getCountByMonth(dates);
  const countByDayOfWeek = getCountByDayOfWeek(dates);

  return (
    <>
      <div className="min-h-screen flex flex-col items-stretch">
        <header className="bg-pink-700 text-neutral-100 px-8 py-4 flex-none flex flex-row items-baseline place-content-between">
          <h1 className="text-2xl font-bold pe-8">QuickStats</h1>
          <p><a href="https://github.com/nclavaud/quickstats" target="_blank" rel="noopener">GitHub</a></p>
        </header>
        <div className="bg-white flex-grow flex flex-row items-stretch">
          <div className="bg-neutral-100 p-6">
            <p className="mb-2">Paste a list of dates below:</p>
            {inputError && (
              <p className="bg-pink-700 text-neutral-100">Error: {inputError}</p>
            )}
            <textarea id="dates" onChange={e => onDatesUpdated(e.target.value)} rows={20}></textarea>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <th className="border px-2 text-start">Count</th>
                    <td className="border px-2 text-end">{dates.length}</td>
                  </tr>
                  <tr>
                    <th className="border px-2 text-start">Min</th>
                    <td className="border px-2 text-end">{minDate ? minDate.toLocaleDateString() : '-'}</td>
                  </tr>
                  <tr>
                    <th className="border px-2 text-start">Max</th>
                    <td className="border px-2 text-end">{maxDate ? maxDate.toLocaleDateString() : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by year</h3>
              {dates.length ? <BarChart data={countByYear} id='chart-count-by-year' /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by month</h3>
              {dates.length ? <BarChart data={countByMonth} id='chart-count-by-month' /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by day of week</h3>
              {dates.length ? <BarChart data={countByDayOfWeek} id='chart-count-by-dow' /> : 'n/a'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
