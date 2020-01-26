   
var set_real_time;

function handleServerResponse(){
    clearTimeout(set_real_time);
    var res = jsonResponse.time.split(":");
    real_time(hours=res[0],min=res[1],sec=res[2]);
    document.body.style.backgroundColor="rgb("+jsonResponse.rgb+")";
}

function real_time(hours,min,sec) {
    sec=Number(sec)+1;
    if (sec>=60){min=Number(min)+1;sec=0;}
    if (min>=60){hours=Number(hours)+1;min=0;}
    if (hours>=24){hours=0};
    if (min<10) {min_display="0"+min;} else {min_display=min;}
    if (sec<10) {sec_display="0"+sec;} else {sec_display=sec;}
    //document.getElementById("time").innerHTML = hours+":"+min+":"+sec;
    document.getElementById("time").innerHTML = hours+":"+min_display+":"+sec_display;
    set_real_time = setTimeout("real_time("+hours+","+min+","+sec+");", 1000);
}

// Синхронизация времения по NTP
function load_time(submit){
    server = "/time";
    send_request(submit,server);
    load();
    window.location.reload();
}

// Установка временной зоны
function time_zone(submit){
    server = "/timez?timez="+val('timezone');
    send_request(submit,server);
}

// Установка временной зоны по дате из компьютера
function set_time_zone(submit){
    var set_date = new Date();
    var gmtHours = -set_date.getTimezoneOffset()/60;
    document.getElementById('timezone').value = gmtHours;
    server = "/timez?timez="+gmtHours;
    send_request(submit,server);
}

// Установка SSDP
function set_ssdp(submit){
    server = "/ssdp?ssdp="+val('ssdp');
    send_request(submit,server);
    document.getElementById('ssdp_t').innerHTML = val('ssdp');
} 

// Установка SSID для подключения к точке доступа и пароля
function set_ssid(submit){
    server = "/ssid?ssid="+val('ssid')+"&passwd="+encodeURIComponent(val('password'));
    send_request(submit,server);
    alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
}

// Установка SSID для режима AP точки доступа и пароля
function set_ssid_ap(submit){
    server = "/ssidap?ssidAP="+val('ssidap')+"&passwdAP="+encodeURIComponent(val('passwordAp'));
    send_request(submit,server);
    alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
}

// Рестарт системы
function restart(submit,texts) {
    if (confirm(texts)) {
        server = "/rst?rst=ok";
        send_request(submit,server);
        return true;
    } else {
        return false;
    }
}

// Установка времени устройства по запросу вида 
// http://IP/tset?year=2019&month=12&day=25&hour=15&min=34&sec=45
function set_new_time(submit, texts) {
    if (confirm(texts)) {
        var dt = val('date').split("-");
        var tm = val('time').split(":");
        server = "/tset?year="+dt[0]+"&month="+dt[1]+"&day="+dt[2]+"&hour="+tm[0]+"&min="+tm[1]+"&sec=0";
        send_request(submit,server);
        load_time(submit);
        alert("Ok");
        window.location.reload();
        return true;
    } else {
        return false;
    }
}

// Включение синхронизации времени устройства по NTP серверу по запросу вида 
// http://IP/usentp?use_sync=1 (выключение use_sync=0)
function set_ntp(submit) {
    var usentp = 1;
    var checkbox = document.getElementById('use_sync');
    if (checkbox.checked != true){
        usentp = 0;
    } else {
        usentp = 1;
}
    server = "/usentp?use_sync="+usentp;
    send_request(submit,server);
    load_time(submit);
    alert("Ok");
    window.location.reload();
}

// Установка NTP сервера
function set_ntp_server(submit, texts){
    alert(texts)
    server = "/setntp?setntp="+val('ntpserver');
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Установка языка системы
function set_lang(submit){
    var selectedOption = document.getElementById('lang_sel').value;
    server = "/lang?lang="+selectedOption;
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Установка настроек будильника 1 по запросу вида http://IP/setalarm1?alarm1_h=12&alarm1_m=45
function set_alarm1(submit) {
    var alr1 = val('alarm1').split(":");
    server = "/setalarm1?alarm1_h="+alr1[0]+"&alarm1_m="+alr1[1];
    send_request(submit,server);
    load_time(submit);
    alert("Ok");
    window.location.reload();
}

// Включение/выключение будильника 1 по запросу вида http://IP/usealarm1?use_alarm1=1 (выключение use_alarm1=0)
function on_alarm1(submit){
    var usealarm1 = 1;
    var checkbox = document.getElementById('use_alarm1');
    if (checkbox.checked == true) {
        usealarm1 = 1;
    } else {
        usealarm1 = 0;
    }
    server = "/usealarm1?use_alarm1="+usealarm1;
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Установка настроек будильника 2 по запросу вида http://IP/setalarm2?alarm2_h=12&alarm2_m=45
function set_alarm2(submit) {
    var alr2 = val('alarm2').split(":");
    server = "/setalarm2?alarm2_h="+alr2[0]+"&alarm2_m="+alr2[1];
    send_request(submit,server);
    load_time(submit);
    alert("Ok");
    window.location.reload();
}

// Включение/выключение будильника 2 по запросу вида http://IP/usealarm2?use_alarm2=1 (выключение use_alarm2=0)
function on_alarm2(submit) {
    var usealarm2 = 1;
    var checkbox = document.getElementById('use_alarm2');
    if (checkbox.checked == true) {
        usealarm2 = 1;
    } else {
        usealarm2 = 0;
    }
    server = "/usealarm2?use_alarm2="+usealarm2;
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Получаем произвольную строку для вывода на экран по запросу http://IP/setspeed?text1=test-test
function set_text1(submit) {
    server = "/text?text="+val('text');
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Отправляем значение яркости экрана по запросу вида http://IP/setbright?bright=3
function set_bright(submit){
    server = "/setbright?bright="+val('bright');
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Отправляем значение скорости вывода информации на экран по запросу http://IP/setspeed?speed_d=100
function set_speed(submit) {
    server = "/setspeed?speed_d="+val('speed_d');
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Отправляем данные о городе и api для получения погоды с сервера
// по запросу http://IP/weather?city_id=732770&w_api=f266126b1c5cf63858b5f713a25908da
function set_weather(submit){
    server = "/weather?city_id="+val('city_id')+"&w_api="+val('w_api');
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Отправляем запрос о включении получения данных о погоде
function use_weath(submit) {
    var useWeat = 0;
    var checkbox = document.getElementById('use_weather');
    if (checkbox.checked == true) {
        useWeat = 1;
    } else {
        useWeat = 0;
    }
    server = "/useweath?use_weath="+useWeat;
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}

// Отправляем запрос об обновлении погоды с сервера
function load_weather(submit){
    server = "/updateweath";
    send_request(submit,server);
    alert("Ok");
    window.location.reload();
}