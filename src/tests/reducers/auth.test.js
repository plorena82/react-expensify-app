
import authReducer from '../../reducers/auth';

test('should setup login state in reducer auth',()=>{
    const uid = '2030303030';
    const state = authReducer(undefined, { type:'LOGIN',uid});
    expect(state.uid).toBe(uid);

} );



test('should setup logout state in reducer auth, clearing the uid',()=>{
    const state= authReducer({uid:'1232wew'}, {type:'LOGOUT'});
    expect(state).toEqual({});
} );