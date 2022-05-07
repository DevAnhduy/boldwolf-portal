import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { AdminAuth, Banner, 
    Dashboard, LoginPage, NotFound, 
    ReviewDetail, Safety, 
    TeamBuilding, TeamBuildingDetail, 
    TourContainer, TourDetail,Glamping,
    About, Adventure,Customer, TeamBuidingType, BlogContainer, BlogDetail,AdventureDetail } from './containers';
import BannerPage from './containers/Banner/components/BannerPage/BannerPage';
import BannerTeamBuildingDetail from './containers/Banner/components/BannerTeamBuildingDetail/BannerTeamBuildingDetail';
import BannerTourDetail from './containers/Banner/components/BannerTourDetail/BannerTourDetail';
import BannerAdventureTourDetail from './containers/Banner/components/BannerAdventureTourDetail/BannerAdventureTourDetail'
import { ROUTE, MODE } from './utils/constant';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={ROUTE.LOGIN} component={LoginPage} />
        <AdminAuth>
          <Route exact path={ROUTE.DASH_BOARD} component={Dashboard} />
          <Route exact path={ROUTE.ABOUT} component={About} />
          <Route exact path={ROUTE.BANNER} component={Banner} />
          <Route exact path={`${ROUTE.BANNER}/page/:type/:title`} component={BannerPage} />
          <Route exact path={`${ROUTE.BANNER}${ROUTE.TOURS}/:id`} component={BannerTourDetail} />
          <Route exact path={`${ROUTE.BANNER}${ROUTE.TEAM_BUILDING}/:id`} component={BannerTeamBuildingDetail} />
          <Route exact path={`${ROUTE.BANNER}${ROUTE.EXPLORER}/:id`} component={BannerAdventureTourDetail} />

          <Route exact path={ROUTE.TEAM_BUILDING} component={TeamBuilding} />
          <Route exact path={`${ROUTE.TEAM_BUILDING}/${MODE.ADD}`} component={TeamBuildingDetail} />
          <Route exact path={`${ROUTE.TEAM_BUILDING}/${MODE.UPDATE}/:id`} component={TeamBuildingDetail} />
          <Route exact path={`${ROUTE.TEAM_BUILDING}/type`} component={TeamBuidingType} />

          <Route exact path={ROUTE.BLOG} component={BlogContainer} />
          <Route exact path={`${ROUTE.BLOG}/${MODE.ADD}`} component={BlogDetail} />
          <Route exact path={`${ROUTE.BLOG}/${MODE.UPDATE}/:id`} component={BlogDetail} />

          <Route exact path={`${ROUTE.REVIEW}/${MODE.ADD}`} component={ReviewDetail} />
          <Route exact path={`${ROUTE.REVIEW}/${MODE.UPDATE}/:id`} component={ReviewDetail} />

          <Route exact path={ROUTE.TOURS} component={TourContainer} />
          <Route exact path={`${ROUTE.TOURS}/${MODE.ADD}`} component={TourDetail} />
          <Route exact path={`${ROUTE.TOURS}/${MODE.UPDATE}/:id`} component={TourDetail} />
          <Route exact path={`${ROUTE.TOURS}/glamping`} component={Glamping} />

          <Route exact path={ROUTE.SAFETY} component={Safety} />
          <Route exact path={ROUTE.EXPLORER} component={Adventure} />
          <Route exact path={`${ROUTE.EXPLORER}/${MODE.ADD}`} component={AdventureDetail} />
          <Route exact path={`${ROUTE.EXPLORER}/${MODE.UPDATE}/:id`} component={AdventureDetail} />
          <Route exact path={ROUTE.CUSTOMER} component={Customer} />
        </AdminAuth>
        {/* 404 not found */}
        <Route path="*" component={NotFound} />
      </Switch>
    </div >
  );
}

export default App;
