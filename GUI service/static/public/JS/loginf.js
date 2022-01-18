function init() {
    document.getElementById('dugme').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            korisnickoIme: document.getElementById("korisnickoIme").value,
            lozinka: document.getElementById("lozinka").value
        };


        if(overiTO(data.korisnickoIme)){
        fetch('http://localhost:11000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','credentials': 'include' ,'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(data)
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
              //  open("/admin/index","_self");
              var a;
            else{
                alert("Greska u unosa podataka ili upita");}
            });
        }
        else{
            alert("Nije dobar unos");
        }
    });

    document.getElementById('testAuth').addEventListener('click', e => {
        e.preventDefault();




        fetch('http://localhost:11000/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','credentials': 'include' },
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
              //  open("/admin/index","_self");
              var a;
            else{
                alert("Greska u unosa podataka ili upita");}
            });

    });

    document.getElementById('testAuthkm').addEventListener('click', e => {
        e.preventDefault();




        fetch('http://localhost:11000/authm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','credentials': 'include' },
        }).then(res=>{
            if(res.status!=400 && res.status!=500)
              //  open("/admin/index","_self");
              var a;
            else{
                alert("Greska u unosa podataka ili upita");}
            });

    });
}


function overiI(br){
      return Number(br) ||  br === '';
  }
  function overiT(br,len=50){
      return br.length<len ||  br === '';
  }
  
  function overiIO(br){
      return Number(br) && typeof br !== 'undefined';
  }
  function overiTO(br,len=50){
      return br.length<len && typeof br !== 'undefined';
  }
  