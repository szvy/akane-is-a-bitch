function confirmtab() {
    const selectElement = document.querySelector('#tabselect');
    const selectedValue = selectElement.value;
    localStorage.setItem('sitefortab', selectedValue);
    localStorage.setItem('tabselectIndex', selectElement.selectedIndex);
    alert("panic site set to " + localStorage.getItem('sitefortab'));
    location.reload()
}