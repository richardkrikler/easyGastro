'use strict';

let orderCounter = 0;
let openedInModal;
let orders = [];

function switchCategory(category) {
    document.getElementById('startHeader').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('payIcon').textContent = 'payments';
    document.getElementById('orderIcon').textContent = 'assignment';
    let orderCounterElement = document.createElement('div');
    orderCounterElement.appendChild(document.createTextNode(orderCounter.toString()));
    orderCounterElement.setAttribute('id', 'orderCounter');
    document.getElementById('orderIcon').appendChild(orderCounterElement);
    if (category === 'drinks') {
        document.getElementById('drinksButton').style.fontWeight = 'bold';
        document.getElementById('foodButton').style.fontWeight = 'normal';
        document.getElementById('drinks').style.display = 'inline';
        document.getElementById('food').style.display = 'none';
        document.getElementById('drinkHeader').style.display = 'inline';
        document.getElementById('foodHeader').style.display = 'none';
    } else if (category === 'food') {
        document.getElementById('drinksButton').style.fontWeight = 'normal';
        document.getElementById('foodButton').style.fontWeight = 'bold';
        document.getElementById('drinks').style.display = 'none';
        document.getElementById('food').style.display = 'inline';
        document.getElementById('drinkHeader').style.display = 'none';
        document.getElementById('foodHeader').style.display = 'inline';
    }
}

function modifyFoodModal(food) {
    document.getElementById('foodTitle').textContent = food;
    for (const foodKey in foodList) {
        if (food.toString() === foodList[foodKey]['bezeichnung'].toString()) {
            let currentFoodCount = document.getElementById('foodCount').value;
            let currentFoodPrice = parseFloat(foodList[foodKey]['preis']) * parseFloat(currentFoodCount);
            document.getElementById('foodPrice').textContent = currentFoodPrice.toFixed(2).toString() + '€';
            openedInModal = [foodList[foodKey]['pk_speise_id'], food, currentFoodCount, currentFoodPrice];
            break;
        }
    }
}

function modifyDrinkModal(drink) {
    document.getElementById('drinkTitle').textContent = drink;
    let drinkAmountElements = document.getElementsByClassName('drinkAmountElement');
    while (drinkAmountElements[0]) {
        drinkAmountElements[0].parentNode.removeChild(drinkAmountElements[0]);
    }
    for (const drinkKey in drinkList) {
        if (drink.toString() === drinkList[drinkKey]['bezeichnung'].toString()) {
            for (const drinkAmountKey in drinkAmountList) {
                if (drinkList[drinkKey]['pk_getraenk_id'].toString() === drinkAmountList[drinkAmountKey]['fk_pk_getraenk_id'].toString()) {
                    for (const amountKey in amountList) {
                        let firstElement = true;
                        if (amountList[amountKey]['pk_menge_id'].toString() === drinkAmountList[drinkAmountKey]['fk_pk_menge_id'].toString()) {
                            let drinkAmountElement = document.createElement('option');
                            drinkAmountElement.appendChild(document.createTextNode(amountList[amountKey]['wert'].toString() + 'l'));
                            drinkAmountElement.setAttribute('value', amountList[amountKey]['wert'].toString());
                            if (firstElement) {
                                drinkAmountElement.setAttribute('selected', '');
                                firstElement = false;
                            }
                            drinkAmountElement.setAttribute('class', 'text-center drinkAmountElement');
                            document.getElementById('drinkAmount').appendChild(drinkAmountElement);
                            break;
                        }
                    }
                }
            }
            break;
        }
    }
    refreshDrinkModalPrice();
}

function refreshDrinkModalPrice() {
    let drinkTitle = document.getElementById('drinkTitle').textContent.toString();
    let selectedDrinkAmount = document.getElementById('drinkAmount').value.toString();
    let drinkCount = document.getElementById('drinkCount').value.toString();
    for (const drinkKey in drinkList) {
        if (drinkTitle === drinkList[drinkKey]['bezeichnung'].toString()) {
            for (const drinkAmountKey in drinkAmountList) {
                if (drinkList[drinkKey]['pk_getraenk_id'].toString() === drinkAmountList[drinkAmountKey]['fk_pk_getraenk_id'].toString()) {
                    for (const amountKey in amountList) {
                        if (amountList[amountKey]['pk_menge_id'].toString() === drinkAmountList[drinkAmountKey]['fk_pk_menge_id'].toString()
                            && amountList[amountKey]['wert'].toString() === selectedDrinkAmount) {
                            let currentDrinkPrice = parseFloat(drinkAmountList[drinkAmountKey]['preis']) * parseFloat(drinkCount);
                            document.getElementById('drinkPrice').textContent =
                                currentDrinkPrice.toFixed(2).toString()
                                + '€';
                            openedInModal = [drinkAmountList[drinkAmountKey]['pk_getraenkmg_id'], drinkTitle, drinkCount, currentDrinkPrice, selectedDrinkAmount + 'l'];
                            break;
                        }
                    }
                }
            }
            break;
        }
    }
}

function refreshOrderCounter() {
    document.getElementById('orderCounter').textContent = orderCounter.toString();
}

function addOrder() {
    orders.push(openedInModal);
    orderCounter += parseInt(openedInModal[2]);
    refreshOrderCounter();
    refreshOrderModal()
}

function refreshOrderModal() {
    let orderModalList = document.getElementById('orderModalList');
    orderModalList.innerHTML = '';
    for (const orderKey in orders) {
        let details = [];
        for (let i = 3; i < orders[orderKey].length; i++) {
            details.push(orders[orderKey][i]);
        }
        orderModalList.appendChild(createOrderListPoint(orders[orderKey][2] + 'x ' + orders[orderKey][1], details));
    }
    // TODO: make style better
    // TODO: show sum
}

function createDeleteIcon() {
    let deleteIcon = document.createElement('span');
    deleteIcon.appendChild(document.createTextNode('close'));
    deleteIcon.setAttribute('class', 'icon close-icon material-icons-outlined c-red');
    // TODO: make delete function
    return deleteIcon;
}

function createOrderDetail(detail) {
    let orderDetail = document.createElement('p');
    orderDetail.appendChild(document.createTextNode(detail));
    orderDetail.setAttribute('class', 'mb-0');
    return orderDetail;
}

function createOrderDetailContainer(details) {
    let container = document.createElement('div');
    container.setAttribute('class', 'd-flex justify-content-between w-50');
    for (const detailKey in details) {
        let orderDetail = details[detailKey];
        if (parseInt(detailKey) === 0) {
            console.log(detailKey + ' === 0');
            orderDetail = parseFloat(orderDetail).toFixed(2).toString() + '€'
        }
        container.appendChild(createOrderDetail(orderDetail));
    }
    container.appendChild(createDeleteIcon());
    return container;
}

function createOrderTitle(title) {
    let orderTitle = document.createElement('p');
    orderTitle.appendChild(document.createTextNode(title));
    orderTitle.setAttribute('class', 'mb-0 w-50');
    return orderTitle;
}

function createOrderListPoint(title, details) {
    let listPoint = document.createElement('li');
    listPoint.setAttribute('class', 'list-group-item d-flex justify-content-between');
    listPoint.appendChild(createOrderTitle(title));
    listPoint.appendChild(createOrderDetailContainer(details));
    return listPoint;
}