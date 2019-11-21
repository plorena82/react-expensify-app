
const add = (a,b) => a +b ;
const greeting = (name = 'Anonymous')=>`Hello ${name}!!`;
test('This test is to add 2 numbers returning the expected result',()=>{

    const result  = add(3,4);
    expect(result).toBe(7);
})

test('Testing the greeting function',()=>{
    const result= greeting('Pola');
    expect(result).toBe('Hello Pola!!');
});


test('Testing the greeting with no name',()=>{
    const result= greeting();
    expect(result).toBe('Hello Anonymous!!');
});
