import React, { FC } from 'react';
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
	ChartValueAxisItem,
} from '@progress/kendo-react-charts';

interface IConcurrentChart {
	p2pGbps: number[];
	cdnDate: string[];
}

const ConcurrentChart: FC<IConcurrentChart> = ({ cdnDate, p2pGbps }) => {
	return (
		<Chart>
			<ChartTitle text="CONCURRENT VIEWERS" />
			<ChartValueAxis>
				<ChartValueAxisItem title={{ text: '??' }} min={0} max={500} />
			</ChartValueAxis>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem
					majorGridLines={{ visible: false }}
					categories={cdnDate}
				/>
			</ChartCategoryAxis>
			<ChartSeries>
				<ChartSeriesItem
					tooltip={{ visible: true }}
					style={'smooth'}
					opacity={0.5}
					color="orange"
					dashType="solid"
					type="line"
					data={p2pGbps}
				/>
			</ChartSeries>
		</Chart>
	);
};

export default ConcurrentChart;
