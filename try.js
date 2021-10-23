function MyName(x){
    console.log("Myname function çalıştı");
    let foo = {
        name: 'osman',
        age: 23
    }
    x(foo);
}

MyName((foots)=>{
    console.log(`${JSON.stringify(foots)} dedi!`)
});