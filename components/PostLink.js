import Link from 'next/link'

export default function PostLink(props) {
    const { slug } = props

    return (
        <Link href='/blog/[...slug]' as={`${process.env.baseUrl}/blog/${slug.join('/')}`} passHref>
            {props.children}
        </Link>
    )
}