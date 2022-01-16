function cashImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach((item) => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${item}/${i}.jpg`
        }
    })
}
cashImages();