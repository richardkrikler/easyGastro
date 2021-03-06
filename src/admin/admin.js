const adminRows = [...document.getElementsByClassName('admin-row')]
adminRows.forEach(adminUserRow => {
    const cloudIcon = adminUserRow.getElementsByClassName('cloud-icon')[0]
    const inputElements = [...adminUserRow.querySelectorAll('input[type=text]')]
            .concat([...adminUserRow.querySelectorAll('input[type=password]')]
            .concat([...adminUserRow.querySelectorAll('input[type=number]')]))
    const selectElements = [...adminUserRow.getElementsByTagName('select')]

    inputElements.forEach(inputElement => inputElement.addEventListener('input', () => checkDifference(cloudIcon, inputElements.concat(selectElements))))
    selectElements.forEach(selectElement => selectElement.addEventListener('change', () => checkDifference(cloudIcon, inputElements.concat(selectElements))))
})

function checkDifference(cloudIcon, inputElementAr) {
    const parentButton = cloudIcon.parentElement
    if (inputElementAr.filter(inputElement => inputElement.value !== inputElement.getAttribute('start_value')).length === 0) {
        cloudIcon.classList.remove('storage-difference')
        cloudIcon.classList.add('text-gray')
        parentButton.setAttribute('disabled', '')
    } else {
        cloudIcon.classList.add('storage-difference')
        cloudIcon.classList.remove('text-gray')
        parentButton.removeAttribute('disabled')
    }
}