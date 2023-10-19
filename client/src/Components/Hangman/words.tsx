async function randomWord() {
    let word : string = "";
    let meaning : string = "";

    await fetch('http://127.0.0.1:8000/fetchword')
    .then( res=>{
        if(!res.ok){
            throw new Error('Network response not okay');    
        }
        return res.json();
    })
    .then(data => {
        word = data['word'];
        meaning = data['riddle'];
        // console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    });

    return {'word': word, 'riddle': meaning};
}

export { randomWord };
  