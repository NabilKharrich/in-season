function Product({
    emoji,
    nome_scientifico,
    nome,
    isEarly,
    isLate,
    isInSeason,
}: {
    emoji: string;
    nome_scientifico: string;
    nome: string;
    isEarly?: boolean;
    isLate?: boolean;
    isInSeason?: boolean;
}) {
    return (
        <div
            className={`flex gap-4 items-start 
                ${isInSeason ? "bg-green-100" : ""} ${
                isEarly ? "bg-blue-100" : ""
            } ${isLate ? "bg-red-100" : ""} bg-transparent`}
        >
            <div className="flex gap-4 flex-1">
                <span className="shrink-0 text-2xl">{emoji}</span>
                <div className="grid gap-1">
                    <span className="text-xs text-neutral-500">
                        {nome_scientifico}
                    </span>
                    <span className="text-sm">{nome}</span>
                </div>
            </div>
        </div>
    );
}

export default Product;
