import React, { FC } from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import 'hammerjs';
import OffloadChart from '../OffloadChart/OffloadChart';
import ConcurrentChart from '../ConcurrentChart/ConcurrentChart';
import './Dashboard.css';

interface IDashboard { }

const Dashboard: FC<IDashboard> = () => {

    return (
        <div>
            <OffloadChart/>
            <ConcurrentChart/>
        </div>
    );
}


export default Dashboard;