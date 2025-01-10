import { collect } from 'collect.js';
import { lightFormat} from 'date-fns';
import { useState } from 'react';

function App() {
  const [dates, setDates] = useState<string[]>([]);

  const onDatesUpdated = (text: string) => {
    const dates = text.split(/\r?\n/).map(d => new Date(d));
    setDates(dates);
  };

  const countByMonth = collect(dates)
    .countBy(date => lightFormat(date, 'yyyyMM'))
    .sortKeys()
    .all();

  return (
    <>
      <div className="container mx-auto bg-neutral-100">
        <div className="min-h-screen bg-neutral-100">
          <header className="bg-pink-700 text-neutral-100 p-4">
            <h1 className="text-2xl font-bold">QuickStats</h1>
          </header>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Paste a list of dates below:</p>
              <textarea id="dates" onChange={e => onDatesUpdated(e.target.value)} rows={20}></textarea>
            </div>
            <div>
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
              <h3>By month</h3>
              <table>
                <tbody>
                  {Object.entries(countByMonth).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
