/* eslint-disable react-refresh/only-export-components -- копилка хуков и маленьких компонентов для всех демо урока */
import { useRef, useState } from "react";

/*
 * Инструменты демо про мемоизацию: счётчик реальных рендеров, кнопка
 * «Рендерим родителя» и «тяжёлый» список, чтобы перерисовка была заметной.
 *
 * ВНИМАНИЕ ПРО useRenderCount. Мы намеренно пишем в ref.current прямо в теле
 * рендера. Для учебного счётчика это единственное место, где такой код
 * оправдан: он не влияет на вывод JSX, а только на number, который мы рисуем.
 * В продуктовом коде так не делают — правило react-hooks/refs это запрещает,
 * поэтому здесь правило глушим точечно и осознанно.
 */
export function useRenderCount() {
    const ref = useRef(0);
    // eslint-disable-next-line react-hooks/refs
    ref.current += 1; // переживает ре-рендер и не вызывает новый цикл
    // eslint-disable-next-line react-hooks/refs
    return ref.current;
}

export function RenderBadge({ label = "рендеры" }) {
    return (
        <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
            {label}: {useRenderCount()}
        </span>
    );
}

/*
 * Кнопка «тык», которая добавляет рендеры родителю.
 * Нужна, чтобы легко дёргать состояние, не связанное с ребёнком.
 */
export function ReRenderButton({ onClick, children = "Рендерим родителя" }) {
    return (
        <button
            onClick={onClick}
            className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white active:scale-95"
        >
            {children}
        </button>
    );
}

/*
 * «Тяжёлый» ребёнок: 200 строк, чтобы перерисовка ощущалась как перерисовка,
 * а не как осечка логики.
 */
export function HeavyList({ items }) {
    return (
        <ul className="mt-2 max-h-40 overflow-auto rounded-lg border border-neutral-200 p-2 text-sm">
            {items.map((item) => (
                <li key={item.id} className="py-0.5">
                    {item.label}
                </li>
            ))}
        </ul>
    );
}

/*
 * Стабильный массив строк: создаётся один раз на компонент, чтобы
 * демо про React.memo увидело «ссылка всё та же».
 */
export function useFakeItems() {
    const [items] = useState(() =>
        Array.from({ length: 200 }, (_, index) => ({
            id: index,
            label: `Строка ${index + 1} из общей папки`,
        })),
    );

    return items;
}
