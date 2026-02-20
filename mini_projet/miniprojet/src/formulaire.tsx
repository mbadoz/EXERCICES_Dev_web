import { useRef, useState, type SubmitEvent } from "react"

interface FormulaireProps {
    onSubmit: (objectifs: string[], poidsMin: number, poidsMax: number, nombreLignes: number) => void
}

export default function Formulaire({ onSubmit }: FormulaireProps) {
    // ref des inputs
    const poidsMinRef = useRef<HTMLInputElement>(null)
    const poidsMaxRef = useRef<HTMLInputElement>(null)
    const nombreLignesRef = useRef<HTMLInputElement>(null)

    // ref des checkboxes
    const sedentaireRef = useRef<HTMLInputElement>(null)
    const enduranceRef = useRef<HTMLInputElement>(null)
    const conservationRef = useRef<HTMLInputElement>(null)
    const priseRef = useRef<HTMLInputElement>(null)

    const [erreur, setErreur] = useState<string>("")

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        // On récupère les objectifs cochés
        const objectifsSelectionnes: string[] = []
        if (sedentaireRef.current?.checked) objectifsSelectionnes.push("Sédentaire")
        if (enduranceRef.current?.checked) objectifsSelectionnes.push("Endurance")
        if (conservationRef.current?.checked) objectifsSelectionnes.push("Conservation de la masse musculaire")
        if (priseRef.current?.checked) objectifsSelectionnes.push("Prise de masse musculaire")

        const poidsMin = Number(poidsMinRef.current?.value)
        const poidsMax = Number(poidsMaxRef.current?.value)
        const nombreLignes = Number(nombreLignesRef.current?.value)

        // gestion des erreurs
        if (objectifsSelectionnes.length === 0) {
            setErreur("Veuillez sélectionner au moins un objectif.")
            return
        }
        if (poidsMin <= 0 || poidsMax <= 0) {
            setErreur("Les poids doivent être des valeurs positives.")
            return
        }
        if (poidsMin >= poidsMax) {
            setErreur("Le poids minimum doit être inférieur au poids maximum.")
            return
        }
        if (nombreLignes < 2) {
            setErreur("Le nombre de lignes doit être au moins 2.")
            return
        }

        // Pas d'erreur : on efface le message et on submit les données
        setErreur("")
        onSubmit(objectifsSelectionnes, poidsMin, poidsMax, nombreLignes)
    }

    return (
        <div>
            <h1>Formulaire</h1>
            <form onSubmit={handleSubmit}>
                <label>Sélectionnez un ou plusieurs objectifs</label>
                <br />
                <input type="checkbox" ref={sedentaireRef} value={"Sédentaire"} /> Sédentaire<br />
                <input type="checkbox" ref={enduranceRef} value={"Endurance"} /> Endurance<br />
                <input type="checkbox" ref={conservationRef} value={"Conservation de la masse musculaire"} /> Conservation de la masse musculaire<br />
                <input type="checkbox" ref={priseRef} value={"Prise de masse musculaire"} /> Prise de masse musculaire<br />
                <label>Poids minimum</label>
                <input type="number" ref={poidsMinRef} />
                <label>Poids maximum</label>
                <input type="number" ref={poidsMaxRef} />
                <label>Choisir le nombre de lignes à afficher entre le poids minimum et le poids maximum</label>
                <input type="number" ref={nombreLignesRef} />
                <button type="submit">Afficher le tableau</button>
                {erreur && <p style={{ color: "red" }}>{erreur}</p>}
            </form>
        </div>
    )
}