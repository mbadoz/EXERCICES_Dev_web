import { useState } from 'react'

import './App.css'
import Tableau from './tableau'
import Formulaire from './formulaire'

function App() {
  // paramètres du formulaire
  const [objectifs, setObjectifs] = useState<string[]>([])
  const [poidsMin, setPoidsMin] = useState<number>(0)
  const [poidsMax, setPoidsMax] = useState<number>(0)
  const [nombreLignes, setNombreLignes] = useState<number>(0)

  // fonction appeler par formulaire lors du submit pour mettre à jour les paramètres
  function handleSubmit(objectifsSelectionnes: string[], min: number, max: number, lignes: number) {
    setObjectifs(objectifsSelectionnes)
    setPoidsMin(min)
    setPoidsMax(max)
    setNombreLignes(lignes)
  }

  return (
    <>
      <div>
        <Formulaire onSubmit={handleSubmit} />
        <Tableau objectifs={objectifs} poidsMin={poidsMin} poidsMax={poidsMax} nombreLignes={nombreLignes} />
      </div>
    </>
  )
}

export default App
