import express from 'express';
import calculateBmi from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    if(!isNaN(height) && !isNaN(weight)){
        res.status(200).send({
            weight: weight,
            height: height,
            bmi: calculateBmi(height,weight),
        });
    }else{
     res.status(400).send({error:'malformatted parameters'});
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const inputs = req.body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target } = inputs as  {
        daily_exercises: number[];
        target: number;
    };
    if(!daily_exercises || !target)
    {
        res.status(400).send({error:'parameter is missing'});
        return;          
    }

    if(isNaN(target)){
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }

    if(daily_exercises.some( (element:number) => isNaN(element))){
        res.status(400).json({ error: 'malformatted parameters' });
        return;
    }
    
    res.status(200).send(exerciseCalculator(daily_exercises, target));

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});