import Link from 'next/link';

const CategoryLink: React.FC<{ categories: string[] }> = ({
  categories,
  children,
}) => {
  return (
    <Link href={`/categories/${categories.join('-')}/pages/1`} passHref>
      {children}
    </Link>
  );
};

export default CategoryLink;
