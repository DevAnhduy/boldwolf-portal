import { HomePageApi } from "./home.api";
import { UserApi } from "./user.api";
import { ReviewApi } from "./review.api";
import { TourApi } from "./tour.api";
import { UploadApi } from "./upload.api";
import { TeamBuildingApi } from "./teamBuilding.api";
import { SafeApi } from "./safe.api";
import { BlogApi } from "./blog.api";
import { BannerApi } from './banner.api';
import { AboutApi } from './about.api';
import { AdventureApi } from './adventure.api';
import { OverviewApi } from './overview.api';
import { CustomerApi } from './customer.api';
import { GlampingApi } from './glamping.api'
import { GlampinInfogApi } from './glamping_info.api'
import { TeamBuildingTypeApi } from './teamBuilding_type.api'
class api {
   static tourApi = new TourApi();
   static homePageApi = new HomePageApi();
   static userApi = new UserApi();
   static reviewApi = new ReviewApi();
   static uploadApi = new UploadApi();
   static teamBuildingApi = new TeamBuildingApi();
   static safeApi = new SafeApi();
   static blogApi = new BlogApi();
   static bannerApi = new BannerApi();
   static aboutApi = new AboutApi();
   static adventureApi = new AdventureApi();
   static overviewApi = new OverviewApi();
   static customerApi = new CustomerApi();
   static glampingApi = new GlampingApi();
   static glampingInfoApi = new GlampinInfogApi();
   static TeamBuildingTypeApi = new TeamBuildingTypeApi();
}

export default api;