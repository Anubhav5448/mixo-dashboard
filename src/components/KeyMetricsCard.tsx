interface KeyMetricsCardProps {
  title: string;
  value: string;
}

function KeyMetricsCard({ title, value }: KeyMetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default KeyMetricsCard;
