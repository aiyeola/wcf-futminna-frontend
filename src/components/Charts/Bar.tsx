import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function Bar({ data, id, ...rest }) {
  const series = [
    {
      name: id.message,
      data: data.map((val) => val.total),
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: id.message,
      fontFamily: 'inherit',
      width: '100%',
      height: 'auto',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((val) => val._id),
      labels: {
        style: {
          fontWeight: 600,
        },
      },
      sorted: true,
    },
    title: {
      text: id.message,
      floating: true,
      offsetY: 11,
      style: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    dataLabels: {
      style: {
        fontSize: '1rem',
        fontWeight: 300,
      },
    },
  };

  return <Chart options={options} series={series} type="bar" {...rest} />;
}
