import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../API/index';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = () => {
    const [ dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });

    const lineChart = (
        dailyData.length
        ?(<Line 
            data={{
                label: dailyData.map(({date}) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                },{
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    fill: true,
                    backgroundColor: 'rgba(255,0,0,0.5)', 
                }],
            }}
        />) : null
    );
    return(
        <div className={ styles.container }>
            {lineChart}
        </div>
    )
}

export default Charts;