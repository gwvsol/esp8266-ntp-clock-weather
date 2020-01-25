## ESP8266-Clock-Max7219

Часы с возможностью обновления времени с NTP сервера и показа погоды

***

Поиск кода города в файле ```city.list.json```

```grep  'Voronezh' -B2 -C5 city.list.json```

будут выведены 2 строки перед и 5 после найденного названия города

*Сборка проекта*

```platformio run```

*Загрузка проекта в ```ESP8266```*

```platformio run --target upload```

*Загрузка SPIFFS в ```ESP8266```*

```platformio run --target uploadfs```

*Включение монитора UART порта ```ESP8266```*

```platformio device monitor```