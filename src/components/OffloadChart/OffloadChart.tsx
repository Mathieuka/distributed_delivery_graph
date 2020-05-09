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
	cdnDate?: any[];
	cdnGbps?: any[];
	p2pGbps?: any[];
}

const OffloadChart: FC<IOffloadChart> = ({ cdnDate, cdnGbps, p2pGbps }) => {
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [p2pGbpsValue, setP2PGbpsValue] = useState(0);
	const [cdnGbpsValue, setCdnGbpsValue] = useState(0);
	const [dateValue, setDateValue] = useState('');

	// generate the horizontal max line of P2P and CDN
	let cdnMaxValue: any;
	let p2pMaxvalue: any;
	if (cdnGbps && p2pGbps) {
		let cpCdnGbps = JSON.parse(JSON.stringify(cdnGbps));
		let cpP2pGbps = JSON.parse(JSON.stringify(p2pGbps));
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
		setDateValue(args.category);
		if (cdnGbps && cdnGbps.indexOf(args.value) > 0) {
			setCdnGbpsValue(args.value);
			if (p2pGbps) {
				setP2PGbpsValue(p2pGbps[cdnGbps.indexOf(args.value)]);
			}
		}
		if (p2pGbps && p2pGbps.indexOf(args.value) > 0) {
			setP2PGbpsValue(args.value);
			if (cdnGbps) {
				setCdnGbpsValue(cdnGbps[p2pGbps.indexOf(args.value)]);
			}
		}
	};

	return (
		<div onClick={() => setTooltipVisible(!tooltipVisible)}>
			{tooltipVisible ? (
				<Tooltip
					dateValue={dateValue}
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
								categories={cdnDate}
								title={{ text: 'Months' }}
							/>
						</ChartCategoryAxis>
						<ChartSeries>
							<ChartSeriesItem
								tooltip={{ visible: true }}
								line={{ style: 'smooth' }}
								name="Maximum CDN contribution"
								opacity={0.5}
								color="purple"
								type="area"
								data={p2pGbps}
								noteTextField="extremum"
							/>
							<ChartSeriesItem
								tooltip={{ visible: true }}
								line={{ style: 'smooth' }}
								name="Maximum Troughput"
								opacity={0.5}
								color="blue"
								type="area"
								data={cdnGbps}
								noteTextField="extremum"
							/>
							<ChartSeriesItem
								tooltip={{ visible: false }}
								type="line"
								data={p2pMaxvalue}
								dashType="solid"
								color="blue"
							/>
							<ChartSeriesItem
								tooltip={{ visible: false }}
								type="line"
								data={cdnMaxValue}
								dashType="solid"
								color="purple"
							/>
						</ChartSeries>
					</Chart>
				),
				[cdnDate]
			)}
		</div>
	);
};

export default OffloadChart;
