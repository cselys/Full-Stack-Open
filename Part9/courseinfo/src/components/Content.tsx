import Part from './Part';
import CoursePart from '../types';

interface ContentProps {
    courseparts: CoursePart[];
}

const Content = ({courseparts}:ContentProps) => {
    return (<div>
        {courseparts.map(p => <Part key={p.name} part={p}/>)}
        </div>
    );
}

export default Content;