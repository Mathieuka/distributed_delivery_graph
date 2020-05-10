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
	audiencesData: number[]
}

const ConcurrentChart: FC<IConcurrentChart> = ({ audiencesData }) => {
	return (
		<Chart>
			<ChartTitle text="CONCURRENT VIEWERS" />
			<ChartValueAxis>
				<ChartValueAxisItem title={{ text: 'Viewers' }} min={0} max={900000} />
			</ChartValueAxis>
			<ChartCategoryAxis>
				<ChartCategoryAxisItem
					majorGridLines={{ visible: false }}					
				/>
			</ChartCategoryAxis>
			<ChartSeries>
				<ChartSeriesItem
					tooltip={{ visible: true }}
					style={'smooth'}
					opacity={0.5}
					color="#fce4a3"
					dashType="solid"
					type="line"
					data={audiencesData}
				/>
			</ChartSeries>
		</Chart>
	);
};

export default ConcurrentChart;
