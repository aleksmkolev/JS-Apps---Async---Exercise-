function getInfo() {
  const BASE_URL = "http://localhost:3030/jsonstore/bus/businfo/";

  const stopIdRef = document.getElementById("stopId");
  const urlRef = document.getElementById("buses");
  const stopNameRef = document.getElementById("stopName");

  onSubmit();

  async function onSubmit(event) {
    const stopId = stopIdRef.value;
    const fullPath = BASE_URL + stopId;

    try {
      const response = await fetch(fullPath);
      const data = await response.json();

      clear();
      renderList(data);
    } catch (error) {
      clear();
      stopNameRef.textContent = "Error";
    }
  }
  function renderList(data) {
    const stopName = data.name;

    stopNameRef.textContent = stopName;

    Object.entries(data.buses).forEach((info) => {
      const [busNumber, busTime] = info;
      const li = document.createElement("li");
      li.textContent = `Bus ${busNumber} arrives in ${busTime} minutes`;
      urlRef.appendChild(li);
    });
  }

  function clear() {
    stopIdRef.value = "";
    urlRef.innerHTML = "";
  }
}
