let dbPromise = idb.open('League', 1, upgradeDB => {
  if(!upgradeDB.objectStoreNames.contains('teams')){
      upgradeDB.createObjectStore('teams')
  }
})



function addTeam({id,logo,name,venue,website}) {
  dbPromise
  .then(db => {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      let item = {
          id: id,
          logo: logo,
          name: name,
          venue: venue,
          website: website,
          created: new Date().getTime()
      };
      store.put(item, id); 
      return tx.complete;
  })
  .then(() => console.log('Berhasil Menyimpan Tim',name))
  .catch(() => console.log('Gagal Menyimpan Tim'))
}

function deleteTeam(id){
  dbPromise
  .then(db => {
      let tx = db.transaction('teams', 'readwrite')
      let store = tx.objectStore('teams')
      store.delete(id)
      return tx.complete
  })
  .then(() => console.log('Item Deleted'))
}

function getTeam(){
  return dbPromise
  .then(db => {
      let tx = db.transaction('teams','readonly')
      let store = tx.objectStore('teams')

      return store.getAll()
  })
  .then(data => data)
}

function pushNotification(msg){
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: 'icon.png',
        badge: './img/football.svg'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    } else {
        console.error('Fitur notifikasi tidak diijinkan.');
    }
}


function addFavorite(id,logo,name,venue,website){
    let imSure = confirm(`Apakah yakin ingin menambahkan ${name} ke Favorit ?`)
    if(imSure){
    addTeam({id,logo,name,venue,website})
    pushNotification(`Berhasil Favorit ${name}`)
    }
}

function getAllTeamdb(){
  getTeam()
  .then(data => {
      let listTeamdb = ''
      data.forEach(team => {
          listTeamdb  +=
          `
          <div class="col s12">
                <div class="card">
                    <div class="row">
                        <div class="col s4 m2">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" style="width: 100px; height:100px;" >
                        </div>
                        <div class="col s8 m6 information-team">
                            <table border="0">
                                <tr>
                                    <td>Nama Team</td>
                                    <td>${team.name}</td>
                                </tr>
                                <tr>
                                    <td>Tempat Team</td>
                                    <td>${team.venue}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col s12 m4" style="padding:0px;">
                        <div class="teams">
                            <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">More Info</a>
                            <button onclick="deleteFavorite(${team.id},'${team.name}')" class="waves-effect waves-light btn red accent-3">- HAPUS</button>
                        </div>
                    </div>
                    </div>
                </div>
          </div>
          `
      });
        if(data.length == 0) listTeamdb += `<div class="col s12"><div class="card"><h5 style="text-align:center;">Tidak Ada Tim Favorite<h5></div></div>`;
        document.getElementById('favorite_db').innerHTML = listTeamdb;
    });
}

function deleteFavorite(id,name){
  let imSure = confirm(`Apakah Yakin ingin menghapus ${name} dari Favorit ?`)
  if(imSure){
      deleteTeam(id)
      getAllTeamdb()
      pushNotification(`Berhasil Menghapus ${name}`)
  }
  
}
