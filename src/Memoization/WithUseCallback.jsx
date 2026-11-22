import { memo, useCallback, useState } from "react";
import { ReRenderButton, RenderBadge } from "./RenderCount";

/*
 * Мемоизированный ребёнок нуждается ещё и в мемоизированном обработчике.
 * Каждый ре-рендер родителя создаёт handleSelect заново, ссылка шатается —
 * React.memo видит новый onSelect и всё равно рендерит ребенка.
 */
export function WithUseCallback() {
    "use no memo";

    const [selected, setSelected] = useState(null);
    const [clicks, setClicks] = useState(0);

    // useCallback — «не создавай функцию заново, пока [...] не поменялись».
    // Здесь — пока мы onClick не заслабляем, функция всё тот же объект.
    const handleSelect = useCallback((id) => setSelected(id), []);

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">4. useCallback</h2>
                <RenderBadge label="4.родитель" />
            </header>

            <p className="text-sm text-neutral-700">
                Выбран пункт: {selected ?? "—"}. Кликов в шапку: {clicks}.
            </p>

            <ReRenderButton onClick={() => setClicks(clicks + 1)} />
            <MemoMenu onSelect={handleSelect} />
        </section>
    );
}

const MemoMenu = memo(function MemoMenu({ onSelect }) {
    "use no memo";

    return (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="4.ребёнок" />

            <ul className="mt-2 space-y-1 text-sm">
                {[1, 2, 3, 4, 5].map((id) => (
                    <li key={id}>
                        <button
                            onMouseEnter={() => onSelect(id)}
                            className="w-full rounded-lg border border-neutral-200 px-3 py-1.5 text-left active:scale-95"
                        >
                            Наведи для выбора {id}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
});
