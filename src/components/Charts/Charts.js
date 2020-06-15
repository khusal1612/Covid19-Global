import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../API/index';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({data, country}) => {
    const [ dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });
    const data1 = 
        {
            label: dailyData.map(({date}) => date),
            datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            }],
        };


    const lineChart = (
        dailyData.length
        ?(
            <Line 
                data={data1}
            />
        ) : null
    );
    return(
        <div className={ styles.container }>
            {lineChart}
        </div>
    )
}

export default Charts;