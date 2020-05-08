import React, { FC, useState, useMemo } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import './OffloadChart.css';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Tooltip } from '@progress/kendo-react-tooltip';
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

interface IOffloadChart {
    cdnDate?: any[],
    cdnGbps?: any[],
    p2pGbps?: any[],
}

const OffloadChart: FC<IOffloadChart> = ({ cdnDate, cdnGbps, p2pGbps }) => {

    const [displayDialog, setDisplayDialog] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipXPosition, setTooltipXPosition] = useState(1253)

    const data1 = [57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57];
    const data2 = [38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38,];

    const dialog = (
        <div onClick={() => setDisplayDialog(!displayDialog)}>
            <Dialog title={<div>title</div>} onClose={() => setDisplayDialog(!displayDialog)}>
                <p style={{ margin: "70px", textAlign: "center" }}>A sample print dialog.</p>
            </Dialog>
        </div>
    )

    const onPlotAreaHover = (args: any) => {
        setTooltipXPosition(args.nativeEvent.screenX)
        console.log('args => ', typeof args.nativeEvent.screenX);
        console.log(`Category: ${args.category}`);
        console.log(`Value: ${args.value}`);

    }
    console.log('tooltipVisible => ', tooltipVisible)
    return (
        <div onClick={() => setTooltipVisible(!tooltipVisible)}>
            {
                tooltipVisible ?
                    (<div className='tooltip' style={{ 'marginLeft': tooltipXPosition }}>
                        <p>Date....</p>
                        <p>p2p....</p>
                        <p>http....</p>
                        <hr />
                        <p>total....</p>
                        <p>spike....</p>
                    </div>)
                    : null
            }

            {useMemo(() => (
                <Chart onSeriesHover={(e) => onPlotAreaHover(e)}>
                    <ChartLegend visible={true} position={'top'} offsetX={0} offsetY={0} />
                    <ChartTitle text="CAPACITY OFFLOAD" />
                    <ChartValueAxis>
                        <ChartValueAxisItem title={{ text: "Gbps" }} min={0} max={300} />
                    </ChartValueAxis>
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={cdnDate} title={{ text: 'Months' }} />
                    </ChartCategoryAxis>
                    <ChartSeries >
                        <ChartSeriesItem tooltip={{ visible: true }} line={{ style: 'smooth' }} name="Maximum CDN contribution" opacity={0.5} color='purple' type="area" data={p2pGbps} noteTextField="extremum" />
                        <ChartSeriesItem tooltip={{ visible: true }} line={{ style: 'smooth' }} name="Maximum Troughput" opacity={0.5} color='blue' type="area" data={cdnGbps} noteTextField="extremum" />
                        {/* <ChartSeriesItem type="line" data={data1} dashType="solid" color='blue' />
                        <ChartSeriesItem type="line" data={data2} dashType="solid" color='purple' /> */}
                    </ChartSeries>
                </Chart>), [cdnDate])}
        </div>
    );
}


export default OffloadChart;