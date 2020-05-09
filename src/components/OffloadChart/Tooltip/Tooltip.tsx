import React, { FC } from 'react';


interface ITooltip {
	dateValue: string;
    p2pGbpsValue: number;
    cdnGbpsValue: number;
}

const Tooltip: FC<ITooltip> = ({ dateValue, p2pGbpsValue, cdnGbpsValue,  }) => {
	return (
		<div>
            <div className="tooltip">
					<p>Date: {dateValue}</p>
					<p>P2P: {p2pGbpsValue}</p>
					<p>HTTP: {cdnGbpsValue}</p>
					<hr />
					<p>Total: {p2pGbpsValue + cdnGbpsValue}</p>
					<p>
						Spike reduction:{' '}
						{((100 * p2pGbpsValue) / (p2pGbpsValue + cdnGbpsValue)).toFixed(2)}{' '}
						%
					</p>
				</div>
        </div>
	);
};

export default Tooltip;
