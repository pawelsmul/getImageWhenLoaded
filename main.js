const images = [
    'https://picsum.photos/5000?random=1',
    'https://picsum.photos/5000?random=2',
    'https://picsum.photos/5000?random=3',
    'https://picsum.photos/5000?random=4',
];

let currentIndex = 0;
const imageContainer = document.getElementById('imageContainer');

function getImageElementWhenLoaded(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayImage(index) {
    const imageUrl = images[index];
    const loadingIndicator = document.querySelector('.loading');

    getImageElementWhenLoaded(imageUrl)
        .then((imageElement) => {
            const currentImage = imageContainer.querySelector('img');
            if (currentImage) {
                currentImage.style.opacity = '0';
                return wait(500); // Transition time
            }

            return Promise.resolve();
        })
        .then(() => {
            const currentImage = imageContainer.querySelector('img');
            if (currentImage) {
                imageContainer.removeChild(currentImage);
            }

            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.style.opacity = '1';
            imageContainer.appendChild(imageElement);
            loadingIndicator.style.display = 'none';
        })
        .catch((error) => {
            loadingIndicator.style.display = 'none';
            console.error(error.message);
        });
}

displayImage(currentIndex);

const nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.style.display = 'block';
    displayImage(currentIndex);
});

const prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const loadingIndicator = document.querySelector('.loading');
    loadingIndicator.style.display = 'block';
    displayImage(currentIndex);
});