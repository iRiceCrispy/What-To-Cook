import React from 'react';
import Ingredients from '../../components/ui/Ingredients';
import Navigation from '../../components/ui/Navigation';
import './index.scss';

const Dashboard = () => (
  <div id="dashboard">
    <Navigation />
    <Ingredients />
  </div>
);

export default Dashboard;
