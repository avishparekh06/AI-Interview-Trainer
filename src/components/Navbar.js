import Link from 'next/link';

export default function() {
    return (
        <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-semibold text-blue-600 cursor-pointer">SalesBot</span>
          </Link>
  
          <div className="space-x-6">
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
            </Link>
            <Link href="/results">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Results</span>
            </Link>
          </div>
        </div>
      </nav>
    )
}