import CoursePart from "../types";

interface PartProps {
    part: CoursePart;
}

const Part = ({part}:PartProps) => {
    switch(part.kind) {
        case "basic":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <br/>
                </div>
            );
            break;
        case "group":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div>project exercises: {part.groupProjectCount}</div>
                    <br/>
                </div>
            );
            break;
        case "background":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>submit to {part.backgroundMaterial}</div>
                    <br/>
                </div>
            );
            break;
        case "special":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <div><i>{part.description}</i></div>
                    <div>required skills: {part.requirements.join(', ')}</div>
                    <br/>
                </div>
            );
            break;            
        default:
            return <></>
    }
};

export default Part;