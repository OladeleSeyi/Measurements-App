// https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
var  realString = (str) =>{
  return typeof str === 'string';
}
function scrollToBottom() {
  var clients =  $('#setup');
  var newClients = clients.children('div:last-child')

  var clientHeight = clients.prop('clientHeight');
  var scrollTop =clients.prop('scrollTop');
  var scrollHeight = clients.prop('scrollHeight');
  var newClientsHeight = newClients.innerHeight();
  var lastClientsHeight = newClients.prev().innerHeight();

  if (clientHeight + scrollTop + newClientsHeight + lastClientsHeight >= scrollHeight) {
    clients.scrollTop(newClientsHeight);
  }
}

var url = "http://localhost:3000/customers";
const ul = $('#setup');
const il = $('#singles');


// Delete individualPosts
function bulkDelete(um) {
  var id = um;
  let fetcher = `${url}/${id}`;
  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
fetch(fetcher, options)
.then((res) => {
  console.log(res);
  if (res.status === 200) {
    $(`#${id}`).removeClass('btn-danger');
    $(`#${id}`).addClass('btn-success');
    $(`#${id}uc`).removeClass('hidden');
    document.getElementById(id).innerHTML = "Deleted";
    console.log(res);
    return res;
  } else {
    $('#delete').removeClass('btn-danger');
    $('#delete').addClass('btn-secondary');
  }
})
  .then((res)=>res.json())
  .then((res)=>console.log(res))
  .catch((err) => {
    console.log(err);
  })

}

// GET all measurements
// COnsider mapping all the results of the query to an object or array and mapping each one to a span
$('#pushMe').click(function(){
  console.log('Push me just happened ');
  ul.empty();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log('Fetch that GET');
      let jump = data;
      let joy = [];
      return jump.map(function (jum) {
        let li = document.createElement('li'),
            div = document.createElement('div');

            var info = [jum.name, jum.length, jum.chest, jum.back, jum.shoulder, jum.sleeve, jum.bottom, jum.trouserlength, jum.waist, jum.inseam, jum.hips, jum.cuff, jum.extras, jum.date, jum.dueDate, jum._id]

            var checker= info.map(obj=>{
              if (!realString(obj)) {
                  return obj=" ";
              } else {
                return obj;
              }
            })

        div.innerHTML =`<div class="col-sm-6 col-md-4">
                          <div class="thumbnail alert alert-success col-sm-offset-1">
                            <h3><span id="${checker[15]}uc" class="text text-danger hidden">Deleted</span> ${checker[0]}</h3>
                            <div class="row">
                              <div class="col-xs-6">
                                <h4>Top</h4>
                                <span class="help-block">length: ${checker[1]}</span>
                                <span class="help-block">chest: ${checker[2]}</span>
                                <span class="help-block">back: ${checker[3]}</span>
                                <span class="help-block">shoulder: ${checker[4]}</span>
                                <span class="help-block">sleeve: ${checker[5]}</span>
                                <span class="help-block">Jacket Waist: ${checker[6]}</span>
                              </div>
                              <div class="col-xs-6">
                                <h4>Bottom</h4>
                                <span class="help-block">length: ${checker[7]}</span>
                                <span class="help-block">waist: ${checker[8]}</span>
                                <span class="help-block">inseam: ${checker[9]}</span>
                                <span class="help-block">hips: ${checker[10]}</span>
                                <span class="help-block">cuff: ${checker[11]}</span>
                              </div>
                              <div class="col-xs-12">
                              <div class="alert alert-warning" role="alert">${checker[12]}</div>
                              <table class="table">
                                <tr>
                                  <td>Collected: ${checker[13]}</td>
                                  <td>Due: ${checker[14]}</td>
                                </tr>
                              </table>
                              <button type="button" name="button" class="btn btn-sm btn-danger" id="${checker[15]}" onclick="bulkDelete(this.id)">Delete</button>
                              </div>
                            </div>
                          </div>
                        </div>`
// How to get the id of the object when it has just been appended

        ul.append(div);
      })

    })
    .catch((err) => {
      console.log(err);
    })
    scrollToBottom();
});

// Post new measurements
$('#saveMe').click(function(){
  var name= $('#name').val();
  var length = jQuery('#length').val();
  var chest = $('#chest').val();
  var back = $('#back').val();
  var shoulder = $('#shoulder').val();
  var sleeve = $('#sleeve').val();
  var bottom = $('#bottom').val();
  var trouserlength = $('#trouserlength').val();
  var waist = $('#waist').val();
  var inseam = $('#inseam').val();
  var hips = $('#hips').val();
  var cuff = $('#cuff').val();
  var extras = $('#extras').val();
  var date = $('#date').val();
  var dueDate = $('#dueDate').val();


  let fetchContent = {
    name,
    length,
    chest,
    back,
    shoulder,
    sleeve,
    bottom,
    trouserlength,
    waist,
    inseam,
    hips,
    cuff,
    extras,
    date,
    dueDate
  }

  let fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchContent)
  }

  fetch(url, fetchOptions)
    .then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        $('#saveMe').removeClass('btn-primary');
        $('#saveMe').addClass('btn-success');
        return res;
      } else {
        $('#saveMe').removeClass('btn-primary');
        $('#saveMe').addClass('btn-danger');
      }
    })
    .then((resp) => resp.json()).then(response => {
    console.log(JSON.stringify(response));

    })
    .catch(error => console.log('error is', error));
})

