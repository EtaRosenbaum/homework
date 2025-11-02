/* global google */
(async function () {
    'use strict';

    const bmgLocation = { lat: 40.096044749672394, lng: -74.22197586384449 };


    const SearchButton = document.querySelector('#searchButton');
    const searchBox = document.querySelector("#searchBox");
    const resultBox = document.querySelector('#resultBox');
    const spinner = document.querySelector('.spinner');


    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const map = new Map(document.querySelector('#map'), {
        center: bmgLocation,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        mapId: 'DEMO_MAP_ID'
    });



    SearchButton.addEventListener('click', () => {
        loadInfo(searchBox.value);
    });



    async function loadInfo(search) {
        resultBox.innerHTML = '';
        spinner.style.display = 'inline';
        try {
            // Title above results
            const searchResult = document.createElement('div');
            searchResult.innerText = `Results for ${search}`;
            searchResult.style.marginBottom = '10px';
            resultBox.append(searchResult);

            // Fetch Wikipedia results
            const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${search}&maxRows=10&username=USER_NAME&type=json`);
            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

            const list = await response.json();
            const bounds = new google.maps.LatLngBounds();


            const infoWindow = new google.maps.InfoWindow({
            });




            for (const li of list.geonames) {

                const newLocation = { lat: li.lat, lng: li.lng };
                const wikiUrl = `https://${li.wikipediaUrl}`;

                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${li.lat}&lon=${li.lng}&units=imperial&appid=API_KEY`);

                const weatherData = await weatherResponse.json();

                const iconCode = weatherData.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                const marker = new AdvancedMarkerElement({
                    map,
                    position: newLocation,
                    title: li.title
                });

                bounds.extend(newLocation);

                const resultInfo = document.createElement('li');
                const title = document.createElement('div');
                const img = document.createElement('img');
                const summary = document.createElement('div');
                const summaryButton = document.createElement('button');


                resultInfo.style.border = '1px solid #ccc';
                resultInfo.style.borderRadius = '8px';
                resultInfo.style.padding = '10px';
                resultInfo.style.backgroundColor = '#f9f9f9';
                resultInfo.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                resultInfo.style.marginBottom = '15px';


                title.style.color = '#0078D7';
                title.style.fontWeight = 'bold';
                title.style.marginBottom = '5px';
                title.innerText = li.title;
                title.style.cursor = 'pointer';

                img.src = li.thumbnailImg || '';
                img.alt = li.title;
                img.style.display = li.thumbnailImg ? 'block' : 'none';
                img.style.marginTop = '5px';

                summary.innerText = li.summary || 'No summary available';
                summary.style.display = 'none';
                summary.style.whiteSpace = 'normal';
                summary.style.overflowWrap = 'break-word';
                summary.style.wordBreak = 'break-word';
                summary.style.marginTop = '5px';
                summary.style.fontSize = '0.9em';


                summaryButton.style.backgroundColor = '#0078D7';
                summaryButton.style.color = 'white';
                summaryButton.style.border = 'none';
                summaryButton.style.borderRadius = '5px';
                summaryButton.style.padding = '5px 10px';
                summaryButton.style.fontSize = '0.9em';
                summaryButton.style.transition = 'background-color 0.3s';
                summaryButton.addEventListener('mouseenter', () => summaryButton.style.backgroundColor = '#005fa3');
                summaryButton.addEventListener('mouseleave', () => summaryButton.style.backgroundColor = '#0078D7');

                summaryButton.textContent = 'Read more';
                summaryButton.style.marginTop = '5px';
                summaryButton.style.cursor = 'pointer';

                summaryButton.addEventListener('click', () => {
                    const isHidden = summary.style.display === 'none';
                    summary.style.display = isHidden ? 'block' : 'none';
                    summaryButton.textContent = isHidden ? 'Hide' : 'Read more';
                });

                title.addEventListener('click', () => {
                    map.panTo(newLocation);
                    map.setZoom(16);

                });



                marker.addEventListener('click', () => {
                    map.panTo(newLocation);
                    map.setZoom(16);
                    infoWindow.setContent(` <img src = ${li.thumbnailImg || ''}></img> <br>${li.summary}, <a href=${wikiUrl}>More info</a>
                      <br>  <img src = ${iconUrl}></img> Weather for ${weatherData.name}: ${weatherData.weather[0].description} , Temp: ${weatherData.main.temp}F`);
                    infoWindow.open({
                        anchor: marker
                    });
                });

                resultInfo.append(title, img, summaryButton, summary);
                resultInfo.style.marginBottom = '20px';
                resultBox.append(resultInfo);

            }






            map.fitBounds(bounds);
            searchBox.value = '';
        } catch (e) {
            console.error(e);
            resultBox.innerHTML = `<div style="color:red;">Error loading data: ${e.message}</div>`;
        }
        finally {
            spinner.style.display = 'none';

        }
    }









    map.addListener('center_changed', () => {
        const newCenter = map.getCenter();
        console.log(newCenter.lat(), newCenter.lng());
    });






}());
