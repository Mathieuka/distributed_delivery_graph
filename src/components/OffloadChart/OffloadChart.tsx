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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { getBandwidth_Action } from '../../redux/actions/data_action';

interface IOffloadChart {
    cdnDate?: any[],
    cdnGbps?: any[],
    p2pDate?: any[],
    p2pGbps?: any[],
}

const OffloadChart: FC<IOffloadChart> = ({cdnDate, cdnGbps, p2pDate, p2pGbps}) => {

    const [displayDialog, setDisplayDialog] = useState(false);
    
    const state = {
        categories: cdnDate ? cdnDate : [],// ['2.Jan', '3.Jan', '4.Jan', '5.Jan', '6.Jan', '7.Jan', '8.Jan', '9.Jan', '10.Jan', '11.Jan', '12.Jan', '13.Jan', '14.Jan', '15.Jan'],
        firstSeries: cdnGbps ? cdnGbps: [], // [18, 37, 22, 27, 30, 57, 48, 25, 36, 45, 22, 40, 56, 40],
        secondSeries: p2pGbps? p2pGbps : [], // [12, 18, 17, 20, 15, 22, 30, 20, 25, 38, 17, 23, 15, 30,],
    };
    const { categories, firstSeries, secondSeries } = state;
    
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
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem majorGridLines={{ visible: false }} categories={categories} title={{ text: 'Months' }} />
                    </ChartCategoryAxis>
                    <ChartSeries >
                        <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum Troughput" opacity={0.5} color='blue' type="area" data={firstSeries} noteTextField="extremum" />
                        <ChartSeriesItem line={{ style: 'smooth' }} name="Maximum CDN contribution" opacity={0.5} color='purple' type="area" data={secondSeries} noteTextField="extremum" />
                        {/* <ChartSeriesItem type="line" data={data1} dashType="solid" color='blue' />
                        <ChartSeriesItem type="line" data={data2} dashType="solid" color='purple' /> */}
                    </ChartSeries>
                </Chart>), [cdnDate])}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
      cdnDate: state.dataReducer.cdn.date,
      cdnGbps: state.dataReducer.cdn.gbps,
      p2pDate: state.dataReducer.p2p.date,
      p2pGbps: state.dataReducer.p2p.gbps,
    }
  };
  
  const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
   
    }, dispatch)
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(OffloadChart);