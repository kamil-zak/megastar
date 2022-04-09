import { fileURLToPath } from 'url'
import path from 'path'

const absolutePath = (url) => {
    const __filename = fileURLToPath(url)
    const __dirname = path.dirname(__filename)
    return { __filename, __dirname }
}

export default absolutePath
