import { INCERMENT, DECERMENT } from "./actions";  
const initialstate =
{
    count : 0
}
export default function reduxer(state = initialstate, action)
{
    switch (action.type)
    {
        case 'INCERMENT':
            return {...state, count: state.count + 1};
        case 'DECERMENT':
            return {...state, count: state.count - 1};
        default:
            return state;            
    }
}    