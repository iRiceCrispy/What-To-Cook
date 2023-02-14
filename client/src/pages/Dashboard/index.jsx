import React from 'react';
import Ingredients from '../../components/ui/Ingredients';
import Navigation from '../../components/ui/Navigation';
import Recipes from '../../components/ui/Recipes';
import './index.scss';

const Dashboard = () => (
  <div id="dashboard">
    <Navigation />
    <Ingredients />
    <Recipes />
  </div>
);

export default Dashboard;
