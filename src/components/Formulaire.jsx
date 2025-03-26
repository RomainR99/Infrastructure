import React, { useState } from "react";
import "../style.css";

function Formulaire() {

        const [entreprise, setEntreprise] = useState('')
        const [poste, setPoste] = useState('')
        const [lienDeLoffre, setLienDeLoffre] = useState('')
        const [dateDenvoi, setDateDenvoi] = useState('')
        const [statut, setStatut] = useState('statut')

        const onSubmit = () => {
            alert(`Submitted ${entreprise} ${poste} ${lienDeLoffre} ${dateDenvoi} ${statut}`)
        }

        const options = [
            {value: 'En attente', label: 'En attente'},
            {value: 'Acceptée', label: 'Accepté'},
            {value: 'Refusée', label: 'Refusée'}
        ]

        const handleChange = (event) => {
            setStatut(event.target.value)
        }

        return (
            <form>
                <div className="form-group">
                    <label>
                        Entreprise:  
                        <input value={entreprise} onChange={(e) => setEntreprise(e.target.value)} placeholder="Entreprise" id="entreprise"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Poste: 
                        <input value={poste} onChange={(e) => setPoste(e.target.value)} placeholder="Poste" id="poste"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Lien de l'offre:
                        <input value={lienDeLoffre} onChange={(e) => setLienDeLoffre(e.target.value)} placeholder="lien de l'offre" id="lien"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Date d'envoie:
                        <input value={dateDenvoi} onChange={(e) => setDateDenvoi(e.target.value)} placeholder="date d'envoi" id="date"/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Statut
                        <select value={statut} onChange={handleChange} id="statut">
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>
                </div>
                

                <button onClick={onSubmit}>Envoyer</button>
            </form>
        )
    
}
    
export default Formulaire