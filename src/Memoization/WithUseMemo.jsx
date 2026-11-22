import { memo, useMemo, useState } from "react";
import { HeavyList, RenderBadge, useFakeItems, ReRenderButton } from "./RenderCount";

/*
 * useMemo — «пересчитай, только если [...] изменилось».
 * Без него каждый ре-рендер родителя строит новый массив заново,
 * хотя строка поиска не менялась.
 */
export function WithUseMemo() {
    "use no memo";

    const [query, setQuery] = useState("");
    const [clicks, setClicks] = useState(0);
    const items = useFakeItems();

    // Мемоизируем результат фильтрации: пока items и query те же,
    // в shown лежит та же ссылка, что и в прошлый рендер.
    const shown = useMemo(() => items.filter((item) => item.label.includes(query)), [items, query]);

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">3. useMemo</h2>
                <RenderBadge label="3.родитель" />
            </header>

            <p className="text-sm text-neutral-700">
                Кликов: {clicks}. Кнопка рендерит родителя мимо запроса. Фильтр при этом
                не пересчитывается, показанный список не подмигивает счётчиком.
            </p>

            <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="строка поиска"
                className="w-full rounded-lg border border-neutral-300 p-2 text-sm"
            />

            <ReRenderButton onClick={() => setClicks(clicks + 1)}>Рендерим родителя мимо</ReRenderButton>

            <MemoFilteredList shown={shown} />
        </section>
    );
}

/*
 * Мемоизированный ребёнок проверяет ссылку на shown.
 * Пока useMemo возвращает тот же массив — счётчик ребёнка стоит.
 * Меняем query — shown новый, ребёнок перерисовывается.
 */
const MemoFilteredList = memo(function MemoFilteredList({ shown }) {
    "use no memo";

    return (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="3.ребёнок" />
            <HeavyList items={shown} />
        </div>
    );
});
