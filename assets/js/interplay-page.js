document.addEventListener("DOMContentLoaded", () => {
  const hashContainer = document.getElementById("hash");
  if ($fx && $fx.hash) {
    hashContainer.innerHTML = "Hash: " + $fx.hash;
  }

  const refreshBtn = document.getElementById("refresh-btn");

  refreshBtn.addEventListener("click", function (e) {
    location.reload();
  });

  let output = "";

  for (let [key, value] of Object.entries($fx._features)) {
    output += `<strong>${key}:</strong> ${value}<br>`;
  }

  document.getElementById("metadata").innerHTML = output;
});
