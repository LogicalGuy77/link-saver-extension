const inputBtn = document.querySelector("#input-btn")
let myLeads = [];
const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let ulEl = document.getElementById("kekw");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderValue(myLeads)
}


tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderValue(myLeads)
    })

})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    renderValue(myLeads)
})
inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderValue(myLeads)
})

function renderValue(leads) {
    let listItems = "";
    for (let i = 0; i < myLeads.length; i++) {
        //listItems += "<li><a href='#'>" + myLeads[i] + "</a></li>"
        //topic=template strings
        listItems += `
                      <li>
                          <a target='_blank' href="${leads[i]}">
                              ${leads[i]}
                          </a>
                      </li>
                    `
        //const li = document.createElement("li");
        //li.textContent = myLeads[i];
        //ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}


