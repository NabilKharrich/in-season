import "swiper/css";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { products } from "./data/products.ts";
import { months } from "./data/months.ts";
import Product from "./components/Product.tsx";
import Swiper from "swiper";
import { FreeMode } from "swiper/modules";

function App() {
    const sliderRef = useRef<HTMLElement>(null);
    const [fruit, setFruit] = useState(() => [...products.frutta]);
    const [veggies, setVeggies] = useState(() => [...products.verdura]);
    const [selectedMonth, setSelectedMonth] = useState(
        () =>
            months.find(
                (month) =>
                    month.nome ===
                    new Date().toLocaleString("default", { month: "long" })
            ) || {
                nome: new Date().toLocaleString("default", { month: "long" }),
                short: new Date()
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase(),
                numero: parseInt(
                    new Date().toLocaleString("default", { month: "numeric" })
                ),
            }
    );

    useEffect(() => {
        setFruit(
            products.frutta.filter((item) => {
                const seasons = [
                    ...item.piena_stagione,
                    ...item.primizie,
                    ...item.tardivi,
                ];

                return seasons.includes(selectedMonth.short);
            })
        );
        setVeggies(
            products.verdura.filter((item) => {
                const seasons = [
                    ...item.piena_stagione,
                    ...item.primizie,
                    ...item.tardivi,
                ];

                return seasons.includes(selectedMonth.short);
            })
        );
    }, [selectedMonth]);

    const handleInit = useCallback((swiper: Swiper) => {
        swiper.slideTo(selectedMonth.numero - 1);
    }, []);

    useEffect(() => {
        if (!sliderRef.current) return;

        const swiper = new Swiper(sliderRef.current, {
            modules: [FreeMode],
            slidesPerView: "auto",
            spaceBetween: 10,
            freeMode: { enabled: true },
            on: {
                init: handleInit,
            },
        });

        return () => {
            swiper.destroy(true);
        };
    }, [handleInit]);

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    return (
        // <div className="bg-[#342E2D]">
        <div className="bg-[#3D405B]">
            <div className="grid gap-4 p-6">
                <div className="grid">
                    <span className="text-4xl text-[#F6F4EA]">
                        Welcome
                        <br /> back, Nabil
                    </span>
                    <span className="text-sm text-neutral-500">
                        {selectedMonth.nome}
                    </span>
                </div>
                <hr className="border-t border-neutral-300" />
                <div className="flex gap-2 -mt-1 overflow-auto">
                    <div className="swiper" ref={sliderRef}>
                        <div className="swiper-wrapper">
                            {months.map((month) => (
                                <div
                                    className="swiper-slide !w-fit"
                                    key={month.numero}
                                    data-month={month.short}
                                >
                                    <button
                                        className={`text-xs rounded-xl border  bg-[#F6F4EA] aspect-square shrink-0 w-14 ${
                                            month === selectedMonth
                                                ? "bg-amber-700 border-amber-900 cursor-default"
                                                : "cursor-pointer hover:bg-neutral-200"
                                        }`}
                                        key={month.numero}
                                        onClick={() => handleMonthClick(month)}
                                        disabled={month === selectedMonth}
                                    >
                                        {month.short.toLocaleLowerCase("en-US")}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-8 mt-8 bg-[#F6F4EA] p-6 rounded-t-4xl">
                <div className="grid gap-6">
                    <span className="text-lg">Fruit</span>
                    <div className="grid gap-4">
                        {fruit.map((item, index) => (
                            <Fragment key={item.nome}>
                                {index !== 0 && (
                                    <hr className="border-t border-neutral-300" />
                                )}
                                <Product
                                    emoji={item.emoji}
                                    nome_scientifico={item.nome_scientifico}
                                    nome={item.nome}
                                    isEarly={item.primizie.includes(
                                        selectedMonth.short
                                    )}
                                    isLate={item.tardivi.includes(
                                        selectedMonth.short
                                    )}
                                    isInSeason={item.piena_stagione.includes(
                                        selectedMonth.short
                                    )}
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className="grid gap-6">
                    <span className="text-lg font-medium">Veggies</span>
                    <div className="grid gap-4">
                        {veggies.map((item, index) => (
                            <Fragment key={item.nome}>
                                {index !== 0 && (
                                    <hr className="border-t border-neutral-300" />
                                )}
                                <Product
                                    emoji={item.emoji}
                                    nome_scientifico={item.nome_scientifico}
                                    nome={item.nome}
                                    isEarly={item.primizie.includes(
                                        selectedMonth.short
                                    )}
                                    isLate={item.tardivi.includes(
                                        selectedMonth.short
                                    )}
                                    isInSeason={item.piena_stagione.includes(
                                        selectedMonth.short
                                    )}
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
