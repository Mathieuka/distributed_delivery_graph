import React, { FC, useState, useMemo } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import './OffloadChart.css';
import { Dialog } from '@progress/kendo-react-dialogs';
import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartLegend,
    ChartValueAxis,
    ChartValueAxisItem
} from '@progress/kendo-react-charts';

interface IOffloadChart { }

const OffloadChart: FC<IOffloadChart> = () => {

    const [displayDialog, setDisplayDialog] = useState(false);

    const state = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        firstSeries: [5, 276, 5, 212, 240, 156, 98, 5, 276, 5, 212, 240, 156, 98],
        secondSeries: [165, 210, 287, 144, 190, 167, 212, 165, 210, 287, 144, 190, 167, 212,],
    };
    const { categories, firstSeries, secondSeries } = state;
    const data1 = [276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276, 276];
    const data2 = [286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286, 286,];

    const dialog = (
        <div onClick={()=>setDisplayDialog(!displayDialog)}>
            <Dialog title={<div>title</div>} onClose={() => setDisplayDialog(!displayDialog)}>
                <p style={{ margin: "70px", textAlign: "center" }}>A sample print dialog.</p>
            </Dialog>
        </div>

    )

    const onPlotAreaHover = (args: any) => {
        console.log(`Category: ${args.category}`);
        console.log(`Value: ${args.value}`);
    }

    return (
        <div>
            {
                displayDialog ? dialog : null
            }
            {useMemo(() => (
                <Chart onPlotAreaHover={onPlotAreaHover} onSeriesClick={(e) => setDisplayDialog(!displayDialog)} >
                    <ChartLegend visible={true} position={'top'} offsetX={0} offsetY={0} />
                    <ChartTitle text="CAPACITY OFFLOAD" />
                    <ChartValueAxis>
                        <ChartValueAxisItem title={{ text: "Gbps" }} min={0} max={300} />
                    </ChartValueAxis>
                    <ChartCategoryAxis >
                        <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={categories} title={{ text: 'Months' }} />
                    </ChartCategoryAxis>
                    <ChartSeries >
                        <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum Troughput" opacity={0.5} color='blue' type="area" data={firstSeries} noteTextField="extremum" />
                        <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum CDN contribution" opacity={0.5} color='purple' type="area" data={secondSeries} noteTextField="extremum" />
                        <ChartSeriesItem type="line" data={data1} dashType="solid" color='blue' />
                        <ChartSeriesItem type="line" data={data2} dashType="solid" color='purple' />
                    </ChartSeries>
                </Chart>), [])}
        </div>
    );
}


export default OffloadChart;