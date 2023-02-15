import React from 'react';
import Pantry from '../../components/ui/Pantry';
import Navigation from '../../components/ui/Navigation';
import Recipes from '../../components/ui/Recipes';
import './index.scss';

const Dashboard = () => (
  <div id="dashboard">
    <Navigation />
    <Pantry />
    <Recipes />
  </div>
);

export default Dashboard;
