console.log('loaded')
function selectRegion() {
    document.getElementById('regionDropdown').classList.toggle("show");
}

document.getElementById('regionDropdown').onclick = selectRegion()