interface BmiInputs {
    height: number;
    weight: number;
  }

const parseArguments = (args: string[]): BmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
const calculateBmi = (height: number, weight: number): string => {
    const heightmeter = height/100; 
    const bmi = weight / (heightmeter ** 2);
    switch (true) {
        case bmi < 18.5:
            return 'Underweight';
        case bmi <=24.9:
            return 'Normal range';
        case bmi <= 29.9 :
            return 'Overweight';
        case bmi > 30:
            return 'Obese';
        default:
            return 'Unknown BMI';        
    }
};

try {
    if(require.main === module){    
      const { height, weight } = parseArguments(process.argv);
      console.log(`with height ${height}cm and weight ${weight}kg, BMI is: ${calculateBmi(height, weight)}`);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

export default calculateBmi;