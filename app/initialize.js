document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
});

window.addEventListener('load', () => {

  var elements = document.querySelectorAll("input[type=button]");
  [].forEach.call(elements, function(el) {

    el.setAttribute("draggable", true);

    el.addEventListener("dragstart", function(evt) {
      console.log("Drag started On: " + evt.target.id);
      evt.dataTransfer.setData("text", evt.target.id);
    });

    el.addEventListener("dragover", function(evt) {
      evt.preventDefault();
      console.log("Drag Over On: " + evt.target.id);
    });

    el.addEventListener("drop", function(evt) {
      evt.preventDefault();
      var data = evt.dataTransfer.getData("text");
      console.log("DATA " + data);
      if (data == evt.target.id) return; // Kendi üzerine taş drop etme
      if (evt.target.value != "") return; // Sadece boş hücrelere taş taşı
      var el = document.getElementById(data);
      console.log("Drop to: " + evt.target.id);
      evt.target.value = el.value;
      el.value = null;
    });



    el.addEventListener('click', function(e) {
      console.log(board.getCell(this.id));
    });


  });
});