import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Fib() {
    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, []);

    const fetchValues = async () => {
        const currentValues = await axios.get("/api/values/current");

        setValues((prevValues) => ({ ...prevValues, ...currentValues.data }));
    };

    const fetchIndexes = async () => {
        const newSeenIndexes = await axios.get('/api/values/all');

        setSeenIndexes(newSeenIndexes.data);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios.post('/api/values', {
            index: index
        });

        setIndex('');
    };

    const renderSeenIndexes = () => {
        return seenIndexes.map(({ number }) => number).join(', ');
    };

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            );
        }

        return entries;
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter your index:</label>
                <input value={index} onChange={e => setIndex(e.target.value)} />
                <button>Submit</button>
            </form>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}
            <h3>Calculate Values:</h3>
            {renderValues()}
        </div>
    )
};
