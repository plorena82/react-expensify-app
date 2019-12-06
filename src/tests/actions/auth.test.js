import {login, logout} from '../../actions/auth';


test('should set login action obj correctly',()=>{
    const uid= '4394389248';
    const action = login(uid);
    expect(action).toEqual({
        type:'LOGIN',
        uid

    });
});

test('should set logout action obj correctly',()=>{
    const action = logout();
    expect(action).toEqual({
        type:'LOGOUT'
    });
});