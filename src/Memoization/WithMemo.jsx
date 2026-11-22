import { memo, useState } from "react";
import { HeavyList, ReRenderButton, RenderBadge, useFakeItems } from "./RenderCount";

/*
 * React.memo сравнивает пропсы до и после рендера.
 * Если поверхностно всё равно — берёт старое дерево из кеша,
 * и счётчик рендера ребёнка перестаёт расти.
 */
export function WithMemo() {
    "use no memo";

    const [clicks, setClicks] = useState(0);
    const items = useFakeItems();

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">2. React.memo</h2>
                <RenderBadge label="2.родитель" />
            </header>

            <p className="text-sm text-neutral-700">
                Кликов {clicks}. Счётчик родителя растёт, а счётчик ребёнка — нет: items
                передаётся тем же объектом, React.memo видит равные пропсы.
            </p>

            <ReRenderButton onClick={() => setClicks(clicks + 1)} />
            <MemoHeavyChild items={items} />
        </section>
    );
}

function HeavyChild({ items }) {
    "use no memo";

    return (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="2.ребёнок" />
            <HeavyList items={items} />
        </div>
    );
}

/*
 * memo — обёртка над компонентом, а не хук.
 * Вся остальная часть файла была бы такой же и без неё.
 */

const MemoHeavyChild = memo(HeavyChild);