import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import Entrydetail from "../Entrydetails/Entrydetail";

interface PatientProps {
    id: string|undefined;
  }

  const PatientDetailPage = ({id}:PatientProps) => {
    const [patient,setPatient] = useState<Patient>();
    useEffect( ()=>{
        if(!id)
            return;
        const fetchDetail = async() => {
            const details = await patientService.getById(id);
            setPatient(details);
        };
        fetchDetail();
    },[id]);

    if(!patient){
        return ( '<h2>data not exist</h2>');
    }
    return (
        <>
        <h2>{patient.name}  
            {patient.gender === Gender.Male ? (<i className="fa fa-mars" style={{ marginLeft: '10px' }}></i>) : 
            patient.gender === Gender.Female ? <i className="fa fa-venus" style={{ marginLeft: '10px' }}></i> :
            <i className="fa fa-genderless" style={{ marginLeft: '10px' }}></i>}
        </h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
        <div key={entry.id}>
            <Entrydetail entry={entry}/>
        </div>
        ))}
      </>
    );
  };

  export default PatientDetailPage;
