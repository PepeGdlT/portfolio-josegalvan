'use client';

export default function SkeletonLoading() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Hero Section Skeleton */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <div className="h-16 bg-gray-700 rounded w-3/4 mx-auto"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto"></div>
            <div className="h-24 bg-gray-700 rounded w-full max-w-3xl mx-auto"></div>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <div className="h-16 bg-gray-700 rounded w-48"></div>
            <div className="h-16 bg-gray-700 rounded w-48"></div>
          </div>

          <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto"></div>
        </div>
      </div>

      {/* Projects Section Skeleton */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-2/3 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-700 rounded-lg"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-700 rounded w-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-6 bg-gray-700 rounded w-20"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}