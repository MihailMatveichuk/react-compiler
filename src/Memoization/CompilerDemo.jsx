import { useState } from "react";
import { HeavyList, ReRenderButton, RenderBadge, useFakeItems } from "./RenderCount";

/*
 * React Compiler (плагин oxc-transform-react или babel-plugin-react-compiler)
 * сам расставляет useCallback / useMemo / React.memo там, где разберётся.
 * Код остаётся «наивным» — компилируется в умный.
 *
 * Если авто-мемоизация не нужна, директива 'use no memo' отключает её
 * для конкретного компонента.
 */
export function CompilerDemo() {
    "use no memo";
    
    const [clicks, setClicks] = useState(0);
    const items = useFakeItems();

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">5. React Compiler</h2>
                <RenderBadge label="5.родитель" />
            </header>

            <p className="text-sm text-neutral-700">
                Кликов в шапку: {clicks}. Нижние два списка написаны одинаково, но у левого
                мемоизацию делает Compiler, а правый мы просим не трогать.
            </p>

            <ReRenderButton onClick={() => setClicks((value) => value + 1)} />

            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <CompilerList items={items} />
                <NoMemoList items={items} />
            </div>

            <p className="mt-3 text-xs text-neutral-500">
                Всё это включается одной строкой в vite.config.js:{" "}
                <code className="rounded bg-neutral-200 px-1">react({'{'}
                compiler: true
                {'}'})</code>
                . Если верхний счётчик застыл, а нижний растёт — так и должно быть.
            </p>
        </section>
    );
}

/*
 * Компонент наивный: ни useMemo, ни useCallback, ни React.memo.
 * При включенном Compiler мемоизацию проставит он.
 */
function CompilerList({ items }) {
    return (
        <div className="rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="5.ребёнок с Compiler" />
            <HeavyList items={items} />
        </div>
    );
}

/*
 * 'use no memo' — директива Compiler'а: этот компонент не оптимизируй.
 * Пригодится, когда мемоизация мешает: отладка, легаси-код, уже
 * оптимизированный руками.
 */
function NoMemoList({ items }) {
    "use no memo";

    return (
        <div className="rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="5.ребёнок без Compiler" />
            <HeavyList items={items} />
        </div>
    );
}
