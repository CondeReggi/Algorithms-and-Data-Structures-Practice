function organizeChristmasDinner(dishes) {
    const platos = dishes.map(x => {
        const [plato, ...rest] = x;

        return {
            plato,
            ingredientes: rest
        }
    });

    const platosPorIngrediente = {}

    for (let datos of platos) {
        const { plato, ingredientes } = datos;

        for (let ingrediente of ingredientes) {
            if (platosPorIngrediente[ingrediente]) {
                platosPorIngrediente[ingrediente].push(plato);
            } else {
                platosPorIngrediente[ingrediente] = [plato]
            }
        }
    }

    return Object.entries(platosPorIngrediente)
        .filter(([_, platos]) => platos.length > 1)
        .map(([ingrediente, platos]) => [ingrediente, ...platos.sort()])
        .sort((a, b) => a[0].localeCompare(b[0]));
}