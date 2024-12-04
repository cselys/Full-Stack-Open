import {Entry} from '../../types';

type EntrydetailProp ={
    entry:Entry
};

const Entrydetail = ({entry}:EntrydetailProp) => {
    switch(entry.type){
        case 'Hospital':
            return (
                <div>
                    <div>{entry.date} {entry.description} 
                    </div>
                    <div>
                    {entry.diagnosisCodes?.map(code => <div key={code}>{code}</div>)}
                    </div>
                </div>
            );

        case 'OccupationalHealthcare':
            return (
                <div>
                    <div>{entry.date} {entry.description} 
                    </div>
                    <div>
                    {entry.diagnosisCodes?.map(code => <div key={code}>{code}</div>)}
                    </div>
                </div>
            );
        case 'HealthCheck': 
            return (
                <div>
                    <div>{entry.date} {entry.description} 
                    </div>
                    <div>
                    {entry.diagnosisCodes?.map(code => <div key={code}>{code}</div>)}
                    </div>
                </div>
            );       
        default:
            throw new Error(
                "never come here"
              );

    }

};

export default Entrydetail;