import { ActionTypes } from './../actions/snackBar';
import { initialState } from './../appState';
import * as snackBarAction from '../actions/snackBar';


// export function snackBarReducer(state = initialState,
//   action: snackBarAction.Actions) {
//     switch (action.type) {
//       case ActionTypes.SHOW_SNACKBAR:
//         console.log(action.payload);

//         return {
//           ...state,
//           snackBar: action.payload
//         }
//       default:
//         return state;
//   }
// }