var loverman = '#searchBot' || '#find';

// Find singles
$('#find').click(function () {
  console.log('We are searching for singlles ');
  il.fadeOut(400);
  il.empty(300);
  let single = $('#search').val();
  let fetcher = `${url}/name/${single}`;
  console.log(fetcher);
  fetch(fetcher)
    .then((res) => {
      console.log('We have checked');
      if (res.status === 200) {
        $('#find').removeClass('btn-primary');
        $('#find').addClass('btn-success');
        $('#delete').removeClass('hidden');
        return res;
      } else {
        $('#find').removeClass('btn-primary');
        $('#find').addClass('btn-danger');
        $('#snitch').removeClass('hidden');
      }
    })
    .then((res) => res.json())
    .then((jum) => {
      let li = document.createElement('li'),
          div = document.createElement('div');

          var info = [jum.name, jum.length, jum.chest, jum.back, jum.shoulder, jum.sleeve, jum.bottom, jum.trouserlength, jum.waist, jum.inseam, jum.hips, jum.cuff, jum.extras, jum.date, jum.dueDate]

          var deads = jum._id;
          console.log(deads);
          var checker= info.map(obj=>{
            if (!realString(obj)) {
                console.log('what',obj);
                return obj=" ";
            } else {
              return obj;
            }
          })
          div.innerHTML =`<div class="col-sm-12">
                            <div class="thumbnail alert alert-success">
                              <h3>${checker[0]}</h3>
                              <input type="text" name="chest" value="${deads}" id="hider" class="hidden">
                              <div class="row">
                                <div class="col-xs-6 ">
                                  <h4>Top</h4>
                                  <span class="help-block">length: ${checker[1]}</span>
                                  <span class="help-block">chest: ${checker[2]}</span>
                                  <span class="help-block">back: ${checker[3]}</span>
                                  <span class="help-block">shoulder: ${checker[4]}</span>
                                  <span class="help-block">sleeve: ${checker[5]}</span>
                                  <span class="help-block">Jacket Waist: ${checker[6]}</span>
                                </div>
                                <div class="col-xs-6">
                                  <h4>Bottom</h4>
                                  <span class="help-block">length: ${checker[7]}</span>
                                  <span class="help-block">waist: ${checker[8]}</span>
                                  <span class="help-block">inseam: ${checker[9]}</span>
                                  <span class="help-block">hips: ${checker[10]}</span>
                                  <span class="help-block">cuff: ${checker[11]}</span>
                                </div>
                                <div class="col-xs-12">
                                <div class="alert alert-warning" role="alert">${checker[12]}</div>
                                <table class="table">
                                  <tr>
                                    <td>Collected: ${checker[13]}</td>
                                    <td>Due: ${checker[14]}</td>
                                  </tr>
                                </table>
                                </div>
                              </div>
                            </div>
                          </div>`


          il.append(div);
          console.log('Gotcha', $('#hider').val());
    })
    .catch((e) => {
      console.log(e);
      $('#find').removeClass('btn-primary');
      $('#find').addClass('btn-danger');
    });
    il.fadeIn(1500);
});
// Find singles
$('#searchBot').click(function () {
  console.log('We are searching for singlles ');
  il.fadeOut(400);
  il.empty(300);
  let single = $('#searchB').val();
  let fetcher = `${url}/name/${single}`;
  console.log(fetcher);
  fetch(fetcher)
    .then((res) => {
      console.log('We have checked');
      if (res.status === 200) {
        $('#find').removeClass('btn-primary');
        $('#find').addClass('btn-success');
        $('#delete').removeClass('hidden');
        return res;
      } else {
        $('#find').removeClass('btn-primary');
        $('#find').addClass('btn-danger');
        $('#snitch').removeClass('hidden');
      }
    })
    .then((res) => res.json())
    .then((jum) => {
      let li = document.createElement('li'),
          div = document.createElement('div');

          var info = [jum.name, jum.length, jum.chest, jum.back, jum.shoulder, jum.sleeve, jum.bottom, jum.trouserlength, jum.waist, jum.inseam, jum.hips, jum.cuff, jum.extras, jum.date, jum.dueDate]

          var deads = jum._id;
          console.log(deads);
          var checker= info.map(obj=>{
            if (!realString(obj)) {
                console.log('what',obj);
                return obj=" ";
            } else {
              return obj;
            }
          })
          div.innerHTML =`<div class="col-sm-12">
                            <div class="thumbnail alert alert-success">
                              <h3>${checker[0]}</h3>
                              <input type="text" name="chest" value="${deads}" id="hider" class="hidden">
                              <div class="row">
                                <div class="col-xs-6 ">
                                  <h4>Top</h4>
                                  <span class="help-block">length: ${checker[1]}</span>
                                  <span class="help-block">chest: ${checker[2]}</span>
                                  <span class="help-block">back: ${checker[3]}</span>
                                  <span class="help-block">shoulder: ${checker[4]}</span>
                                  <span class="help-block">sleeve: ${checker[5]}</span>
                                  <span class="help-block">Jacket Waist: ${checker[6]}</span>
                                </div>
                                <div class="col-xs-6">
                                  <h4>Bottom</h4>
                                  <span class="help-block">length: ${checker[7]}</span>
                                  <span class="help-block">waist: ${checker[8]}</span>
                                  <span class="help-block">inseam: ${checker[9]}</span>
                                  <span class="help-block">hips: ${checker[10]}</span>
                                  <span class="help-block">cuff: ${checker[11]}</span>
                                </div>
                                <div class="col-xs-12">
                                <div class="alert alert-warning" role="alert">${checker[12]}</div>
                                <table class="table">
                                  <tr>
                                    <td>Collected: ${checker[13]}</td>
                                    <td>Due: ${checker[14]}</td>
                                  </tr>
                                </table>
                                </div>
                              </div>
                            </div>
                          </div>`


          il.append(div);
          console.log('Gotcha', $('#hider').val());
    })
    .catch((e) => {
      console.log(e);
      $('#find').removeClass('btn-primary');
      $('#find').addClass('btn-danger');
    });
    il.fadeIn(1500);
});
// Delete Singles
$('#delete').click(function () {
  $('#delete').removeClass('btn-danger');
  $('#delete').addClass('btn-primary');
 var deads = $('#hider').val();
 il.empty(300);
 let fetcher = `${url}/${deads}`;
 let options = {
   method: 'DELETE',
   headers: {
     'Content-Type': 'application/json'
   }
 }
 fetch(fetcher, options)
  .then((res) => {
    console.log(res);
    if (res.status === 200) {
      $('#delete').removeClass('btn-danger');
      $('#delete').addClass('btn-success');
      return res;
    } else {
      $('#delete').removeClass('btn-danger');
      $('#delete').addClass('btn-secondary');
    }
  })
  .then((res) => res.json())
  .then((jum) => {
    let li = document.createElement('li'),
        div = document.createElement('div');

        var info = [jum.name, jum.length, jum.chest, jum.back, jum.shoulder, jum.sleeve, jum.bottom, jum.trouserlength, jum.waist, jum.inseam, jum.hips, jum.cuff, jum.extras, jum.date, jum.dueDate]

        var deads = jum._id;
        console.log(deads);
        var checker= info.map(obj=>{
          if (!realString(obj)) {
              console.log('what',obj);
              return obj=" ";
          } else {
            return obj;
          }
        })
        div.innerHTML =`<div class="col-sm-12">
                          <div class="thumbnail alert alert-success">
                            <h3>${checker[0]}</h3><h4>was just deleted</h4>
                            <div class="row">
                              <div class="col-xs-6 ">
                                <h4>Top</h4>
                                <span class="help-block">length: ${checker[1]}</span>
                                <span class="help-block">chest: ${checker[2]}</span>
                                <span class="help-block">back: ${checker[3]}</span>
                                <span class="help-block">shoulder: ${checker[4]}</span>
                                <span class="help-block">sleeve: ${checker[5]}</span>
                                <span class="help-block">Jacket Waist: ${checker[6]}</span>
                              </div>
                              <div class="col-xs-6">
                                <h4>Bottom</h4>
                                <span class="help-block">length: ${checker[7]}</span>
                                <span class="help-block">waist: ${checker[8]}</span>
                                <span class="help-block">inseam: ${checker[9]}</span>
                                <span class="help-block">hips: ${checker[10]}</span>
                                <span class="help-block">cuff: ${checker[11]}</span>
                              </div>
                              <div class="col-xs-12">
                              <div class="alert alert-warning" role="alert">${checker[12]}</div>
                              <table class="table">
                                <tr>
                                  <td>Collected: ${checker[13]}</td>
                                  <td>Due: ${checker[14]}</td>
                                </tr>
                              </table>
                              </div>
                            </div>
                          </div>
                        </div>`


        il.append(div);
        console.log('Gotcha', $('#hider').val());
  })
  .catch((e) => {
    console.log(e);
    $('#find').removeClass('btn-primary');
    $('#find').addClass('btn-danger');
  });

});
