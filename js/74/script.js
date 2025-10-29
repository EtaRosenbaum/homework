/* global google */
(async function () {
    'use strict';

    const bmgLocation = { lat: 40.096044749672394, lng: -74.22197586384449 };


    const SearchButton = document.querySelector('#searchButton');
    const searchBox = document.querySelector("#searchBox");
    const resultBox = document.querySelector('#resultBox');



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
        try {
            // Title above results
            const searchResult = document.createElement('div');
            searchResult.innerText = `Results for ${search}`;
            searchResult.style.marginBottom = '10px';
            resultBox.append(searchResult);

            // Fetch Wikipedia results
            const response = await fetch(`GEOCODE API`);
            if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

            const list = await response.json();
            const bounds = new google.maps.LatLngBounds();

            list.geonames.forEach(li => {
                const newLocation = { lat: li.lat, lng: li.lng };
                const wikiUrl = `https://${li.wikipediaUrl}`;

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

                title.innerText = li.title;
                title.style.fontSize = '1.2em';
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
                    infoWindow.setContent(`${li.summary}, <a href=${wikiUrl}>More info</a>`);
                    infoWindow.open({
                        anchor: marker
                    });
                });

                resultInfo.append(title, img, summaryButton, summary);
                resultInfo.style.marginBottom = '20px';
                resultBox.append(resultInfo);
            });

            map.fitBounds(bounds);
            searchBox.value = '';
        } catch (e) {
            console.error(e);
            resultBox.innerHTML = `<div style="color:red;">Error loading data: ${e.message}</div>`;
        }
    }

    const infoWindow = new google.maps.InfoWindow({
    });







    map.addListener('center_changed', () => {
        const newCenter = map.getCenter();
        console.log(newCenter.lat(), newCenter.lng());
    });






}());
