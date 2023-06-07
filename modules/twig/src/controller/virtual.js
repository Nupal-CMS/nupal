import twig from 'twig'

export const element = async (req, res) => {
    await res.virtual(req.params.element + '.js')
}
