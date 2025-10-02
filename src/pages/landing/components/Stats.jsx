import React from 'react';

const Stats = () => {
  const stats = [
    { id: 1, name: 'Railway Networks Optimized', value: '50+' },
    { id: 2, name: 'Cost Savings Generated', value: '₹2.5B+' },
    { id: 3, name: 'Rakes Managed Daily', value: '10K+' },
    { id: 4, name: 'Operational Efficiency Gain', value: '35%' },
  ];

  return (
    <div className="bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by railway operators across India
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Our platform has transformed railway operations for major operators, 
              delivering measurable results and significant cost savings.
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-background p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Stats;
