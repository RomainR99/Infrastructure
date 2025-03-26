import CandidatureList from "../../componants/Candidaturelist";
import AjoutCandidature from "../../pages/Ajoutcandidature";
import Candidaturefrom from "./Candidaturefrom";
import Statistiques from "./Statistiques";

function Main(){
    return(
        <div>
            <CandidatureList/>
            <AjoutCandidature/>
            <Candidaturefrom/>
            <Statistiques/>
            

        </div>
    )
}