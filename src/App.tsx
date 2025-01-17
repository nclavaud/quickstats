import { collect } from 'collect.js';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import {
  countByDayOfWeek as getCountByDayOfWeek,
  countByMonth as getCountByMonth,
  countByQuarter as getCountByQuarter,
  countByWeek as getCountByWeek,
  countByYear as getCountByYear,
  countMaxConsecutiveDaysWithoutData,
} from './counts';
import BarChart from './BarChart';

function App() {
  const [dates, setDates] = useState<Date[]>([]);
  const [inputError, setInputError] = useState<string|null>(null);
  const [updateEnabled, setUpdateEnabled] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const clearTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    setDates([]);
    setInputError(null);
    setUpdateEnabled(false);
  };

  const updateStats = () => {
    const text = textareaRef.current?.value || '';
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
      setUpdateEnabled(false);
    } catch (error) {
      if (error instanceof Error) {
        setInputError(error.message);
      }
    }
  };

  const buildDate = new Date(__BUILD_DATE__);

  const minDate = dates.length ? new Date(collect(dates).min()) : null;
  const maxDate = dates.length ? new Date(collect(dates).max()) : null;
  const maxConsecutiveDaysWithoutData = dates.length ? countMaxConsecutiveDaysWithoutData(dates) : null;

  const countByYear = getCountByYear(dates);
  const countByQuarter = getCountByQuarter(dates);
  const countByMonth = getCountByMonth(dates);
  const countByWeek = getCountByWeek(dates);
  const countByDayOfWeek = getCountByDayOfWeek(dates);

  const maxItemsOptions = {
    'last 50 items': '50',
    'all items': 'all',
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-stretch">
        <header className="bg-pink-700 text-neutral-100 px-8 py-4 flex-none flex flex-row items-baseline place-content-between">
          <h1 className="text-2xl font-bold pe-8">QuickStats</h1>
          <p><a href="https://github.com/nclavaud/quickstats" target="_blank" rel="noopener">GitHub</a></p>
        </header>
        <div className="bg-white flex-grow flex flex-row items-stretch">
          <div className="bg-neutral-100 p-6 flex flex-col">
            <p className="mb-2">Paste a list of dates below:</p>
            <textarea id="dates" ref={textareaRef} onChange={() => setUpdateEnabled(true)} rows={10}></textarea>
            {inputError && (
              <p className="bg-pink-700 text-neutral-100">Error: {inputError}</p>
            )}
            <div className="flex flex-row place-content-between mt-3">
              <button className="px-3 py-2 uppercase bg-pink-100 hover:bg-pink-600 text-neutral-700 hover:text-neutral-100" onClick={clearTextarea}>Clear</button>
              <button className="px-3 py-2 uppercase bg-pink-700 hover:bg-pink-600 text-neutral-100 disabled:bg-neutral-400" disabled={!updateEnabled} onClick={updateStats}>Update</button>
            </div>
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
                  <tr>
                    <th className="border px-2 text-start">Maximum consecutive days without data</th>
                    <td className="border px-2 text-end">{maxConsecutiveDaysWithoutData ?? '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by year</h3>
              {dates.length ? <BarChart data={countByYear} id='chart-count-by-year' maxItemsOptions={maxItemsOptions} maxItemsInitialOption={'50'} /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by quarter</h3>
              {dates.length ? <BarChart data={countByQuarter} id='chart-count-by-quarter' maxItemsOptions={maxItemsOptions} maxItemsInitialOption={'50'} /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by month</h3>
              {dates.length ? <BarChart data={countByMonth} id='chart-count-by-month' maxItemsOptions={maxItemsOptions} maxItemsInitialOption={'50'} /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by week</h3>
              {dates.length ? <BarChart data={countByWeek} id='chart-count-by-week' maxItemsOptions={maxItemsOptions} maxItemsInitialOption={'50'} /> : 'n/a'}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Distribution by day of week</h3>
              {dates.length ? <BarChart data={countByDayOfWeek} id='chart-count-by-dow' maxItemsOptions={{}} /> : 'n/a'}
            </div>
          </div>
        </div>
        <footer className="p-3 text-end">
          <p className="text-sm text-neutral-400">Last update: {format(buildDate, 'yyyy-MM-dd HH:mm')}</p>
        </footer>
      </div>
    </>
  )
}

export default App
