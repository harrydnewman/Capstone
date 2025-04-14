import styles from '../../styles/ExplainationComponents/ExplainationComponents.module.css'

export default function Scope(){
    return (
        <div className={styles.main}>
            <h1>How Big Is This Problem?</h1>
                <h2>Facial recognition is everywhere.</h2>
                <h2>In 2021, at least 20 U.S. federal law enforcement agencies were already using facial recognition.</h2>
                <div className={styles.federalAgencies}>
                    <p>Show federal agencies using AI facial recognition here</p>

                    {/* List of agencies to come back to

                    Owned system
Department of Veterans Affairs Police Service

Federal Bureau of Prisons

National Aeronautics and Space Administration, Office of Protective Services

Used another entity’s system
Bureau of Alcohol, Tobacco, Firearms, and Explosives

Bureau of Diplomatic Security

Drug Enforcement Administration

Food and Drug Administration, Office of Criminal Investigations

U.S. Fish and Wildlife Service

U.S. Immigration and Customs Enforcement

Internal Revenue Service, Criminal Investigation Division

U.S. Capitol Police

U.S. Marshals Service

U.S. Park Police

U.S. Postal Inspection Service

U.S. Probation and Pretrial Services

Owned system and used another entity’s system
U.S. Customs and Border Protection

Federal Bureau of Investigation

Pentagon Force Protection Agency

U.S. Secret Service

Transportation Security Administration

I HAVE THE IMAGES I JUST NEED TO EDIT SOME OF THEM */}
                </div>
                {/* maybe keep this  */}
                <h2>Talk about local law enforcement departments using the tech</h2>
                <div className={styles.visual}>
                    <p>Show map if possible to find the data relatively quickly</p>
                </div>
        </div>
    )
}