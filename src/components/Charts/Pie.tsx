import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

export default function Pie({ title, labels, values, ...rest }) {
  const data = {
    series: [values[0], values[1]],
  };

  const options: ApexOptions = {
    colors: ['#2E93fA', '#f2911b'],
    labels: [labels[0], labels[1]],
    legend: {
      fontFamily: 'inherit',
      position: 'bottom',
      horizontalAlign: 'right',
      fontWeight: 500,
    },
    title: {
      text: title,
      offsetY: 11,
      floating: true,
      style: {
        fontSize: '1rem',
        fontFamily: 'inherit',
        fontWeight: 500,
      },
    },
    dataLabels: {
      style: {
        fontSize: '1rem',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
    tooltip: {
      style: {
        fontFamily: 'inherit',
      },
    },
  };

  return <Chart options={options} series={data.series} type="pie" {...rest} />;
}
