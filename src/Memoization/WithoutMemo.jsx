import { useState } from "react";
import { HeavyList, ReRenderButton, RenderBadge, useFakeItems } from "./RenderCount";

/*
 * Без мемоизации каждый ре-рендер родителя перерисовывает ребёнка,
 * хотя ребёнок получает те же пропсы items.
 * Дёргай кнопку: счётчик родителя растёт, счётчик ребёнка — вместе с ним.
 */
export function WithoutMemo() {
    const [clicks, setClicks] = useState(0);
    const items = useFakeItems();

    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
            <header className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">1. Без мемоизации</h2>
                <RenderBadge label="1.родитель" />
            </header>

            <p className="text-sm text-neutral-700">
                Кликов: {clicks}. Состояние родителя меняется, хотя список даже не о нём.
            </p>

            <ReRenderButton onClick={() => setClicks(clicks + 1)} />
            <PlainHeavyChild items={items} />
        </section>
    );
}

/*
 * Обычный компонент без React.memo — рендерится всякий раз,
 * когда рендерится родитель.
 */
function PlainHeavyChild({ items }) {
    return (
        <div className="mt-3 rounded-xl border border-dashed border-neutral-300 p-3">
            <RenderBadge label="1.ребёнок" />
            <HeavyList items={items} />
        </div>
    );
}
