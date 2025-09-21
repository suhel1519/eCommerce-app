import React from "react";

const SimpleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          eCommerce Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Application is loading successfully!
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3,781</div>
              <div className="text-sm text-gray-500">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1,219</div>
              <div className="text-sm text-gray-500">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$695</div>
              <div className="text-sm text-gray-500">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">30.1%</div>
              <div className="text-sm text-gray-500">Growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleApp;
