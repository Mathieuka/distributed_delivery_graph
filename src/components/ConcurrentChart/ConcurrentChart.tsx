import React, { FC } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartValueAxis,
    ChartValueAxisItem
} from '@progress/kendo-react-charts';

interface IConcurrentChart { }

const ConcurrentChart: FC<IConcurrentChart> = () => {

    const state = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        firstSeries: [5, 276, 5, 212, 240, 156, 98, 5, 276, 5, 212, 240, 156, 98],
    };
    const { categories, firstSeries } = state;

    return (
        <Chart onSeriesClick={(e) => console.log('click')} >
            <ChartTitle text="CONCURRENT VIEWERS" />
            <ChartValueAxis>
                <ChartValueAxisItem title={{ text: "Miles" }} min={0} max={300} />
            </ChartValueAxis>
            <ChartCategoryAxis >
                <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={categories} title={{ text: 'Months' }} />
            </ChartCategoryAxis>
            <ChartSeries >
                <ChartSeriesItem style={"smooth"} opacity={0.5} color='orange' dashType="solid" type="line" data={firstSeries} />
            </ChartSeries>
        </Chart >
    );
}


export default ConcurrentChart;