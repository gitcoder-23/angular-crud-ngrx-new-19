import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addassociate, addassociatesuccess, deleteassociatesuccess, deleteeassociate, getassociate, getassociatesuccess, loadassociate, loadassociatefail, loadassociatesuccess, updateassociate, updateassociatesuccess } from "./Associate.Action";
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";
import { AssociateService } from "../../service/associate.service";

@Injectable()
export class AssociateEffects {
    constructor(private actin$: Actions, private service: AssociateService) {

    }

    _loadassociate = createEffect(() =>
        this.actin$.pipe(
            ofType(loadassociate),
            exhaustMap((action) => {
                return this.service.GetAllAssociate().pipe(
                    map((data) => {
                        return loadassociatesuccess({ list: data })
                    }),
                    catchError((_error) => of(loadassociatefail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getassociate = createEffect(() =>
        this.actin$.pipe(
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
        this.actin$.pipe(
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
        this.actin$.pipe(
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
    this.actin$.pipe(
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