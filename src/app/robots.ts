import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/result', '/private/'],
        },
        sitemap: 'https://deepeshgupta.dev/sitemap.xml',
    }
}
