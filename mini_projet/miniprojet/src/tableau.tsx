// Table des coefficients protéines par objectif
const FORMULES: Record<string, [number, number]> = {
    "Sédentaire": [0.8, 1],
    "Endurance": [1.2, 1.6],
    "Conservation de la masse musculaire": [1.6, 1.8],
    "Prise de masse musculaire": [1.8, 2.2],
}

interface FormProps {
    objectifs: string[]
    poidsMin: number
    poidsMax: number
    nombreLignes: number
}


export default function Tableau({ objectifs, poidsMin, poidsMax, nombreLignes }: FormProps) {
    // On n'affiche rien si les données ne sont pas encore renseignées
    if (nombreLignes === 0 || objectifs.length === 0) return null

    // Calcul de la liste des poids
    const listePoids: number[] = []
    const interval = (poidsMax - poidsMin) / (nombreLignes - 1)
    for (let i = 0; i < nombreLignes; i++) {
        listePoids.push(poidsMin + i * interval)
    }
    // --- Export CSV ---
    // Source - https://stackoverflow.com/a/55805199
    function exportCSV() {
        // Ligne d'en-tête
        const header = ["Poids (kg)", ...objectifs]

        // Lignes de données : une ligne par poids
        const rows = listePoids.map((poids) => [
            poids.toFixed(1),
            ...objectifs.map((obj) => {
                const [coefMin, coefMax] = FORMULES[obj]
                return `${(poids * coefMin).toFixed(0)} - ${(poids * coefMax).toFixed(0)} g/jour`
            })
        ])

        // On assemble header + rows dans un tableau
        const data = [header, ...rows]

        const csvContent = data.map(d => d.join(",")).join("\n")
        const element = document.createElement('a')
        element.setAttribute(
            'href',
            `data:text/plain;charset=utf-8, ${encodeURIComponent(csvContent)}`,
        )
        element.setAttribute('download', 'tableau_proteines.csv')
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    return (
        <div>
            <h1>Tableau</h1>
            <button onClick={exportCSV}>Exporter en CSV</button>
            <div className="table-wrapper">
            {/* min-width activé uniquement si ≥ 3 objectifs = force le scroll horizontal */}
            <table style={objectifs.length >= 3 ? { minWidth: '500px' } : undefined}>
                <thead>
                    <tr>
                        <th>Poids (kg)</th>
                        {/* Une colonne par objectif sélectionné */}
                        {objectifs.map((obj) => (
                            <th key={obj}>{obj}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Une ligne par poids calculé */}
                    {listePoids.map((poids) => (
                        <tr key={poids}>
                            <td>{poids.toFixed(1)}</td>
                            {objectifs.map((obj) => {
                                const [coefMin, coefMax] = FORMULES[obj]
                                return (
                                    <td key={obj}>
                                        {(poids * coefMin).toFixed(0)} – {(poids * coefMax).toFixed(0)} g/jour
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}