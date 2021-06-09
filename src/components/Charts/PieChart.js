import clsx from 'clsx';
import ChartistGraph from 'react-chartist';

export default function PieChart({ labels, values, ...rest }) {
  const data = {
    labels: [labels[0], labels[1]],
    series: [values[0], values[1]],
  };

  const options = {
    startAngle: 15,
  };

  const listener = {
    animation: {
      draw: function (data) {
        if (data.type === 'slice') {
          var pathLength = data.element._node.getTotalLength();

          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px',
          });

          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              begin: 100,
              dur: 500,
              from: -pathLength + 'px',
              to: '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              fill: 'freeze',
            },
            opacity: {
              begin: 0,
              dur: 1000,
              from: 0,
              to: 1,
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          };

          if (data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin =
              'anim' + (data.index - 1) + '.end';
          }

          data.element.attr({
            'stroke-dashoffset': -pathLength + 'px',
          });

          data.element.animate(animationDefinition, false);
        }
      },
    },
  };

  return (
    <ChartistGraph
      className={clsx('ct-chart', '.ct-octave')}
      type="Pie"
      data={data}
      options={options}
      listener={listener.animation}
      {...rest}
    />
  );
}
