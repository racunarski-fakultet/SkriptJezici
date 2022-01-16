function init() {

    document.getElementById('izbrisi').addEventListener('click', e => {
        e.preventDefault();

        const data = {id: document.getElementById('iddelete').value};
        document.getElementById('iddelete').value = '';

        if(overiIO(data.id)){
        fetch('http://localhost/admin/proizvod', {
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
        naslov: document.getElementById('inaslov').value,
        opis: document.getElementById('iopis').value,
        slikaPokazivac: document.getElementById('islikaPokazivac').value

        };

        document.getElementById('iid').value='';
        document.getElementById('inaslov').value='';
        document.getElementById('iopis').value='';
        document.getElementById('islikaPokazivac').value='';

        if(overiIO(data.id) && overiT(data.naslov) && overiT(data.opis,200)&& overiT(data.slikaPokazivac)){
        fetch('http://localhost/admin/proizvod', {
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
        naslov: document.getElementById('naslov').value,
        opis: document.getElementById('opis').value,
        slikaPokazivac: document.getElementById('slikaPokazivac').value

        };

        document.getElementById('id').value='';
        document.getElementById('naslov').value='';
        document.getElementById('opis').value='';
        document.getElementById('slikaPokazivac').value='';

        if(overiIO(data.id) && overiTO(data.naslov) && overiTO(data.opis,200)&& overiTO(data.slikaPokazivac)){
        fetch('http://localhost/admin/proizvod', {
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


    fetch('http://localhost/admin/proizvod', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then( res => res.json())
        .then( data => {
            console.log(data)
            let lsta = document.getElementById('lista');
            if(typeof data[0] !=='undefined')
            data[0].forEach( el => {
                lsta.innerHTML += `<li>ID: ${el.Id}, naslov: ${el.Naslov}, opis: ${el.Opis}, slika Pokazivac: ${el.SlikaPokazivac}</li>`;
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
  