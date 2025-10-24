(async function () {
    'use strict';

    const videoList = document.querySelector('#videosList');

    const hasVideo = document.querySelector('#has-Vidoes');
    const chosenVideo = document.querySelector('#chosenVideo');

    const chosenTitle = document.querySelector('#title');

    async function loadVideoList() {
        try {
            const response = await fetch('videos.json');
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            const list = await response.json();
            list.forEach(video => {
                const container = document.createElement('div');
                const videoTitle = document.createElement('h3');
                const videoImg = document.createElement('img');
                const button = document.createElement('div');

                container.style.position = 'relative';

                videoTitle.innerText = video.title;
                videoImg.src = video.picture;
                videoImg.style.width = 'auto';
                videoImg.style.height = '150px';

                button.style.position = 'absolute';
                button.style.bottom = '5px';
                button.style.left = '50%';
                button.style.transform = 'translate(-50%, -50%)';
                button.style.width = '50px';
                button.style.height = '50px';
                button.style.padding = '10px 20px';
                button.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                button.style.borderRadius = '50%';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';

                button.style.border = '1px solid white';
                button.style.color = 'white';
                button.style.opacity = '0';
                button.style.transition = 'opacity 0.3s';

                const triangle = document.createElement('div');
                triangle.style.width = '0';
                triangle.style.height = '0';
                triangle.style.borderLeft = '15px solid white';
                triangle.style.borderTop = '10px solid transparent';
                triangle.style.borderBottom = '10px solid transparent';


                container.addEventListener('mouseenter', () => {
                    button.style.opacity = '1';
                });
                container.addEventListener('mouseleave', () => {
                    button.style.opacity = '0';
                });

                button.appendChild(triangle);
                container.append(videoTitle, videoImg, button);
                videoList.append(container);

                button.addEventListener('click', () => {
                    if (video.url) {
                        chosenVideo.src = video.url;
                        chosenVideo.controls = true;
                        chosenVideo.poster = video.picture || 'default.png';
                        chosenVideo.style.width = 'auto';
                        chosenVideo.style.height = '450px';
                        chosenVideo.style.display = 'block';
                        chosenVideo.style.margin = '25px auto 20px auto';
                        chosenTitle.innerText = video.title;
                    }
                });
                chosenVideo.addEventListener('error', () => {
                    hasVideo.innerHTML = '<h3>Sorry, this video cannot be loaded.</h3>';
                });


            });
        }
        catch (e) {
            console.log('unable to load videos', e);

        }

    }
    loadVideoList();


}());