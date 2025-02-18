import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AssociateModel } from "../Model/Associate.model";

// Selector help to fetch the data get that selects the data or list
const getassociatestate = createFeatureSelector<AssociateModel>('associate');

export const getassociatelist = createSelector(getassociatestate, (state) => {
    return state.list;
})

export const getassociate = createSelector(getassociatestate, (state) => {
    return state.associateobj;
})