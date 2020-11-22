const LIST_PRICE_UBER_X = [8000, 12000, 10000];
const TIME_PRICE_UBER_X = 2000;

const LIST_PRICE_UBER_SUV = [9000, 14000, 12000];
const TIME_PRICE_UBER_SUV = 3000;

const LIST_PRICE_UBER_BLACK = [10000, 16000, 14000];
const TIME_PRICE_UBER_BLACK = 4000;
var getSelector = function (id) {
    return document.querySelector('#id');
}

var checkTypeOfUber = function () {
    var uberX = document.querySelector('#uberX');
    var uberSUV = document.querySelector('#uberSUV');
    var uberBlack = document.querySelector('#uberBlack');

    if (uberX.checked)
        return 'uberX';
    if (uberSUV.checked)
        return 'uberSUV';
    if (uberBlack.checked)
        return 'uberBlack';



        
}

var billWaitingTime = function (waitingTime, timePrice) {
    var tienTime = 0;
    if (waitingTime >= 3) {
        tienTime = Math.round(waitingTime / 3.0) * timePrice;
    }
    return tienTime;
}

var billTotalPrice = function (kilometer, waitingTime, arrayPrice, timePrice) {
    var payForWaitingTime = billWaitingTime(waitingTime, timePrice);
    if (kilometer > 20)
        return arrayPrice[0] + 19 * arrayPrice[1] + (kilometer - 20) * arrayPrice[2] + payForWaitingTime;
    if (kilometer > 1)
        return arrayPrice[0] + (kilometer - 1) * arrayPrice[1] + payForWaitingTime;
    if (kilometer <= 1)
        return arrayPrice[0] + payForWaitingTime;
}

var billMustPay = function () {

    var kilometer = document.querySelector('#soKM').value;
    var waitingTime = document.querySelector('#thoiGianCho').value;

    kilometer = Number(kilometer);
    waitingTime = Number(waitingTime);

    var totalPrice = 0;
    var typeUber = checkTypeOfUber();
    switch (typeUber) {
        case 'uberX':
            totalPrice = billTotalPrice(kilometer, waitingTime, LIST_PRICE_UBER_X, TIME_PRICE_UBER_X);
            break;
        case 'uberSUV':
            totalPrice = billTotalPrice(kilometer, waitingTime, LIST_PRICE_UBER_SUV, TIME_PRICE_UBER_SUV);
            break;
        case 'uberBlack':
            totalPrice = billTotalPrice(kilometer, waitingTime, LIST_PRICE_UBER_BLACK, TIME_PRICE_UBER_BLACK);
            break;
        default:
            alert('Please Choose A Type Of Uber');
            break;
    }
    return totalPrice;
}
document.querySelector('#btnTinhTien').onclick = function () {
    var totalPriceToPay = billMustPay();
    document.querySelector('#divThanhTien').style.display = 'block';
    document.querySelector('#xuatTien').innerHTML = totalPriceToPay;
}

var printDetailOfKm = function (typeUber, arrayKm, arrayPrice, addBody) {
    for (var index = 0; index < arrayKm.length; index++) {
        var tr = document.createElement('tr');

        var tdChiTiet = document.createElement('td');
        var tdSuDung = document.createElement('td');
        var tdDonGia = document.createElement('td');
        var tdThanhTien = document.createElement('td');

        tdChiTiet.innerHTML = typeUber;
        tdSuDung.innerHTML = arrayKm[index] + ' km';
        tdDonGia.innerHTML = arrayPrice[index];
        tdThanhTien.innerHTML = arrayKm[index] * arrayPrice[index];

        tr.appendChild(tdChiTiet);
        tr.appendChild(tdSuDung);
        tr.appendChild(tdDonGia);
        tr.appendChild(tdThanhTien);

        addBody.appendChild(tr);
    }
}

var printDetailOfTime = function(waitingTime, timePrice, addBody){
    var tienTime = billWaitingTime(waitingTime, timePrice);
    var trTime = document.createElement('tr');

    var tdTimeChiTiet = document.createElement('td');
    var tdTimeSuDung = document.createElement('td');
    var tdTimeDonGia = document.createElement('td');
    var tdTimeThanhTien = document.createElement('td');

    tdTimeChiTiet.innerHTML = 'Thời gian chờ';
    tdTimeSuDung.innerHTML = waitingTime + ' Phút';
    tdTimeDonGia.innerHTML = timePrice;
    tdTimeThanhTien.innerHTML = tienTime;

    trTime.appendChild(tdTimeChiTiet);
    trTime.appendChild(tdTimeSuDung);
    trTime.appendChild(tdTimeDonGia);
    trTime.appendChild(tdTimeThanhTien);

    addBody.appendChild(trTime);
}

var printTotalPrice = function(totalPrice, addBody){
    var trTotal = document.createElement('tr');
    trTotal.className = 'alert alert-success';
    var totalPrice = billMustPay();
    console.log(totalPrice);
    var trTotalChiTiet = document.createElement('td');
    trTotalChiTiet.setAttribute("colspan",3);
    trTotalChiTiet.innerHTML = 'Tổng Tiền Thanh Toán';
    var trTotalThanhTien = document.createElement('td');
    trTotalThanhTien.innerHTML = totalPrice;

    trTotal.appendChild(trTotalChiTiet);
    trTotal.appendChild(trTotalThanhTien);

    addBody.appendChild(trTotal);

}

var printDetailOfReceipt = function(typeUber, kilometer, waitingTime, timePrice, arrayPrice, totalPrice){
    // var printDetailOfKm = function (typeUber, arrayKm, arrayPrice, addBody) {
      
    var addBody = document.querySelector('#addBody');
    addBody.innerHTML = '';
    if(kilometer > 20){
        printDetailOfKm(typeUber, [1, 19, kilometer-20], arrayPrice, addBody);
    } else if(kilometer > 1){
        printDetailOfKm(typeUber, [1, kilometer-1], arrayPrice, addBody);
    } else if(kilometer <= 1){
        printDetailOfKm(typeUber, [1], arrayPrice, addBody);
    }

    // printDetailOfTime = function(waitingTime, timePrice, addBody)
    if(waitingTime >= 3)
        printDetailOfTime(waitingTime, timePrice, addBody);

    // printTotalPrice = function(totalPrice, addBody)
    printTotalPrice(totalPrice, addBody);
    console.log(typeUber);
}


document.querySelector('#btnInHoaDon').onclick = function () {
    var kilometer = document.querySelector('#soKM').value;
    var waitingTime = document.querySelector('#thoiGianCho').value;
    var totalPrice = billMustPay();
    var typeUber = checkTypeOfUber();
    // printDetailOfReceipt = function(typeUber, kilometer, waitingTime, timePrice, arrayPrice, totalPrice){
    switch (typeUber) {
        case 'uberX':
            printDetailOfReceipt(typeUber, kilometer, waitingTime, TIME_PRICE_UBER_X, LIST_PRICE_UBER_X, totalPrice);
            break;
        case 'uberSUV':
            printDetailOfReceipt(typeUber, kilometer, waitingTime, TIME_PRICE_UBER_SUV, LIST_PRICE_UBER_SUV, totalPrice);
            break;
        case 'uberBlack':
            printDetailOfReceipt(typeUber, kilometer, waitingTime, TIME_PRICE_UBER_BLACK, LIST_PRICE_UBER_BLACK, totalPrice);
            break;
        default:
            alert('Please Choose A Type Of Uber');
            break;
    }
    document.querySelector('#hoaDon').style.display = 'block';
}