(function showMenu() {
  var mobileButton = document.getElementById("mobileButton");
  var html = document.getElementsByTagName("html");

  mobileButton.onclick = function() {
    if (html[0].classList.contains("expanded")) {
      html[0].classList.remove("expanded");
    } else {
      html[0].classList.add("expanded");
    }
  }
})();
