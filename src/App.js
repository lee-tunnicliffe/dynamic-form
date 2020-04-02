import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './app.css';

const App = () => {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:3000/form',
            );
            setData(result.data);
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>Dynamic Form</h1>
            {data && data.stages.map((stage) => {
                const { name, schema, items } = stage;

                const initialValues = {};
                Object.keys(schema.properties).forEach((property) => {
                    initialValues[property] = '';
                });

                const errorMessages = {};
                items.forEach(({ id, failureMessages }) => {
                    errorMessages[id] = failureMessages;
                });

                return (
                    <form>
                        {items.map(({ id, fieldType, label, ...props }) => {
                            switch (fieldType) {
                                case 'text':
                                    return (
                                        <label>
                                            {label}
                                            <input id={id} type="text"></input>
                                        </label>
                                    );
                                case 'select':
                                    return (
                                        <>
                                            <label for={id}>{label}</label>
                                            <select id={id}>
                                                {
                                                    props.options.map((option) => (
                                                        <option value={option}>{option}</option>
                                                    ))
                                                }
                                            </select>
                                        </>
                                    );
                                default:
                                    return (
                                        <span>Error: unsupported field</span>
                                    );
                            }
                        })}
                        <button type="submit">Submit</button>
                    </form>
                );
            })}
        </>
    );
}

export default App;