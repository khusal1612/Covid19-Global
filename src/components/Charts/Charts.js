import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../API/index';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Charts = ({data: {confirmed,recovered,deaths}, country}) => {
    const [ dailyData, setDailyData ] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData[0]
        ?
        (
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
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
                    }],
                }}
            />
        ) : null
    );

    const barchart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.98)',
                            'rgba(11, 222, 11, 0.96)',
                            'rgba(230, 14, 14, 0.98)',
                        ],
                        data: [ confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: { display: true, text: `Current State in ${country}` },
                }}
            />
        ): null
    )
    return(
        <div className={ styles.container }>
            {country ? barchart : lineChart }
        </div>
    )
}

export default Charts;