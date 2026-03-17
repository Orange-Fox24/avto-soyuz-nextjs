import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  href: string;
  icon: string;
  description: string;
}

export default function ServiceCard({ title, href, icon, description }: ServiceCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-4 text-blue-600 font-medium text-sm">
          Подробнее →
        </div>
      </div>
    </Link>
  );
}