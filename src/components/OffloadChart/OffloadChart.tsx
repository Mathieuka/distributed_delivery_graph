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
    ChartLegend
} from '@progress/kendo-react-charts';

interface IOffloadChart { }

const OffloadChart: FC<IOffloadChart> = () => {

    const state = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        firstSeries: [5, 276, 5, 212, 240, 156, 98, 5, 276, 5, 212, 240, 156, 98],
        secondSeries: [165, 210, 287, 144, 190, 167, 212, 165, 210, 287, 144, 190, 167, 212,],
    };
    const { categories, firstSeries, secondSeries } = state;
    const data1 = [276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276];
    const data2 = [286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286,];

    return (
        <div>
            <Chart onSeriesClick={(e) => console.log('click on chart')} >
                <ChartLegend visible={true} position={'top'} offsetX={0} offsetY={0} />
                <ChartTitle text="CAPACITY OFFLOAD" />
                <ChartCategoryAxis >
                    <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={categories} title={{ text: 'Months' }} />
                </ChartCategoryAxis>
                <ChartSeries >
                    <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum Troughput" opacity={0.5} color='blue' type="area" data={firstSeries} />
                    <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum CDN contribution" opacity={0.5} color='purple' type="area" data={secondSeries} />
                    <ChartSeriesItem type="line" data={data1} dashType="dot" color='blue' />
                    <ChartSeriesItem type="line" data={data2} dashType="dot" color='purple' />
                </ChartSeries>
            </Chart>
        </div>
    );
}


export default OffloadChart;