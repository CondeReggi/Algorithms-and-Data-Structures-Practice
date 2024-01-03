(function getScopes(){
    const nodos = document.querySelector(".mat-chip-list-wrapper").childNodes;
    let result = []

    for(let nodo of nodos){
        if(nodo.childNodes.length !== 0){
            if([...nodo.classList].includes("mat-standard-chip")){
                let value = nodo.innerText;
                result.push(value.split(" ")[0]);
            }
        }
    }
    return result.map(x => x.split("\ncancel")[0]).join(" ");
})();
