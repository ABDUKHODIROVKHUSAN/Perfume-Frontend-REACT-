import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectPerfumePage = (state: AppRootState) => state.perfumePage;

export const retrieveStore = createSelector(
    selectPerfumePage,
    (PerfumesPage) => PerfumesPage.store);

export const retrieveChosenPerfume = createSelector(
    selectPerfumePage,
    (PerfumesPage) => PerfumesPage.chosenperfume);

export const retrievePerfumes = createSelector(
    selectPerfumePage,
    (PerfumesPage) => PerfumesPage.perfumes);