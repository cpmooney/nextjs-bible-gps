import Chart from "app/chart";
import { useEffect, useState } from "react";

const TestPicker = () => {
    const [numberOfTests, setNumberOfTests] = useState(0);
    const [testValues, setTestValues] = useState<number[]>([]);

    useEffect(() => {
        setTestValues(Array.from({length: numberOfTests}, () => Math.floor(Math.random() * 10) + 1));
    }, [numberOfTests]);
    
    return (
        <div>
            <input type="number" value={numberOfTests} onChange={(e) => setNumberOfTests(parseInt(e.target.value))} />
        <Chart data={testValues} />
        </div>
    );
    }

export default TestPicker;