interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
    goal: number;
    data: number[];
}
const parseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const inputs : ExerciseInput = {
        goal: 0,
        data: [],
    };
    if (!isNaN(Number(args[2]))) {
        inputs.goal = Number(args[2]);
    } else {
      throw new Error('Provided values were not numbers!');
    }

    for(let i = 3; i < args.length; i++ ){
        if (!isNaN(Number(args[i]))) {
            inputs.data.push(Number(args[i]));
        } else {
          throw new Error('Provided values were not numbers!');
        }
    }
    console.log(inputs);
    return inputs;
  };
  

const exerciseCalculator = (daily: number[], goal: number): Result =>{
    const dayscout: number = daily.length;
    const tainingcount: number = daily.filter(d => d>0).length;
    const total: number = daily.reduce ((partial, a) => partial+a, 0);
    const averageByday: number = total/dayscout; 
    const reached :boolean = averageByday >= goal;
    const ratingnumber: number = reached ? 3 : averageByday > goal/2 ? 2 : 1 ;
    const description: string = ratingnumber ===3 
        ?'goal reached'
        : ratingnumber ===1
        ? 'failed'
        :'not too bad but could be better'; 

    return  {
        periodLength: dayscout,
        trainingDays: tainingcount,
        success: reached,
        rating: ratingnumber,
        ratingDescription: description,
        target: goal,
        average: averageByday,
    };
};

if(require.main === module){
  try {
      const inputs = parseArguments(process.argv);
      console.log(exerciseCalculator(inputs.data, inputs.goal));
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
}
export default exerciseCalculator;
