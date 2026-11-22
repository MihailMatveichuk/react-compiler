import { CompilerDemo } from "./CompilerDemo";
import { WithMemo } from "./WithMemo";
import { WithoutMemo } from "./WithoutMemo";
import { WithUseCallback } from "./WithUseCallback";
import { WithUseMemo } from "./WithUseMemo";

const DEMOS = [
    { Demo: WithoutMemo },
    { Demo: WithMemo },
    { Demo: WithUseMemo },
    { Demo: WithUseCallback },
    { Demo: CompilerDemo },
];

export default function Memoization() {
    return (
        <div className="flex min-h-screen flex-col gap-8 bg-neutral-100 p-6">
            <h2 className="text-xl font-semibold">Мемоизация в React</h2>

            <p className="max-w-3xl text-sm text-neutral-700">
                У каждого демо своя карточка. Дёргай кнопку «Рендерим родителя» и смотри на
                счётчики: если счётчик ребёнка застыл, пока счётчик родителя прибавляет —
                мемоизация сработала. Если оба растут вместе — нет.
            </p>

            <div className="flex flex-col gap-6">
                {DEMOS.map(({ Demo }, index) => (
                    <section key={index} className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-sm">
                        <Demo />
                    </section>
                ))}
            </div>
        </div>
    );
}
