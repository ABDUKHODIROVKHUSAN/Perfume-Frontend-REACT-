import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homepage;

export const retrievePopularPerfumes = createSelector(
  selectHomePage,
  (homepage) => homepage.popularPerfumes
);
 
export const retrieveComingSoon = createSelector(
  selectHomePage,
  (homepage) => homepage.comingSoon
);


