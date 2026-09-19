import { useMemo, useState } from 'react';
import { DesignPreview } from './components/DesignPreview';
import { IconSelector } from './components/IconSelector';
import { PhraseSelector } from './components/PhraseSelector';
import { ICONS } from './data/icons';
import { PHRASES } from './data/phrases';
import { buildLbrn2Document } from './lib/buildLbrn2Document';
import { downloadTextFile, slugify } from './lib/downloadTextFile';

function App() {
  const [selectedPhrase, setSelectedPhrase] = useState<string>(PHRASES[0]);
  const [selectedIconId, setSelectedIconId] = useState<string>(ICONS[0].id);

  const selectedIcon = useMemo(
    () => ICONS.find((icon) => icon.id === selectedIconId) ?? ICONS[0],
    [selectedIconId],
  );

  function handleGenerate(): void {
    const lbrn2Xml = buildLbrn2Document({ phrase: selectedPhrase, icon: selectedIcon });
    downloadTextFile(`${slugify(selectedPhrase)}.lbrn2`, lbrn2Xml);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Unofficial LB Writer Demo</h1>
          <p className="mt-2 text-slate-600">
            Pick a phrase and an image, then export a LightBurn-ready{' '}
            <code className="rounded bg-slate-200 px-1 py-0.5">.lbrn2</code> file — built with{' '}
            <a
              href="https://www.npmjs.com/package/@richardmcquiston01/unofficial-lb-writer"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-600 hover:underline"
            >
              @richardmcquiston01/unofficial-lb-writer
            </a>
            .
          </p>
        </header>

        <PhraseSelector
          phrases={PHRASES}
          selectedPhrase={selectedPhrase}
          onSelect={setSelectedPhrase}
        />

        <IconSelector icons={ICONS} selectedIconId={selectedIconId} onSelect={setSelectedIconId} />

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-slate-700">3. Preview</h2>
          <DesignPreview phrase={selectedPhrase} icon={selectedIcon} />
        </section>

        <button
          type="button"
          onClick={handleGenerate}
          className="self-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow transition-colors hover:bg-indigo-700"
        >
          Generate &amp; Download .lbrn2
        </button>
      </div>
    </div>
  );
}

export default App;
