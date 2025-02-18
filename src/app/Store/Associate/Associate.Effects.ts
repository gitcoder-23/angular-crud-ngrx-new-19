import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addassociate, addassociatesuccess, deleteassociatesuccess, deleteeassociate, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";
import { AssociateService } from "../../service/associate.service";

@Injectable()
export class AssociateEffects {
    constructor(private action$: Actions, private service: AssociateService) {
        console.log("AssociateEffects initialized, service instance:", this.service);

    }

    // _loadassociate = createEffect(() =>
    //     this.action$.pipe(
    //         ofType(loadassociate),
    //         exhaustMap((action) => {
    //             return this.service.GetAllAssociate().pipe(
    //                 map((data) => {
    //                     return loadassociatesuccess({ list: data })
    //                 }),
    //                 catchError((_error) => of(loadassociatefail({ errormessage: _error.message })))
    //             )
    //         })
    //     )
    // )

    _loadassociate = createEffect(() =>
        this.action$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                console.log("Effect triggered, calling service GetAllAssociate...");
                return this.service?.GetAllAssociate().pipe(  // Add optional chaining
                    map((data) => {
                        console.log("Data received from API:", data);
                        return loadassociatesuccess({ list: data });
                    }),
                    catchError((_error) => {
                        console.error("API Error:", _error);
                        return of(loadassociatefail({ errormessage: _error.message }));
                    })
                );
            })
        )
    );

    _getassociate = createEffect(() =>
        this.action$.pipe(
            ofType(getassociate),
            exhaustMap((action) => {
                return this.service.GetAssociateByCode(action.id).pipe(
                    map((data) => {
                        return getassociatesuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addassociate = createEffect(() =>
        this.action$.pipe(
            ofType(addassociate),
            switchMap((action) => {
                return this.service.CreateAssociate(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addassociatesuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateassociate = createEffect(() =>
        this.action$.pipe(
            ofType(updateassociate),
            switchMap((action) => {
                return this.service.UpdateAssociate(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateassociatesuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update associate', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteassociate = createEffect(() =>
    this.action$.pipe(
        ofType(deleteeassociate),
        switchMap((action) => {
            return this.service.DeleteAssociateByCode(action.code).pipe(
                switchMap((data) => {
                    return of(deleteassociatesuccess({ code: action.code }),
                        showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                }),
                catchError((_error) => of(showalert({ message: 'Failed to delete associate', resulttype: 'fail' })))
            )
        })
    )
)



}