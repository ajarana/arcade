(function showMenu() {
  var mobileButton = document.getElementById("mobileButton");
  var html = document.getElementsByTagName("html");
  var headerMenu = document.getElementById("headerMenu");

  // var minMenuHeight = '555';


  mobileButton.onclick = function() {
    // headerMenu.classList.add("transitionEverything");
    // headerMenu.classList.add("transitionExpand");

    if (html[0].classList.contains("expanded")) {
      headerMenu.classList.add("transitionCollapse");
      headerMenu.classList.remove("transitionExpand");
      html[0].classList.remove("expanded", "staticHeight");
    }
    // else if (window.innerHeight < minMenuHeight) {
    //   html[0].classList.add("expanded", "staticHeight");
    // }
    else {
      headerMenu.classList.add("transitionExpand");
      headerMenu.classList.remove("transitionCollapse");
      html[0].classList.add("expanded");
    }
  }

  window.addEventListener("resize", function() {
    // headerMenu.classList.remove("transitionEverything");
    headerMenu.classList.remove("transitionExpand");
    headerMenu.classList.remove("transitionCollapse");

    if (window.innerWidth >= 768) {
      html[0].classList.remove("expanded");
    }

    // if (window.innerHeight < minMenuHeight) {
    //   html[0].classList.add("staticHeight");
    // } else {
    //   html[0].classList.remove("staticHeight");
    // }
  }, false);
})();
