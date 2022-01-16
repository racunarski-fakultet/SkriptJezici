function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('http://localhost/admin/porudzbina', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
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

    document.getElementById('izmeni').addEventListener('click', e => {
        e.preventDefault();

        const data = {
        id: document.getElementById('iid').value,
        proizvodId: document.getElementById('iproizvodId').value,
        naznake: document.getElementById('inaznake').value,
        status: document.getElementById('istatus').value,
        vremeNastanka: document.getElementById('ivremeNastanka').value,
        vremeIsporuke: document.getElementById('ivremeIsporuke').value
        };

        document.getElementById('iid').value='';
        document.getElementById('iproizvodId').value='';
        document.getElementById('inaznake').value='';
        document.getElementById('istatus').value='';
        document.getElementById('ivremeNastanka').value='';
        document.getElementById('ivremeIsporuke').value='';

        if(overiIO(data.id) && overiI(data.proizvodId) && overiI(data.naznake)&& overiT(data.status)&& overiT(data.vremeNastanka)&& overiT(data.vremeIsporuke)){
        fetch('http://localhost/admin/porudzbina', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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


    document.getElementById('posalji').addEventListener('click', e => {
        e.preventDefault();

        const data = {
        id: document.getElementById('id').value,
        proizvodId: document.getElementById('proizvodId').value,
        naznake: document.getElementById('naznake').value,
        status: document.getElementById('status').value,
        vremeNastanka: document.getElementById('vremeNastanka').value,
        vremeIsporuke: document.getElementById('vremeIsporuke').value
        };

        document.getElementById('id').value='';
        document.getElementById('proizvodId').value='';
        document.getElementById('naznake').value='';
        document.getElementById('status').value='';
        document.getElementById('vremeNastanka').value='';
        document.getElementById('vremeIsporuke').value='';

        if(overiIO(data.id) && overiIO(data.proizvodId) && overiIO(data.naznake)&& overiTO(data.status)&& overiTO(data.vremeNastanka)&& overiTO(data.vremeIsporuke)){
        fetch('http://localhost/admin/porudzbina', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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



    fetch('http://localhost/admin/porudzbina', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then( res => res.json())
        .then( data => {
            console.log(data)
            let lsta = document.getElementById('lista');
            if(typeof data[0] !=='undefined')
            data[0].forEach( el => {
                lsta.innerHTML += `<li>ID: ${el.Id}, proizvod Id: ${el.ProizvodId}, primalac Id: ${el.Naznake}, status: ${el.Status}, Vreme Nastanka: ${el.VremeNastanka}, vreme Isporuke: ${el.VremeIsporuke}</li>`;
            });
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
