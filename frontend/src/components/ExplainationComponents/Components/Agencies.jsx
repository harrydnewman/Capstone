import styles from '../../../styles/ExplainationComponents/ExplainationSections.module.css'
import BureauofAlcoholTobaccoFirearmsandExplosives from '../../../assets/Agencies/BureauofAlcoholTobaccoFirearmsandExplosives.png';
import BureauofDiplomaticSecurity from '../../../assets/Agencies/BureauofDiplomaticSecurity.png';
import CapitolPolice from '../../../assets/Agencies/CapitolPolice.png';
import DEA from '../../../assets/Agencies/DEA.png';
import DepartmentofVeteransAffairs from '../../../assets/Agencies/DepartmentofVeteransAffairs.png';
import FBI from '../../../assets/Agencies/FBI.png';
import FDA from '../../../assets/Agencies/FDA.png';
import FederalBureauofPrisons from '../../../assets/Agencies/FederalBureauofPrisons.png';
import FishAndWildlifeService from '../../../assets/Agencies/FishAndWildlifeService.png';
import ICE from '../../../assets/Agencies/ICE.png';
import IRS from '../../../assets/Agencies/IRS.png';
import Marshalls from '../../../assets/Agencies/Marshalls.png';
import NASAOfficeofProtectiveServices from '../../../assets/Agencies/NASAOfficeofProtectiveServices.png';
import ParkPolice from '../../../assets/Agencies/ParkPolice.png';
import Pentagon from '../../../assets/Agencies/Pentagon.png';
import PostalInspection from '../../../assets/Agencies/PostalInspection.png';
import ProbationAndPretrial from '../../../assets/Agencies/ProbationAndPretrial.png';
import SecretService from '../../../assets/Agencies/SecretService.png';
import TSA from '../../../assets/Agencies/TSA.png';
import USCBP from '../../../assets/Agencies/USCBP.png'

const agencies = [
    { name: 'Bureau of Alcohol, Tobacco, Firearms and Explosives', img: BureauofAlcoholTobaccoFirearmsandExplosives },
    { name: 'Bureau of Diplomatic Security', img: BureauofDiplomaticSecurity },
    { name: 'United States Capitol Police', img: CapitolPolice },
    { name: 'Drug Enforcement Administration (DEA)', img: DEA },
    { name: 'Department of Veterans Affairs', img: DepartmentofVeteransAffairs },
    { name: 'Federal Bureau of Investigation (FBI)', img: FBI },
    { name: 'Food and Drug Administration (FDA)', img: FDA },
    { name: 'Federal Bureau of Prisons', img: FederalBureauofPrisons },
    { name: 'U.S. Fish and Wildlife Service', img: FishAndWildlifeService },
    { name: 'U.S. Immigration and Customs Enforcement (ICE)', img: ICE },
    { name: 'Internal Revenue Service (IRS)', img: IRS },
    { name: 'United States Marshals Service', img: Marshalls },
    { name: 'NASA Office of Protective Services', img: NASAOfficeofProtectiveServices },
    { name: 'United States Park Police', img: ParkPolice },
    { name: 'United States Department of Defense (Pentagon)', img: Pentagon },
    { name: 'United States Postal Inspection Service', img: PostalInspection },
    { name: 'Office of Probation and Pretrial Services', img: ProbationAndPretrial },
    { name: 'United States Secret Service', img: SecretService },
    { name: 'Transportation Security Administration (TSA)', img: TSA },
    { name: 'United States Customs and Border Protection (CBP)', img: USCBP },
  ];
  

export default function Agencies() {
    return (
        <div className={styles.agenciesDiv}>
            {agencies.map((agency, idx) => (
                <div key={idx} className={styles.agency}>
                    <img src={agency.img} alt={agency.name} />
                    <div className={styles.overlay}>
                        <span>{agency.name}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}