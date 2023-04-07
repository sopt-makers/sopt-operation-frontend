interface Props {
  width?: number;
  height?: number;
  color?: string;
  direction?: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
}

function IcDropdown(props: Props) {
  const {
    width = 14,
    height = 14,
    color = '#3C3D40',
    direction = 'DOWN',
  } = props;

  const rotate = () => {
    switch (direction) {
      case 'LEFT':
        return 'rotate(90deg)';
      case 'RIGHT':
        return 'rotate(180deg)';
      case 'UP':
        return 'rotate(-90deg)';
      case 'DOWN':
        return 'rotate(180deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.4345 9.81539C6.4055 9.78714 6.2815 9.68047 6.1795 9.5811C5.538 8.99854 4.488 7.47881 4.1675 6.68339C4.116 6.56259 4.007 6.25718 4 6.09401C4 5.93765 4.036 5.7886 4.109 5.64637C4.211 5.46907 4.3715 5.32684 4.561 5.2489C4.6925 5.19873 5.086 5.1208 5.093 5.1208C5.5235 5.04286 6.223 5 6.996 5C7.7325 5 8.4035 5.04286 8.8405 5.10667C8.8475 5.11398 9.3365 5.19191 9.504 5.27716C9.81 5.43351 10 5.73892 10 6.06576V6.09401C9.9925 6.30687 9.8025 6.75451 9.7955 6.75451C9.4745 7.50706 8.476 8.99172 7.8125 9.58841C7.8125 9.58841 7.642 9.75645 7.5355 9.82952C7.3825 9.9435 7.193 10 7.0035 10C6.792 10 6.595 9.93619 6.4345 9.81539Z"
        fill={color}
      />
    </svg>
  );
}

export default IcDropdown;
