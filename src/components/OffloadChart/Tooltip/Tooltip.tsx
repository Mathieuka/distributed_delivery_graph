import React, { FC } from 'react';
import './Tooltip.css';

interface ITooltip {
	tooltipDate: string;
	p2pGbpsValue: number;
	cdnGbpsValue: number;
}

const Tooltip: FC<ITooltip> = ({ tooltipDate, p2pGbpsValue, cdnGbpsValue }) => {
	const spike = ((100 * p2pGbpsValue) / (p2pGbpsValue + cdnGbpsValue)).toFixed(
		2
	);
	return (
		<div className="tooltip_container">
			<div className="tooltip">
				<p className="date">{tooltipDate}</p>
				<p className="p2p">
					P2P: <span className="p2p_value">{p2pGbpsValue}Gbps</span>
				</p>
				<p className="http">
					HTTP:<span className="http_value">{cdnGbpsValue}Gbps</span>
				</p>
				<hr />
				<p className="total">
					Total:{' '}
					<span className="total_value">{p2pGbpsValue + cdnGbpsValue}Gbps</span>
				</p>
				<p className="spike">
					Spike reduction: <span className="spike_value">{spike} %</span>
				</p>
			</div>
		</div>
	);
};

export default Tooltip;
