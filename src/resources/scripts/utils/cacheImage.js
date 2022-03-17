const cacheImage = async (path) =>
    new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(path)
        img.onerror = (e) => reject(e)
        img.src = path
    })

export default cacheImage
