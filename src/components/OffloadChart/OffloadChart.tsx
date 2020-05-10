import React, { FC, useState, useMemo, useEffect } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import './OffloadChart.css';
import Tooltip from './Tooltip/Tooltip';
import {
	Chart,
	ChartTitle,
	ChartSeries,
	ChartSeriesItem,
	ChartCategoryAxis,
	ChartCategoryAxisItem,
	ChartLegend,
	ChartValueAxis,
	ChartValueAxisItem,
} from '@progress/kendo-react-charts';

interface IOffloadChart {
	cdnDatesData?: any[];
	cdnGbpsData?: any[];
	p2pGbpsData?: any[];
	completeDateForTooltip: string[];
}

const OffloadChart: FC<IOffloadChart> = ({ cdnDatesData, cdnGbpsData, p2pGbpsData, completeDateForTooltip }) => {
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [p2pGbpsValue, setP2PGbpsValue] = useState(0);
	const [cdnGbpsValue, setCdnGbpsValue] = useState(0);
	const [tooltipDate, setTooltipDate] = useState('');

	// Generate the horizontal max line of P2P and CDN
	let cdnMaxValue: any;
	let p2pMaxvalue: any;
	if (cdnGbpsData && p2pGbpsData) {
		let cpCdnGbps = JSON.parse(JSON.stringify(cdnGbpsData));
		let cpP2pGbps = JSON.parse(JSON.stringify(p2pGbpsData));
		cdnMaxValue = new Array(cpCdnGbps.length);
		p2pMaxvalue = new Array(cpP2pGbps.length);
		cdnMaxValue.fill(
			Math.max(
				...cpCdnGbps
					.filter((val: string) => typeof val !== 'string')
					.map((num: any) => parseInt(num.toFixed(0), 10))
			),
			0,
			45
		);
		p2pMaxvalue.fill(
			Math.max(
				...cpP2pGbps
					.filter((val: string) => typeof val !== 'string')
					.map((num: any) => parseInt(num.toFixed(0), 10))
			),
			0,
			45
		);
	}

	// handle the informations display in the dialog tooltip window
	const onPlotAreaHover = (args: any) => {
		// Set Date value
		if (completeDateForTooltip && cdnGbpsData && p2pGbpsData) {
			completeDateForTooltip[cdnGbpsData?.indexOf(args.dataItem)] ?
			setTooltipDate(completeDateForTooltip[cdnGbpsData?.indexOf(args.dataItem)]) : 
			setTooltipDate(completeDateForTooltip[p2pGbpsData?.indexOf(args.dataItem)]) 
		}

		// Set Gbps value for p2p
		if (cdnGbpsData && cdnGbpsData.indexOf(args.value) > 0) {
			setCdnGbpsValue(args.value);
			if (p2pGbpsData) {
				setP2PGbpsValue(p2pGbpsData[cdnGbpsData.indexOf(args.value)]);
			}
		}
		// Set Gbps value for cdn
		if (p2pGbpsData && p2pGbpsData.indexOf(args.value) > 0) {
			setP2PGbpsValue(args.value);
			if (cdnGbpsData) {
				setCdnGbpsValue(cdnGbpsData[p2pGbpsData.indexOf(args.value)]);
			}
		}
	};

	return (
		<div onClick={() => setTooltipVisible(!tooltipVisible)}>
			{tooltipVisible ? (
				<Tooltip
					tooltipDate={tooltipDate}
					p2pGbpsValue={p2pGbpsValue}
					cdnGbpsValue={cdnGbpsValue}
				/>
			) : null}

			{useMemo(
				() => (
					<Chart onSeriesHover={(e) => onPlotAreaHover(e)}>
						<ChartLegend
							visible={true}
							position={'top'}
							offsetX={0}
							offsetY={0}
						/>
						<ChartTitle text="CAPACITY OFFLOAD" />
						<ChartValueAxis>
							<ChartValueAxisItem title={{ text: 'Gbps' }} min={0} max={500} />
						</ChartValueAxis>
						<ChartCategoryAxis>
							<ChartCategoryAxisItem
								majorGridLines={{ visible: false }}
								categories={cdnDatesData}
								title={{ text: 'Months' }}
							/>
						</ChartCategoryAxis>
						<ChartSeries>
							<ChartSeriesItem
								tooltip={{ visible: true }}
								line={{ style: 'smooth' }}
								name="Maximum CDN contribution"
								opacity={1}
								color="#12a5ed"
								type="area"
								data={p2pGbpsData}
								noteTextField="extremum"
							/>
							<ChartSeriesItem
								tooltip={{ visible: true }}
								line={{ style: 'smooth' }}
								name="Maximum Troughput"
								opacity={1}
								color="#c42151"
								type="area"
								data={cdnGbpsData}
								noteTextField="extremum"
							/>
							<ChartSeriesItem
								tooltip={{ visible: false }}
								type="line"
								data={p2pMaxvalue}
								dashType="solid"
								color="green"
							/>
							<ChartSeriesItem
								tooltip={{ visible: false }}
								type="line"
								data={cdnMaxValue}
								dashType="solid"
								color="#c42151"
							/>
						</ChartSeries>
					</Chart>
				),
				[cdnDatesData]
			)}
		</div>
	);
};

export default OffloadChart;
