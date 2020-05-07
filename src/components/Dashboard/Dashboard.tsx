import React, {FC, useState, useMemo, useEffect } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import Modal from '../Modal/Modal';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisCrosshair,
    ChartCategoryAxisItem,
    ChartLegend
} from '@progress/kendo-react-charts';

interface IDashboard  {}

const Dashboard: FC<IDashboard> = () => {

    const state = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        firstSeries: [5, 276, 5, 212, 240, 156, 98, 5, 276, 5, 212, 240, 156, 98],
        secondSeries: [165, 210, 287, 144, 190, 167, 212, 165, 210, 287, 144, 190, 167, 212,],
    };

    const data1 = [276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276];
    const data2 = [286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286,];

    const { categories, firstSeries, secondSeries } = state;


    const seriesLabels = {
        visible: true, // Note that visible defaults to false
        padding: 3,
        font: 'bold 16px Arial, sans-serif'
    };

    return (
        <div>
            <Chart onSeriesClick={(e) => console.log('click')} >
            <ChartLegend  visible={true} position={'top'} offsetX={0} offsetY={0} />
                <ChartTitle text="CAPACITY OFFLOAD" />
                <ChartCategoryAxis >
                    <ChartCategoryAxisItem majorGridLines={{visible:false}} categories={categories} title={{ text: 'Months' }} />
                </ChartCategoryAxis>
                <ChartSeries >
                    <ChartSeriesItem line={{style:'smooth'}} name="Maximum Troughput"  opacity={0.5} color='blue' type="area" data={firstSeries} />
                    <ChartSeriesItem line={{style:'smooth'}} name="Maximum CDN contribution" opacity={0.5} color='purple' type="area" data={secondSeries} />
                    <ChartSeriesItem type="line" data={data1} dashType="dot" color='blue'/>
                    <ChartSeriesItem type="line" data={data2} dashType="dot" color='purple'/>
                </ChartSeries>
            </Chart>

            <Chart onSeriesClick={(e) => console.log('click')} >
                <ChartTitle text="CONCURRENT VIEWERS" />
                <ChartCategoryAxis >
                    <ChartCategoryAxisItem majorGridLines={{visible:false}} categories={categories} title={{ text: 'Months' }} />
                </ChartCategoryAxis>
                <ChartSeries >
                    <ChartSeriesItem style={"smooth"} opacity={0.5} color='orange' type="line" data={firstSeries} labels={seriesLabels}/>
                </ChartSeries>
            </Chart>
        </div>
    );
}


export default Dashboard;