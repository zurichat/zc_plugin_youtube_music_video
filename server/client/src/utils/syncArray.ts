export const syncArray = (old, incoming) => {
    let final = [];
    for(let i = 0; i < old.length; i++){
        let test = incoming.find((chat) => chat.message === old[i].message);
        if(test){
            old[i] = test;
            incoming = incoming.filter((chat) => chat !== test);
        }
    }

    final = old;
    final = Object.assign([], final);
    for(let i = 0; i < incoming.length; i++) {
        final.push(incoming[i]);
    }

    return final;
}
