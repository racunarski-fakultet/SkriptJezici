

function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('http://localhost/admin/adresa', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res=>{
            if(res.status!=400 && res.status!=500)
                document.location.reload();
            else{
                alert("Greska u unosa podataka ili upita");}
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });

    document.getElementById('izmeni').addEventListener('click', e => {
        e.preventDefault();

  
        const data = {
        id: document.getElementById('iid').value,
        drzava: document.getElementById('idrzava').value,
        grad: document.getElementById('igrad').value,
        postanskiBroj: document.getElementById('ipostanskibroj').value,
        ulica: document.getElementById('iulica').value,
        brojstana: document.getElementById('ibrojstana').value
        };

        document.getElementById('iid').value='';
        document.getElementById('idrzava').value='';
        document.getElementById('igrad').value='';
        document.getElementById('ipostanskibroj').value='';
        document.getElementById('iulica').value='';
        document.getElementById('ibrojstana').value='';

        if(overiIO(data.id) && overiT(data.drzava) && overiT(data.grad)&& overiT(data.postanskiBroj)&& overiT(data.ulica)&& overiI(data.brojstana)){
        fetch('http://localhost/admin/adresa', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }) .then(res=>{
            if(res.status!=400 && res.status!=500)
                document.location.reload();
            else{
                alert("Greska u unosa podataka ili upita");}
            });
            }
            else{
                alert("Nije dobar unos");
            }
    });

    document.getElementById('posalji').addEventListener('click', e => {
        e.preventDefault();

        const data = {
        id: document.getElementById('id').value,
        drzava: document.getElementById('drzava').value,
        grad: document.getElementById('grad').value,
        postanskiBroj: document.getElementById('postanskibroj').value,
        ulica: document.getElementById('ulica').value,
        brojstana: document.getElementById('brojstana').value
        };

        document.getElementById('id').value='';
        document.getElementById('drzava').value='';
        document.getElementById('grad').value='';
        document.getElementById('postanskibroj').value='';
        document.getElementById('ulica').value='';
        document.getElementById('brojstana').value='';

        if(overiIO(data.id) && overiTO(data.drzava) && overiTO(data.grad)&& overiTO(data.postanskiBroj)&& overiTO(data.ulica)&& overiIO(data.brojstana)){
        fetch('http://localhost/admin/adresa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(res=>{
                if(res.status!=400 && res.status!=500)
                    document.location.reload();
                else{
                    alert("Greska u unosa podataka ili upita");}
                });
            }
            else{
                alert("Nije dobar unos");
            }

    });
	
	
	
	fetch('http://localhost/admin/adresa', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
            credentials: 'include',
        }).then( res => res.json())
        .then( data => {
                let lsta = document.getElementById('lista');
                if(typeof data[0] !=='undefined')
                data[0].forEach( el => {
                    lsta.innerHTML += `<li>ID: ${el.Id}, drzava: ${el.Drzava}, grad: ${el.Grad}, postanskiBroj: ${el.PostanskiBroj}, ulica: ${el.Ulica}, brojstana: ${el.BrojStana}</li>`;
                })  .catch( err => console.log(err) );
        
        });

}

function overiI(br){
  //  let br=document.getElementById(id).value 
    return Number(br) ||  br === '';
}
function overiT(br,len=50){
   // let br=document.getElementById(id).value 
    return br.length<len ||  br === '';
}

function overiIO(br){
  //  let br=document.getElementById(id).value;
    return Number(br) && typeof br !== 'undefined';
}
function overiTO(br,len=50){
   // let br=document.getElementById(id).value;
    return br.length<len && typeof br !== 'undefined';
}
