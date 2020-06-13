const base_url = 'https://api.football-data.org';
const api_token = '8df920a0b89d44388fbc28f251a06214';
const leagueID = '2021';

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getMatch() {
  if ("caches" in window) {
    caches.match(`${base_url}/v2/competitions/${leagueID}/standings`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let listMatch = ''
          data = data.standings[0].table;
            data.forEach(function(dataTeam) {
              let urlTeamImage = dataTeam.team.crestUrl
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
              listMatch +=
              `
              <tr>
              <td>${dataTeam.position}</td>
              <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" style="width:50px; height:50px;"></td>
              <td>${dataTeam.team.name}</td>
              <td>${dataTeam.playedGames} Permainan</td>
              <td>${dataTeam.won}</td>
              <td>${dataTeam.draw}</td>
              <td>${dataTeam.lost}</td>
              </tr>    
              `
          });
          document.getElementById("articles_home").innerHTML = listMatch;
        });
      }
    });
  }

    fetch(`${base_url}/v2/competitions/${leagueID}/standings`,{
      headers:{
          'X-Auth-Token' : api_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      let listMatch = ''
      data = data.standings[0].table;
      data.forEach(function(dataTeam) {
        let urlTeamImage = dataTeam.team.crestUrl
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
        listMatch +=
        `
        <tr>
        <td>${dataTeam.position}</td>
        <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" style="width:50px; height:50px;"></td>
        <td>${dataTeam.team.name}</td>
        <td>${dataTeam.playedGames} Permainan</td>
        <td>${dataTeam.won}</td>
        <td>${dataTeam.draw}</td>
        <td>${dataTeam.lost}</td>
        </tr>

        `
    })
      document.getElementById("articles_home").innerHTML = listMatch;
  })
    .catch(error);
}


function getTeams() {
  if ("caches" in window) {
    caches.match(`${base_url}/v2/competitions/${leagueID}/teams`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let listTeam = ''

          // let datad = [];
          // getTeam().then(datadb => {
          //   datadb.forEach(teamdb => {
          //     datad.push(teamdb.id);  
          //   });
          // });
          //console.log(datad);
          // console.log(datad[0]);
          // kenapa kok gk bisa nampil array nya 

          data = data.teams;
            data.forEach(function(team) {
              let urlTeamImage = team.crestUrl;
              urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
              listTeam  +=
              `
              <div class="col s12 m12">
              <div class="card">
                <div class="row">
                  <div class="col s4 m2" class="logo-team">
                    <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" style="width: 100px; height:100px;">
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
                  <div class="col s12 m4">
                    <div class="teams">
                      <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">More Info</a>
                      <button onclick="addFavorite(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn green accent-3">+ Favorite</button>
                    </div>
                  </div>
              </div>
            </div>
            </div>
              `
          })
          document.getElementById('articles_allteam').innerHTML = listTeam;
        });
      }
    });
  }

    fetch(`${base_url}/v2/competitions/${leagueID}/teams`,{
      headers : {
          'X-Auth-Token' : api_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      let listTeam = '';
      data = data.teams;
      data.forEach(function(team) {
        let urlTeamImage = team.crestUrl
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
        listTeam  +=
        `
        <div class="col s12 m12">
        <div class="card">
          <div class="row">
            <div class="col s4 m2" class="logo-team">
              <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" style="width: 100px; height:100px;">
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
            <div class="col s12 m4">
              <div class="teams">
                <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">More Info</a>
                <button onclick="addFavorite(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn green accent-3">+ Favorite</button>
              </div>
            </div>
        </div>
      </div>
      </div>
        `;
    })
    document.getElementById('articles_allteam').innerHTML = listTeam;
  })
    .catch(error);
}