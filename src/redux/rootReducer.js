import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UserReducer from './user/user.reducer';
import BannerReducer from './banner/banner.reducer';
import TourReducer from './tour/tour.reducer';
import HomeReducer from './home/home.reducer';
import ReviewReducer from './review/review.reducer';
import TeamBuildingReducer from './teamBuilding/teamBuilding.reducer';
import BlogReducer from './blog/blog.reducer';
import SafetyReducer from './safety/safety.reducer';
import AboutReducer from './about/about.reducer';
import AdventureReducer from './adventure/adventure.reducer';
import OverviewReducer from './overview/overview.reducer';
import CustomerReducer from './customer/customer.reducer';
import GlampingReducer from './glamping/glamping.reducer';
import TeamBuildingTypeReducer from './teamBuildingType/teamBuildingType.reducer';

// save reducer to local storage
const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: [
        'token', // save only token to storage
    ],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, UserReducer),
    banner: BannerReducer,
    about: AboutReducer,
    tour: TourReducer,
    home: HomeReducer,
    review: ReviewReducer,
    teamBuilding: TeamBuildingReducer,
    blog: BlogReducer,
    safety: SafetyReducer,
    adventure: AdventureReducer,
    overview: OverviewReducer,
    customer:CustomerReducer,
    glamping: GlampingReducer,
    teamBuildingtype: TeamBuildingTypeReducer
});

export default persistReducer(rootPersistConfig, rootReducer)