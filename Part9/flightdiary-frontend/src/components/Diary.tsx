import { DiaryEntry } from "../types";

interface DiaryProps {
    diary: DiaryEntry;
}
const Diary = ({diary}:DiaryProps) => {
    return (<div>
        <h2>{diary.date}</h2>
        <div>visibility: {diary.visibility}</div>
        <div>weather: {diary.weather}</div>
        <div>comment: {diary.comment}</div>
    </div>
    )
};

export default Diary